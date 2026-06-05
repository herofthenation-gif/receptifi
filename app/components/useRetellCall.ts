"use client";

import { useCallback, useRef, useState } from "react";

export type CallStatus = "idle" | "connecting" | "active" | "ending";

export function useRetellCall() {
  const [status, setStatus] = useState<CallStatus>("idle");
  const [agentTalking, setAgentTalking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clientRef = useRef<any>(null);

  // Silently tear down a client instance — safe to call on stale refs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const teardown = useCallback((client: any) => {
    if (!client) return;
    try { client.removeAllListeners?.(); } catch { /* ignore */ }
    try { client.stopCall?.(); } catch { /* ignore */ }
  }, []);

  const start = useCallback(async () => {
    // Always destroy any previous client so we don't carry over a stale session
    if (clientRef.current) {
      teardown(clientRef.current);
      clientRef.current = null;
    }

    setError(null);
    setAgentTalking(false);
    setStatus("connecting");
    console.log("[Retell] Starting call…");

    try {
      // Gate on microphone permission before touching Retell — avoids the
      // browser permission prompt interrupting an already-started call.
      console.log("[Retell] Requesting microphone permission…");
      let micStream: MediaStream;
      try {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch {
        throw new Error("Microphone access is required to talk to Aria. Please allow microphone access and try again.");
      }
      // Release the test stream immediately; the SDK opens its own track.
      micStream.getTracks().forEach(t => t.stop());
      console.log("[Retell] Microphone permission granted");

      // Fresh access token on every attempt
      console.log("[Retell] Fetching access token…");
      const res = await fetch("/api/retell", { method: "POST" });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? "Failed to create call");
      console.log("[Retell] Got access token");

      // Lazy-load SDK (browser-only, avoids SSR issues)
      const { RetellWebClient } = await import("retell-client-js-sdk");
      const client = new RetellWebClient();
      clientRef.current = client;

      client.on("call_started", () => {
        console.log("[Retell] call_started");
        setStatus("active");
      });

      // call_ready fires when the agent_audio track is subscribed
      client.on("call_ready", () => {
        console.log("[Retell] call_ready — resuming audio playback");
        client.startAudioPlayback().catch((err: unknown) => {
          console.warn("[Retell] startAudioPlayback failed on call_ready:", err);
        });
      });

      client.on("call_ended", () => {
        console.log("[Retell] call_ended");
        // Only clear the ref if it still points to this client
        if (clientRef.current === client) clientRef.current = null;
        setStatus("idle");
        setAgentTalking(false);
      });

      client.on("agent_start_talking", () => {
        console.log("[Retell] agent_start_talking");
        setAgentTalking(true);
      });

      client.on("agent_stop_talking", () => {
        console.log("[Retell] agent_stop_talking");
        setAgentTalking(false);
      });

      client.on("update", (update: unknown) => {
        console.log("[Retell] update:", update);
      });

      client.on("error", (err: unknown) => {
        console.error("[Retell] error event:", err);
        setError(String(err));
        if (clientRef.current === client) clientRef.current = null;
        setStatus("idle");
        setAgentTalking(false);
      });

      console.log("[Retell] Calling startCall…");
      await client.startCall({ accessToken: data.accessToken });
      console.log("[Retell] startCall resolved — calling startAudioPlayback");

      // Resume AudioContext within the same user-gesture async chain
      await client.startAudioPlayback();
      console.log("[Retell] startAudioPlayback complete");

    } catch (err) {
      console.error("[Retell] Error during call start:", err);
      setError(err instanceof Error ? err.message : "Call failed. Please try again.");
      if (clientRef.current) {
        teardown(clientRef.current);
        clientRef.current = null;
      }
      setStatus("idle");
      setAgentTalking(false);
    }
  }, [teardown]);

  const stop = useCallback(() => {
    console.log("[Retell] Stopping call");
    const client = clientRef.current;
    clientRef.current = null; // clear immediately so no re-entrant cleanup
    setStatus("ending");
    setAgentTalking(false);

    if (client) {
      client.stopCall?.();
      // call_ended will fire and set status → idle, but add a fallback
      // in case the event doesn't arrive (e.g. network drop)
      setTimeout(() => {
        setStatus(s => (s === "ending" ? "idle" : s));
      }, 3000);
    } else {
      setStatus("idle");
    }
  }, []);

  return { status, agentTalking, error, start, stop };
}
