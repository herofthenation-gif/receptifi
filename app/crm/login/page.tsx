"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Wrong password.");
      return;
    }
    router.push(searchParams.get("next") ?? "/crm/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: 280,
        padding: 24,
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <div style={{ fontSize: 14, opacity: 0.7 }}>Receptifi admin</div>
      <input
        type="password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{
          padding: "8px 10px",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "#12141a",
          color: "#e5e7eb",
        }}
      />
      {error && <div style={{ color: "#f87171", fontSize: 13 }}>{error}</div>}
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "8px 10px",
          borderRadius: 8,
          border: "none",
          background: "#3b82f6",
          color: "white",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {loading ? "Checking..." : "Log in"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0d12",
        color: "#e5e7eb",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
