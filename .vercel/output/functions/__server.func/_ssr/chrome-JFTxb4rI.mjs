import { y as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chrome-JFTxb4rI.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function CrimeTape({ label = "CENA DO CRIME — ERRO GRAMATICAL" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "crime-tape h-7 w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[10px] font-semibold tracking-[0.18em] text-ink sm:text-xs",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-tape px-2 py-0.5 text-ink",
				children: label
			})
		})]
	});
}
function WantedPoster() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "relative w-full max-w-56 rotate-[-2deg] border-[3px] border-ink bg-paper p-3 shadow-[4px_6px_0_0_rgb(26_22_18/0.35)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-center text-xs tracking-[0.28em] text-stamp",
				children: "PROCURA-SE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto my-2 flex h-24 w-20 items-end justify-center bg-ink/90",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mb-1 h-16 w-12 rounded-t-full bg-paper-dark" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center font-display text-lg text-ink",
				children: "Henrique"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-center text-[11px] leading-snug text-muted",
				children: "Estagiário da D.L.P. Visto pela última vez no arquivo morto, 22h14."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "stamp-mark pointer-events-none absolute -right-2 bottom-8 px-2 py-1 text-[10px]",
				children: "desaparecido"
			})
		]
	});
}
function BadgeChip({ name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "inline-flex items-center gap-2 rounded-sm border-2 border-ink bg-tape px-2 py-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid h-6 w-6 place-items-center rounded-full bg-ink font-display text-[10px] text-tape",
			children: "DLP"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[9px] font-semibold tracking-[0.2em] text-ink",
				children: "CRACHÁ · DETETIVE"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-sm text-ink",
				children: name || "Visitante"
			})]
		})]
	});
}
function PrimaryButton({ children, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: cn("min-h-11 rounded-md bg-ink px-4 py-2.5 font-medium text-paper shadow-[0_3px_0_0_rgb(26_22_18/0.45)] transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)] hover:translate-y-px active:translate-y-0.5 disabled:opacity-50", className),
		...props,
		children
	});
}
function GhostButton({ children, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: cn("min-h-11 rounded-md border border-ink/20 bg-paper px-4 py-2.5 font-medium text-ink transition-colors duration-[var(--motion-quick)] hover:bg-paper-dark", className),
		...props,
		children
	});
}
function Panel({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("rounded-xl border border-ink/15 bg-paper p-4 sm:p-5", className),
		children
	});
}
//#endregion
export { PrimaryButton as a, Panel as i, CrimeTape as n, WantedPoster as o, GhostButton as r, cn as s, BadgeChip as t };
