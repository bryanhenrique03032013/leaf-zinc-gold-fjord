import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { FolderOpen, Lock, Search, Newspaper, PenLine, BookOpen, Stamp } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { DETECTIVES, HENRIQUE } from "@/lib/game/content";
import { getProgress, saveProgress } from "@/lib/game/progress";
import { useGame } from "@/lib/game/store";
import { LEVELS, STATION_ORDER, type StationId } from "@/lib/game/types";
import { BadgeChip, CrimeTape, GhostButton, Panel, PrimaryButton, WantedPoster } from "./chrome";
import { StationView } from "./stations";
import { cn } from "@/lib/utils";

const ICONS: Record<StationId, typeof Search> = {
  anne: Search,
  bryan: Newspaper,
  bedin: PenLine,
  gabriel: BookOpen,
  manuella: Stamp,
};

export function GameApp() {
  const game = useGame();
  const { user, isPending } = useCurrentUserState();
  const synced = useRef(false);

  useEffect(() => {
    if (isPending || !user || synced.current) return;
    synced.current = true;
    getProgress()
      .then((remote) => {
        if (!remote) {
          void saveProgress({ data: useGame.getState().snapshot() });
          return;
        }
        const local = useGame.getState();
        if (remote.completedStations.length >= local.completedStations.length) {
          local.hydrate(remote);
        } else {
          void saveProgress({ data: local.snapshot() });
        }
      })
      .catch(() => undefined);
  }, [user, isPending]);

  useEffect(() => {
    if (!user) return;
    void saveProgress({ data: useGame.getState().snapshot() }).catch(() => undefined);
  }, [user, game.completedStations, game.score, game.certified, game.level, game.detectiveName]);

  return (
    <div className="paper-bg min-h-dvh text-ink">
      <CrimeTape />
      <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <button type="button" className="text-left" onClick={() => game.go("title")}>
          <p className="font-display text-lg tracking-wide">D.L.P.</p>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-muted">DELEGACIA DA LÍNGUA</p>
        </button>
        <div className="flex items-center gap-2">
          <BadgeChip name={game.detectiveName || user?.displayName || ""} />
          {isPending ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-ink/10" />
          ) : user ? (
            <SignedIn>
              <UserButton />
            </SignedIn>
          ) : (
            <SignedOut>
              <Link
                to="/login"
                className="inline-flex min-h-11 items-center rounded-md border border-ink/20 px-3 text-sm font-medium"
              >
                Salvar conta
              </Link>
            </SignedOut>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-4">
        {game.screen === "title" && <Title />}
        {game.screen === "briefing" && <Briefing />}
        {game.screen === "hq" && <HQ />}
        {game.screen === "station" && game.activeStation && (
          <StationView
            id={game.activeStation}
            level={game.level}
            seed={game.roundSeed}
            clues={game.clues}
            onBack={() => game.go("hq")}
            onSolved={(clue, points) => {
              if (game.activeStation) game.completeStation(game.activeStation, clue, points);
            }}
          />
        )}
        {game.screen === "certificate" && <Certificate />}
      </main>
      <CrimeTape label="NÃO ULTRAPASSE — LÍNGUA PORTUGUESA" />
    </div>
  );
}

function Title() {
  const game = useGame();
  return (
    <div className="grid items-start gap-8 md:grid-cols-[1fr_auto]">
      <div>
        <p className="text-xs font-semibold tracking-[0.22em] text-stamp">INQUÉRITO ABERTO</p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          Delegacia da Língua
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
          {HENRIQUE.name} desapareceu. Cinco detetives montaram um QG barato: fita zebrada,
          lupa de papelão, chapéu de jornal. Você entra com crachá. Cada sala é um crime
          gramatical. O caso final vale certificado Nota 1000.
        </p>
        <label className="mt-6 block text-sm font-medium">
          Nome no crachá
          <input
            value={game.detectiveName}
            onChange={(e) => game.setName(e.target.value)}
            placeholder="Seu nome de detetive"
            className="mt-1 block min-h-11 w-full max-w-sm rounded-md border border-ink/20 bg-paper px-3"
          />
        </label>
        <p className="mt-6 text-sm font-medium">Nível da investigação</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {LEVELS.map((lv) => (
            <button
              key={lv.id}
              type="button"
              onClick={() => game.setLevel(lv.id)}
              className={cn(
                "min-h-20 rounded-lg border px-3 py-3 text-left",
                game.level === lv.id ? "border-ink bg-ink text-paper" : "border-ink/15 bg-paper",
              )}
            >
              <p className="font-display">{lv.label}</p>
              <p className={cn("mt-1 text-xs", game.level === lv.id ? "text-paper/80" : "text-muted")}>
                {lv.blurb}
              </p>
            </button>
          ))}
        </div>
        <PrimaryButton className="mt-6" onClick={() => game.go("briefing")}>
          Assinar o inquérito
        </PrimaryButton>
      </div>
      <WantedPoster />
    </div>
  );
}

function Briefing() {
  const game = useGame();
  return (
    <Panel className="max-w-2xl">
      <p className="font-display text-xs tracking-[0.2em] text-stamp">BRIEFING</p>
      <h2 className="mt-2 font-display text-3xl">O desaparecido chama-se Henrique</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">
        Estagiário da D.L.P., visto no arquivo morto às 22h14. Deixou um recado cheio de erros
        — de propósito. Anne, Bryan, Bedin e Gabriel D. já abriram salas. Manuella só recebe
        quem trouxer as quatro pistas e montar um parágrafo com conectivos.
      </p>
      <p className="mt-3 text-sm text-muted">
        As perguntas mudam a cada entrada na sala. Salve o progresso criando conta (e-mail)
        ou Google / X.
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <PrimaryButton onClick={() => game.go("hq")}>Entrar no QG</PrimaryButton>
        <GhostButton onClick={() => game.go("title")}>Trocar nível</GhostButton>
      </div>
    </Panel>
  );
}

function HQ() {
  const game = useGame();
  const four = game.completedStations.filter((s) => s !== "manuella").length;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl">Quartel-general</h2>
          <p className="text-sm text-muted">
            Pontuação {game.score} · salas {four}/4 · nível {LEVELS.find((l) => l.id === game.level)?.label}
          </p>
        </div>
        <GhostButton onClick={() => game.resetCase()}>Reabrir o caso</GhostButton>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {STATION_ORDER.map((id) => {
          const meta = DETECTIVES[id];
          const Icon = ICONS[id];
          const done = game.completedStations.includes(id);
          const locked = id === "manuella" && four < 4;
          return (
            <button
              key={id}
              type="button"
              disabled={locked}
              onClick={() => game.openStation(id)}
              className={cn(
                "flex min-h-28 items-start gap-3 rounded-xl border p-4 text-left",
                done ? "border-ok/40 bg-ok/10" : "border-ink/15 bg-paper",
                locked && "opacity-60",
              )}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-ink text-tape">
                {locked ? <Lock className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </span>
              <span>
                <span className="block font-display text-lg">{meta.name}</span>
                <span className="mt-1 block text-sm text-ink-soft">{meta.title}</span>
                <span className="mt-1 block text-xs text-muted">{meta.room}</span>
                {done ? <span className="mt-2 inline-block text-xs font-semibold text-ok">Pista lacrada</span> : null}
                {locked ? (
                  <span className="mt-2 block text-xs">Traga as 4 pistas para a chefia.</span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
      {game.certified ? (
        <PrimaryButton onClick={() => game.go("certificate")}>Ver certificado</PrimaryButton>
      ) : null}
    </div>
  );
}

function Certificate() {
  const game = useGame();
  return (
    <div className="mx-auto max-w-xl">
      <Panel className="relative overflow-hidden border-2 border-ink py-10 text-center">
        <FolderOpen className="mx-auto h-8 w-8 text-folder-edge" />
        <p className="mt-2 font-display text-xs tracking-[0.24em] text-muted">D.L.P. · GABINETE DA CHEFE</p>
        <h2 className="mt-4 font-display text-3xl leading-tight">
          Policial da Língua Portuguesa
          <span className="block">Nota 1000</span>
        </h2>
        <p className="mt-4 text-sm text-ink-soft">
          Certifica-se que <span className="font-semibold text-ink">{game.detectiveName || "Detetive"}</span>{" "}
          reconstituiu o paradeiro de Henrique, articulou conectivos e prendeu os erros.
        </p>
        <p className="mt-2 text-sm text-muted">Pontuação {game.score} · {LEVELS.find((l) => l.id === game.level)?.label}</p>
        <div className="stamp-mark mx-auto mt-8 inline-block px-4 py-2 text-xl">Aprovado</div>
        <p className="mt-6 text-xs text-muted">Manuella · Chefe da Delegacia</p>
      </Panel>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <PrimaryButton onClick={() => game.go("hq")}>Voltar ao QG</PrimaryButton>
        <GhostButton onClick={() => game.resetCase()}>Novo inquérito</GhostButton>
      </div>
    </div>
  );
}
