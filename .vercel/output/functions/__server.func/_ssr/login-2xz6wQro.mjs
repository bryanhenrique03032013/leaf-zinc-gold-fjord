import { o as __toESM } from "../_runtime.mjs";
import { _ as Link, y as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-Doptr1Jo.mjs";
import { a as PrimaryButton, i as Panel, n as CrimeTape } from "./chrome-JFTxb4rI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-2xz6wQro.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const [mode, setMode] = (0, import_react.useState)("in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	async function onEmail(e) {
		e.preventDefault();
		setError(null);
		setPending(true);
		try {
			if (mode === "up") {
				const res = await authClient.signUp.email({
					email,
					password,
					name: name || email.split("@")[0],
					callbackURL: "/"
				});
				if (res.error) throw new Error(res.error.message || "Não foi possível criar a conta.");
			} else {
				const res = await authClient.signIn.email({
					email,
					password,
					callbackURL: "/"
				});
				if (res.error) throw new Error(res.error.message || "E-mail ou senha inválidos.");
			}
			window.location.assign("/");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Falha no acesso.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "paper-bg min-h-dvh",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrimeTape, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto grid min-h-[80dvh] max-w-md place-items-center px-4 py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-[0.2em] text-muted",
						children: "D.L.P. · ARQUIVO DE AGENTES"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-2xl",
						children: "Salvar o inquérito"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-ink-soft",
						children: "Crie conta com e-mail ou entre com Google / X para levar o progresso de Henrique a outro aparelho."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 space-y-2",
						children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => signIn(p.providerId, { callbackURL: "/" }),
							className: "min-h-11 w-full rounded-md border border-ink/20 bg-paper px-4 text-sm font-medium hover:bg-paper-dark",
							children: ["Continuar com ", p.label]
						}, p.providerId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-5 h-px bg-ink/10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: mode === "in" ? "text-sm font-semibold" : "text-sm text-muted",
							onClick: () => setMode("in"),
							children: "Entrar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: mode === "up" ? "text-sm font-semibold" : "text-sm text-muted",
							onClick: () => setMode("up"),
							children: "Criar conta"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-3",
						onSubmit: onEmail,
						children: [
							mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: ["Nome no crachá", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: name,
									onChange: (e) => setName(e.target.value),
									className: "mt-1 min-h-11 w-full rounded-md border border-ink/20 bg-paper px-3"
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: ["E-mail", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "mt-1 min-h-11 w-full rounded-md border border-ink/20 bg-paper px-3"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: ["Senha", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									required: true,
									minLength: 8,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "mt-1 min-h-11 w-full rounded-md border border-ink/20 bg-paper px-3"
								})]
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-stamp",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
								type: "submit",
								className: "w-full",
								disabled: pending,
								children: pending ? "Arquivando…" : mode === "up" ? "Criar e salvar" : "Entrar e salvar"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mt-4 inline-block text-sm text-muted underline",
						children: "Voltar à delegacia"
					})
				]
			})
		})]
	});
}
//#endregion
export { Login as component };
