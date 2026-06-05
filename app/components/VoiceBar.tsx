"use client";
import { useRef, useState } from "react";

export default function VoiceBar() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function toggle() {
    if (!audioRef.current) {
      const audio = new Audio("/voice-intro.mp3");
      audio.addEventListener("ended", () => setPlaying(false));
      audio.addEventListener("error", () => {
        // no audio file yet — just animate the wave visually
        setPlaying(true);
        setTimeout(() => setPlaying(false), 16000);
      });
      audioRef.current = audio;
    }

    if (playing) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        setPlaying(true);
        setTimeout(() => setPlaying(false), 16000);
      });
      setPlaying(true);
    }
  }

  return (
    <div className={`voicebar${playing ? " playing" : ""}`} id="voicebar">
      <button className="vbtn" onClick={toggle} aria-label={playing ? "Pause intro" : "Play intro"}>
        {playing ? (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <div className="copy">
        <b>Hear Receptifi answer a call</b>
        <span>{playing ? "Playing…" : "~15 sec · Human-sounding AI voice"}</span>
      </div>
      <div className="wave" aria-hidden="true">
        <i /><i /><i /><i /><i /><i /><i />
      </div>
    </div>
  );
}
