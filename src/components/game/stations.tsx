import { useMemo, useState } from "react";
import { Search, Newspaper, PenLine, BookOpen, Stamp } from "lucide-react";
import {
  anneBank,
  DETECTIVES,
  FINAL_BANK,
  HIDDEN_BANK,
  newsBank,
  STATION_CLUES,
  VOCAB_BANK,
} from "@/lib/game/content";
import { pickN, shuffle } from "@/lib/game/rng";
import type { LevelId, StationId } from "@/lib/game/types";
import { GhostButton, PrimaryButton } from "./chrome";
import { cn } from "@/lib/utils";

interface StationProps {
  level: LevelId;
  seed: number;
  clues: Partial<Record<StationId, string>>;
  onSolved: (clue: string, points: number) => void;
  onBack: () => void;
}

export function StationView(props: StationProps & { id: StationId }) {
  const meta = DETECTIVES[props.id];
  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <p className="text-xs font-semibold tracking-[0.18em] text-muted">{meta.room}</p>
        <h2 className="font-display text-2xl text-ink">{meta.name}</h2>
        <p className="text-sm text-ink-soft">{meta.title}</p>
        <p className="text-sm text-muted">Crime: {meta.crime}</p>
      </header>
      {props.id === "anne" && <AnneGame {...props} />}
      {props.id === "bryan" && <BryanGame {...props} />}
      {props.id === "bedin" && <BedinGame {...props} />}
      {props.id === "gabriel" && <GabrielGame {...props} />}
      {props.id === "manuella" && <ManuellaGame {...props} />}
    </div>
  );
}

function AnneGame({ level, seed, onSolved, onBack }: StationProps) {
  const n = level === "iniciante" ? 6 : 8;
  const items = useMemo(() => pickN(anneBank(level), n, seed), [level, seed, n]);
  const [marked, setMarked] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);

  const allRight =
    items.length > 0 && items.every((it) => marked[it.id] === it.errorIndex);

  function submit() {
    setChecked(true);
    if (!allRight) return;
    onSolved(STATION_CLUES.anne, 100);
  }

  return (
    <div className="space-y-4">
      <p className="flex items-start gap-2 text-sm text-ink-soft">
        <Search className="mt-0.5 h-4 w-4 shrink-0" />
        Toque a palavra criminosa em cada frase. Prenda com um X vermelho.
      </p>
      <ol className="space-y-3">
        {items.map((it, i) => (
          <li key={it.id} className="rounded-lg border border-ink/10 bg-paper-dark/40 p-3">
            <p className="mb-2 text-[11px] font-semibold tracking-wider text-muted">PISTA {i + 1}</p>
            <p className="flex flex-wrap gap-1.5">
              {it.tokens.map((tok, idx) => {
                const isMark = marked[it.id] === idx;
                const isError = idx === it.errorIndex;
                return (
                  <button
                    key={`${it.id}-${idx}`}
                    type="button"
                    onClick={() => setMarked((m) => ({ ...m, [it.id]: idx }))}
                    className={cn(
                      "relative min-h-10 rounded-sm px-2 py-1 text-left text-base text-ink",
                      isMark ? "bg-stamp/10" : "hover:bg-ink/5",
                    )}
                  >
                    {tok}
                    {isMark ? (
                      <span className="pointer-events-none absolute inset-0 grid place-items-center font-display text-2xl text-stamp">
                        X
                      </span>
                    ) : null}
                    {checked && isMark && !isError ? (
                      <span className="sr-only">marcado errado</span>
                    ) : null}
                  </button>
                );
              })}
            </p>
            {checked && marked[it.id] === it.errorIndex ? (
              <p className="mt-2 text-xs text-ok">
                Correção: {it.correction || "apague o excesso"}. {it.why}
              </p>
            ) : null}
            {checked && marked[it.id] !== it.errorIndex ? (
              <p className="mt-2 text-xs text-stamp">Ainda solto. Olhe de novo com a lupa.</p>
            ) : null}
          </li>
        ))}
      </ol>
      <div className="flex flex-col gap-2 sm:flex-row">
        <PrimaryButton onClick={submit} disabled={items.some((it) => marked[it.id] === undefined)}>
          Prender erros
        </PrimaryButton>
        <GhostButton onClick={onBack}>Voltar ao QG</GhostButton>
      </div>
    </div>
  );
}

