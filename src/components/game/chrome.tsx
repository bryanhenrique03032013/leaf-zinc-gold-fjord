import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CrimeTape({ label = "CENA DO CRIME — ERRO GRAMATICAL" }: { label?: string }) {
  return (
    <div className="relative overflow-hidden">
      <div className="crime-tape h-7 w-full" />
      <p className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[10px] font-semibold tracking-[0.18em] text-ink sm:text-xs">
        <span className="bg-tape px-2 py-0.5 text-ink">{label}</span>
      </p>
    </div>
  );
}

export function WantedPoster() {
  return (
    <aside className="relative w-full max-w-56 rotate-[-2deg] border-[3px] border-ink bg-paper p-3 shadow-[4px_6px_0_0_rgb(26_22_18/0.35)]">
      <p className="font-display text-center text-xs tracking-[0.28em] text-stamp">PROCURA-SE</p>
      <div className="mx-auto my-2 flex h-24 w-20 items-end justify-center bg-ink/90">
        <div className="mb-1 h-16 w-12 rounded-t-full bg-paper-dark" />
      </div>
      <p className="text-center font-display text-lg text-ink">Henrique</p>
      <p className="mt-1 text-center text-[11px] leading-snug text-muted">
        Estagiário da D.L.P. Visto pela última vez no arquivo morto, 22h14.
      </p>
      <span className="stamp-mark pointer-events-none absolute -right-2 bottom-8 px-2 py-1 text-[10px]">
        desaparecido
      </span>
    </aside>
  );
}

export function BadgeChip({ name }: { name: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-sm border-2 border-ink bg-tape px-2 py-1">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-ink font-display text-[10px] text-tape">
        DLP
      </span>
      <div className="leading-tight">
        <p className="text-[9px] font-semibold tracking-[0.2em] text-ink">CRACHÁ · DETETIVE</p>
        <p className="font-display text-sm text-ink">{name || "Visitante"}</p>
      </div>
    </div>
  );
}

export function PrimaryButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "min-h-11 rounded-md bg-ink px-4 py-2.5 font-medium text-paper shadow-[0_3px_0_0_rgb(26_22_18/0.45)] transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)] hover:translate-y-px active:translate-y-0.5 disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "min-h-11 rounded-md border border-ink/20 bg-paper px-4 py-2.5 font-medium text-ink transition-colors duration-[var(--motion-quick)] hover:bg-paper-dark",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-xl border border-ink/15 bg-paper p-4 sm:p-5", className)}>
      {children}
    </section>
  );
}
