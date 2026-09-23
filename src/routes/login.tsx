import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { CrimeTape, Panel, PrimaryButton } from "@/components/game/chrome";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({
          email,
          password,
          name: name || email.split("@")[0],
          callbackURL: "/",
        });
        if (res.error) throw new Error(res.error.message || "Não foi possível criar a conta.");
      } else {
        const res = await authClient.signIn.email({ email, password, callbackURL: "/" });
        if (res.error) throw new Error(res.error.message || "E-mail ou senha inválidos.");
      }
      window.location.assign("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no acesso.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="paper-bg min-h-dvh">
      <CrimeTape />
      <main className="mx-auto grid min-h-[80dvh] max-w-md place-items-center px-4 py-8">
        <Panel className="w-full">
          <p className="font-display text-xs tracking-[0.2em] text-muted">D.L.P. · ARQUIVO DE AGENTES</p>
          <h1 className="mt-2 font-display text-2xl">Salvar o inquérito</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Crie conta com e-mail ou entre com Google / X para levar o progresso de Henrique a outro aparelho.
          </p>
          {authEnabled ? (
            <div className="mt-5 space-y-2">
              {GROK_PROVIDERS.map((p) => (
                <button
                  key={p.providerId}
                  type="button"
                  onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                  className="min-h-11 w-full rounded-md border border-ink/20 bg-paper px-4 text-sm font-medium hover:bg-paper-dark"
                >
                  Continuar com {p.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">Acesso desligado neste ambiente.</p>
          )}
          <div className="my-5 h-px bg-ink/10" />
          <div className="mb-3 flex gap-2">
            <button
              type="button"
              className={mode === "in" ? "text-sm font-semibold" : "text-sm text-muted"}
              onClick={() => setMode("in")}
            >
              Entrar
            </button>
            <button
              type="button"
              className={mode === "up" ? "text-sm font-semibold" : "text-sm text-muted"}
              onClick={() => setMode("up")}
            >
              Criar conta
            </button>
          </div>
          <form className="space-y-3" onSubmit={onEmail}>
            {mode === "up" ? (
              <label className="block text-sm">
                Nome no crachá
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 min-h-11 w-full rounded-md border border-ink/20 bg-paper px-3"
                />
              </label>
            ) : null}
            <label className="block text-sm">
              E-mail
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 min-h-11 w-full rounded-md border border-ink/20 bg-paper px-3"
              />
            </label>
            <label className="block text-sm">
              Senha
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 min-h-11 w-full rounded-md border border-ink/20 bg-paper px-3"
              />
            </label>
            {error ? <p className="text-sm text-stamp">{error}</p> : null}
            <PrimaryButton type="submit" className="w-full" disabled={pending}>
              {pending ? "Arquivando…" : mode === "up" ? "Criar e salvar" : "Entrar e salvar"}
            </PrimaryButton>
          </form>
          <Link to="/" className="mt-4 inline-block text-sm text-muted underline">
            Voltar à delegacia
          </Link>
        </Panel>
      </main>
    </div>
  );
}