function BryanGame({ level, seed, onSolved, onBack }: StationProps) {
  const pair = useMemo(() => pickN(newsBank(level), 1, seed)[0], [level, seed]);
  const order = useMemo(() => shuffle(["true", "fake"] as const, seed + 3), [seed]);
  const [pick, setPick] = useState<"true" | "fake" | null>(null);
  const [checked, setChecked] = useState(false);

  if (!pair) return null;

  const cards = {
    true: pair.trueNews,
    fake: pair.fakeNews,
  };

  function submit() {
    setChecked(true);
    if (pick !== "fake") return;
    onSolved(STATION_CLUES.bryan, 100);
  }

  return (
    <div className="space-y-4">
      <p className="flex items-start gap-2 text-sm text-ink-soft">
        <Newspaper className="mt-0.5 h-4 w-4 shrink-0" />
        Uma é verdadeira (fonte e argumento). A outra é fake. Carimbe a falsa.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {order.map((key) => {
          const n = cards[key];
          const selected = pick === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setPick(key)}
              className={cn(
                "relative min-h-44 rounded-lg border bg-paper p-4 text-left shadow-sm",
                selected ? "border-stamp" : "border-ink/15",
              )}
            >
              <p className="font-display text-[10px] tracking-[0.2em] text-muted">EDIÇÃO DE PAREDE</p>
              <h3 className="mt-1 font-display text-lg leading-snug text-ink">{n.headline}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{n.body}</p>
              <p className="mt-3 text-xs text-muted">Fonte: {n.source}</p>
              {selected ? (
                <span className="stamp-mark pointer-events-none absolute right-3 top-8 px-3 py-1 text-sm">
                  FAKE?
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      {checked && pick === "fake" ? (
        <p className="text-sm text-ok">Carimbo certo: falta fonte confiável ou argumento verificável.</p>
      ) : null}
      {checked && pick !== "fake" ? (
        <p className="text-sm text-stamp">Essa tinha fonte. A fake é a que não prova nada.</p>
      ) : null}
      <div className="flex flex-col gap-2 sm:flex-row">
        <PrimaryButton onClick={submit} disabled={!pick}>
          Carimbar FAKE
        </PrimaryButton>
        <GhostButton onClick={onBack}>Voltar ao QG</GhostButton>
      </div>
    </div>
  );
}

function BedinGame({ level, seed, onSolved, onBack }: StationProps) {
  const item = useMemo(() => pickN(HIDDEN_BANK[level], 1, seed)[0], [level, seed]);
  const [found, setFound] = useState<number[]>([]);
  const [miss, setMiss] = useState(false);

  if (!item) return null;
  const errors = item.tokens
    .map((t, i) => (t.error ? i : -1))
    .filter((i) => i >= 0);
  const done = errors.length > 0 && errors.every((i) => found.includes(i));

  function tap(i: number) {
    const tok = item.tokens[i];
    if (!tok.error) {
      setMiss(true);
      return;
    }
    setMiss(false);
    setFound((f) => (f.includes(i) ? f : [...f, i]));
  }

  return (
    <div className="space-y-4">
      <p className="flex items-start gap-2 text-sm text-ink-soft">
        <PenLine className="mt-0.5 h-4 w-4 shrink-0" />
        {item.intro} Adesivo de Detetive Júnior se prender todos.
      </p>
      <div className="rounded-lg border border-dashed border-paper bg-ink p-4 text-paper">
        <p className="mb-3 font-display text-xs tracking-[0.2em] text-tape">QUADRO-NEGRO</p>
        <p className="flex flex-wrap gap-1.5 leading-relaxed">
          {item.tokens.map((tok, i) => {
            const caught = found.includes(i);
            return (
              <button
                key={`${tok.text}-${i}`}
                type="button"
                onClick={() => tap(i)}
                className={cn(
                  "min-h-10 rounded-sm px-1.5 font-display text-lg",
                  caught ? "bg-stamp text-paper line-through" : "hover:bg-paper/10",
                )}
              >
                {tok.text}
              </button>
            );
          })}
        </p>
      </div>
      <p className="text-sm text-muted">
        Presos {found.length} de {errors.length}
      </p>
      {miss ? <p className="text-sm text-stamp">Essa palavra é inocente.</p> : null}
      {done ? (
        <p className="text-sm text-ok">
          {item.tokens.find((t) => t.error)?.error} Adesivo: Detetive Júnior.
        </p>
      ) : null}
      <div className="flex flex-col gap-2 sm:flex-row">
        <PrimaryButton disabled={!done} onClick={() => onSolved(STATION_CLUES.bedin, 100)}>
          Lacrar quadro
        </PrimaryButton>
        <GhostButton onClick={onBack}>Voltar ao QG</GhostButton>
      </div>
    </div>
  );
}

function GabrielGame({ level, seed, onSolved, onBack }: StationProps) {
  const item = useMemo(() => pickN(VOCAB_BANK[level], 1, seed)[0], [level, seed]);
  const [picks, setPicks] = useState<Record<number, string>>({});

  if (!item) return null;
  const ok = item.slots.every((s, i) => picks[i] === s.answer);

  return (
    <div className="space-y-4">
      <p className="flex items-start gap-2 text-sm text-ink-soft">
        <BookOpen className="mt-0.5 h-4 w-4 shrink-0" />
        O texto plagiou a mesma palavra. Troque por sinônimos do fichário.
      </p>
      <div className="rounded-lg border border-folder-edge/40 bg-folder/30 p-4">
        <p className="font-display text-xs tracking-[0.18em] text-folder-edge">{item.title}</p>
        <div className="mt-3 space-y-3">
          {item.slots.map((s, i) => (
            <p key={i} className="flex flex-wrap items-center gap-2 text-base text-ink">
              <span>{s.before}</span>
              <span className="rounded-sm bg-stamp/15 px-1 font-display line-through">{s.repeated}</span>
              <select
                className="min-h-11 min-w-40 rounded-md border border-ink/20 bg-paper px-2 text-sm"
                value={picks[i] ?? ""}
                onChange={(e) => setPicks((p) => ({ ...p, [i]: e.target.value }))}
              >
                <option value="">sinônimo…</option>
                {s.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <span>{s.after}</span>
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <PrimaryButton disabled={!ok} onClick={() => onSolved(STATION_CLUES.gabriel, 100)}>
          Arquivar sinônimos
        </PrimaryButton>
        <GhostButton onClick={onBack}>Voltar ao QG</GhostButton>
      </div>
    </div>
  );
}

function ManuellaGame({ level, seed, clues, onSolved, onBack }: StationProps) {
  const puzzle = useMemo(() => pickN(FINAL_BANK[level], 1, seed)[0], [level, seed]);
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  if (!puzzle) return null;
  const ok = puzzle.blanks.every((b, i) => picks[i] === b.answer);

  function submit() {
    setChecked(true);
    if (!ok) return;
    onSolved("Parágrafo lacrado com conectivos. Henrique segue na biblioteca.", 200);
  }

  return (
    <div className="space-y-4">
      <p className="flex items-start gap-2 text-sm text-ink-soft">
        <Stamp className="mt-0.5 h-4 w-4 shrink-0" />
        Junte as pistas e monte um parágrafo com conectivos. Carimbo: APROVADO.
      </p>
      <ul className="space-y-2">
        {(["anne", "bryan", "bedin", "gabriel"] as const).map((id) => (
          <li key={id} className="rounded-md border border-ink/10 bg-paper-dark/40 px-3 py-2 text-sm">
            <span className="font-semibold">{DETECTIVES[id].name}: </span>
            {clues[id] ?? STATION_CLUES[id]}
          </li>
        ))}
      </ul>
      <article className="rounded-lg border border-ink/15 bg-paper p-4 text-base leading-relaxed text-ink">
        {puzzle.template.map((chunk, i) => (
          <span key={i}>
            {chunk}
            {puzzle.blanks[i] ? (
              <select
                className="mx-1 mb-1 min-h-11 min-w-36 rounded-md border border-ink/20 bg-paper-dark/50 px-2 text-sm"
                value={picks[i] ?? ""}
                onChange={(e) => setPicks((p) => ({ ...p, [i]: e.target.value }))}
              >
                <option value="">conectivo…</option>
                {puzzle.blanks[i].options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : null}
          </span>
        ))}
      </article>
      {checked && !ok ? (
        <p className="text-sm text-stamp">Ainda sem nota 1000. Troque os conectivos frouxos.</p>
      ) : null}
      <div className="flex flex-col gap-2 sm:flex-row">
        <PrimaryButton onClick={submit}>Pedir carimbo da chefia</PrimaryButton>
        <GhostButton onClick={onBack}>Voltar ao QG</GhostButton>
      </div>
    </div>
  );
}
