"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Mode = "login" | "register";

function errorMessage(code: string | undefined): string {
  switch (code) {
    case "invalid_credentials":
      return "E-mail ou mot de passe incorrect.";
    case "exists":
      return "Un compte existe déjà avec cet e-mail.";
    case "weak":
      return "Mot de passe trop court (10 caractères minimum).";
    case "invalid":
      return "Vérifiez le nom et l’e-mail.";
    case "not_configured":
      return "Les comptes ne sont pas encore configurés sur ce serveur.";
    default:
      return "Impossible de continuer. Réessayez.";
  }
}

export function AuthForm({
  mode,
  nextPath,
}: {
  mode: Mode;
  nextPath?: string;
}) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const body =
        mode === "login"
          ? { email, password }
          : { email, password, displayName };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(errorMessage(payload.error));
        return;
      }
      const target = nextPath && nextPath.startsWith("/") ? nextPath : "/compte";
      router.replace(target);
      router.refresh();
    } catch {
      setError(errorMessage(undefined));
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-5">
      {mode === "register" ? (
        <label className="block space-y-2">
          <span className="text-sm text-muted">Nom affiché</span>
          <input
            required
            minLength={2}
            maxLength={80}
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            className="h-12 w-full rounded-xl border border-line bg-panel px-4 text-ink outline-none focus:border-signal"
            autoComplete="nickname"
          />
        </label>
      ) : null}
      <label className="block space-y-2">
        <span className="text-sm text-muted">E-mail</span>
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-12 w-full rounded-xl border border-line bg-panel px-4 text-ink outline-none focus:border-signal"
          autoComplete="email"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm text-muted">Mot de passe</span>
        <input
          required
          type="password"
          minLength={mode === "register" ? 10 : 1}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-12 w-full rounded-xl border border-line bg-panel px-4 text-ink outline-none focus:border-signal"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />
        {mode === "register" ? (
          <span className="block text-xs text-muted">Au moins 10 caractères.</span>
        ) : null}
      </label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="btn-brand inline-flex h-12 w-full items-center justify-center rounded-xl font-semibold disabled:opacity-60"
      >
        {pending ? "Un instant…" : mode === "login" ? "Se connecter" : "Créer le compte"}
      </button>
      <p className="text-center text-sm text-muted">
        {mode === "login" ? (
          <>
            Pas encore de compte ?{" "}
            <Link
              href={nextPath ? `/compte/inscription?next=${encodeURIComponent(nextPath)}` : "/compte/inscription"}
              className="font-semibold text-signal hover:text-ink"
            >
              S’inscrire
            </Link>
          </>
        ) : (
          <>
            Déjà un compte ?{" "}
            <Link
              href={nextPath ? `/compte/connexion?next=${encodeURIComponent(nextPath)}` : "/compte/connexion"}
              className="font-semibold text-signal hover:text-ink"
            >
              Se connecter
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  return (
    <button
      type="button"
      disabled={pending}
      className="inline-flex h-11 items-center rounded-xl border border-line px-5 text-sm font-semibold text-ink transition hover:border-glow/40 disabled:opacity-60"
      onClick={async () => {
        setPending(true);
        try {
          await fetch("/api/auth/logout", { method: "POST" });
          router.replace("/compte/connexion");
          router.refresh();
        } finally {
          setPending(false);
        }
      }}
    >
      {pending ? "Déconnexion…" : "Se déconnecter"}
    </button>
  );
}
