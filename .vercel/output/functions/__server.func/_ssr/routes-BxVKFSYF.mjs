import { o as __toESM } from "../_runtime.mjs";
import { _ as Link, y as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { A as boolean, D as _enum, F as object, L as record, P as number, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { i as signOut, t as authClient } from "./client-B40BzJxt.mjs";
import { a as hasGateSessionMarker } from "./server-Doptr1Jo.mjs";
import { a as PrimaryButton, i as Panel, n as CrimeTape, o as WantedPoster, r as GhostButton, s as cn, t as BadgeChip } from "./chrome-JFTxb4rI.mjs";
import { t as authMiddleware } from "./middleware-DB1X0hm1.mjs";
import { a as Newspaper, c as BookOpen, i as PenLine, n as Stamp, o as Lock, r as Search, s as FolderOpen } from "../_libs/lucide-react.mjs";
import { n as createSsrRpc } from "./router-BrB2a46J.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BxVKFSYF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/** Render children only when a user is present (real session, or the disabled-auth dev user). */
function SignedIn({ children }) {
	const { user } = useCurrentUserState();
	return user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
}
/**
* Render children only once we KNOW the visitor is signed out (`isPending` has
* cleared and there is no user). Hidden while the session is still loading.
*/
function SignedOut({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending || user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var HENRIQUE = {
	name: "Henrique",
	role: "estagiário da D.L.P.",
	lastSeen: "Arquivo Morto — 22h14",
	note: "Deixou um recado cheio de pistas gramaticais."
};
var DETECTIVES = {
	anne: {
		name: "Anne",
		title: "Detetive da Concordância e Transitividade",
		crime: "Frases com erro de concordância ou regência",
		room: "Sala 01 — Parede de provas"
	},
	bryan: {
		name: "Bryan",
		title: "Detetive do Fake News",
		crime: "Notícia sem fonte nem argumento",
		room: "Sala 02 — Redação do jornal"
	},
	bedin: {
		name: "Bedin",
		title: "Detetive Ortográfico",
		crime: "Palavras erradas escondidas no texto",
		room: "Sala 03 — Quadro-negro"
	},
	gabriel: {
		name: "Gabriel D.",
		title: "Detetive do Plágio",
		crime: "Texto com repetição e vocabulário pobre",
		room: "Sala 04 — Fichário de sinônimos"
	},
	manuella: {
		name: "Manuella",
		title: "Chefe da Delegacia",
		crime: "Redação sem conectivos",
		room: "Gabinete — O caso final"
	}
};
var STATION_CLUES = {
	anne: "O recado de Henrique quebrava a concordância de propósito.",
	bryan: "A notícia verdadeira aponta a biblioteca; a falsa diz que ele viajou.",
	bedin: "No quadro, ele misturou 'a gente' e 'agente' para despistar.",
	gabriel: "O relatório copiado repetia 'detetive' sem sinônimo."
};
var ANNE = {
	iniciante: [
		{
			id: "a1",
			tokens: [
				"Haviam",
				"muitas",
				"pistas",
				"no",
				"arquivo",
				"."
			],
			errorIndex: 0,
			correction: "Havia",
			why: "Haver no sentido de existir é impessoal: Havia muitas pistas."
		},
		{
			id: "a2",
			tokens: [
				"Fazem",
				"dois",
				"anos",
				"que",
				"Henrique",
				"entrou",
				"na",
				"delegacia",
				"."
			],
			errorIndex: 0,
			correction: "Faz",
			why: "Fazer indicando tempo é impessoal: Faz dois anos."
		},
		{
			id: "a3",
			tokens: [
				"A",
				"gente",
				"fomos",
				"até",
				"o",
				"arquivo",
				"morto",
				"."
			],
			errorIndex: 2,
			correction: "foi",
			why: "'A gente' pede verbo no singular: A gente foi."
		},
		{
			id: "a4",
			tokens: [
				"Houveram",
				"vários",
				"depoimentos",
				"falsos",
				"."
			],
			errorIndex: 0,
			correction: "Houve",
			why: "Haver = existir: Houve depoimentos."
		},
		{
			id: "a5",
			tokens: [
				"Os",
				"detetive",
				"encontraram",
				"um",
				"chapéu",
				"de",
				"jornal",
				"."
			],
			errorIndex: 1,
			correction: "detetives",
			why: "Concordância nominal: Os detetives."
		},
		{
			id: "a6",
			tokens: [
				"Eu",
				"lhe",
				"vi",
				"na",
				"biblioteca",
				"."
			],
			errorIndex: 1,
			correction: "o",
			why: "Ver 'ver' é transitivo direto: Eu o vi."
		},
		{
			id: "a7",
			tokens: [
				"Assisti",
				"o",
				"depoimento",
				"inteiro",
				"."
			],
			errorIndex: 1,
			correction: "ao",
			why: "Assistir no sentido de ver pede a: Assisti ao depoimento."
		},
		{
			id: "a8",
			tokens: [
				"Fazem",
				"frio",
				"no",
				"porão",
				"da",
				"delegacia",
				"."
			],
			errorIndex: 0,
			correction: "Faz",
			why: "Fazer indicando fenômeno é impessoal: Faz frio."
		},
		{
			id: "a9",
			tokens: [
				"Sobrou",
				"poucas",
				"provas",
				"depois",
				"do",
				"incêndio",
				"."
			],
			errorIndex: 0,
			correction: "Sobraram",
			why: "O sujeito é 'poucas provas': Sobraram poucas provas."
		},
		{
			id: "a10",
			tokens: [
				"Trata-se",
				"de",
				"casos",
				"graves",
				"e",
				"exige",
				"sigilo",
				"."
			],
			errorIndex: 5,
			correction: "exigem",
			why: "O sujeito é 'casos graves': exigem sigilo."
		},
		{
			id: "a11",
			tokens: [
				"Aluga-se",
				"salas",
				"para",
				"inquérito",
				"."
			],
			errorIndex: 0,
			correction: "Alugam-se",
			why: "Voz passiva sintética: Alugam-se salas."
		},
		{
			id: "a12",
			tokens: [
				"Havia",
				"chegados",
				"muitos",
				"visitantes",
				"."
			],
			errorIndex: 1,
			correction: "chegado",
			why: "Com ter/haver, particípio invariável: Havia chegado."
		}
	],
	intermediario: [
		{
			id: "b1",
			tokens: [
				"Informei",
				"o",
				"chefe",
				"o",
				"paradeiro",
				"de",
				"Henrique",
				"."
			],
			errorIndex: 3,
			correction: "do",
			why: "Informar alguém de algo: Informei o chefe do paradeiro."
		},
		{
			id: "b2",
			tokens: [
				"Os",
				"fatos",
				"que",
				"se",
				"viu",
				"não",
				"fecham",
				"."
			],
			errorIndex: 4,
			correction: "viram",
			why: "Concordância com 'fatos': que se viram."
		},
		{
			id: "b3",
			tokens: [
				"Chegamos",
				"a",
				"delegacia",
				"antes",
				"do",
				"amanhecer",
				"."
			],
			errorIndex: 1,
			correction: "à",
			why: "Chegar a + a delegacia = à (crase)."
		},
		{
			id: "b4",
			tokens: [
				"Prefiro",
				"o",
				"silêncio",
				"do",
				"que",
				"o",
				"boato",
				"."
			],
			errorIndex: 3,
			correction: "ao",
			why: "Preferir algo a algo: Prefiro o silêncio ao boato."
		},
		{
			id: "b5",
			tokens: [
				"Obedeci",
				"o",
				"protocolo",
				"da",
				"chefia",
				"."
			],
			errorIndex: 1,
			correction: "ao",
			why: "Obedecer é transitivo indireto: Obedeci ao protocolo."
		},
		{
			id: "b6",
			tokens: [
				"Fazem",
				"meses",
				"que",
				"o",
				"caso",
				"está",
				"aberto",
				"."
			],
			errorIndex: 0,
			correction: "Faz",
			why: "Tempo decorrido: Faz meses."
		},
		{
			id: "b7",
			tokens: [
				"A",
				"maioria",
				"dos",
				"agentes",
				"estavam",
				"no",
				"pátio",
				"."
			],
			errorIndex: 4,
			correction: "estava",
			why: "Com 'a maioria', o verbo pode ir ao núcleo: estava (forma culta preferida)."
		},
		{
			id: "b8",
			tokens: [
				"Visamos",
				"o",
				"cargo",
				"de",
				"inspetor",
				"."
			],
			errorIndex: 1,
			correction: "ao",
			why: "Visar = almejar pede a: Visamos ao cargo."
		},
		{
			id: "b9",
			tokens: [
				"Namorar",
				"com",
				"a",
				"verdade",
				"não",
				"é",
				"método",
				"."
			],
			errorIndex: 1,
			correction: "",
			why: "Namorar é transitivo direto: Namorar a verdade (sem com)."
		},
		{
			id: "b10",
			tokens: [
				"Implicou",
				"no",
				"desaparecimento",
				"sem",
				"prova",
				"."
			],
			errorIndex: 1,
			correction: "o",
			why: "Implicar = envolver é TD: Implicou o desaparecimento."
		},
		{
			id: "b11",
			tokens: [
				"Haviam",
				"sido",
				"apagadas",
				"as",
				"gravações",
				"."
			],
			errorIndex: 0,
			correction: "Havia",
			why: "Haver auxiliar de tempo composto não varia: Havia sido."
		},
		{
			id: "b12",
			tokens: [
				"Custou",
				"caro",
				"aos",
				"boatos",
				"se",
				"espalhar",
				"."
			],
			errorIndex: 0,
			correction: "Custou-lhes",
			why: "Custar = ser difícil: Custou aos boatos espalhar-se (verbo no singular)."
		}
	],
	enem: [
		{
			id: "c1",
			tokens: [
				"Ao",
				"invés",
				"de",
				"confessar,",
				"inventou",
				"um",
				"álibi",
				"."
			],
			errorIndex: 1,
			correction: "em vez",
			why: "'Ao invés de' = ao contrário; aqui cabe 'em vez de' (substituição)."
		},
		{
			id: "c2",
			tokens: [
				"A",
				"cerca",
				"de",
				"dez",
				"agentes",
				"revistaram",
				"o",
				"porão",
				"."
			],
			errorIndex: 0,
			correction: "Cerca",
			why: "Quantidade aproximada: Cerca de dez (sem o artigo A)."
		},
		{
			id: "c3",
			tokens: [
				"Cerca",
				"de",
				"dez",
				"agentes",
				"revistou",
				"o",
				"porão",
				"."
			],
			errorIndex: 4,
			correction: "revistaram",
			why: "Sujeito no plural: revistaram."
		},
		{
			id: "c4",
			tokens: [
				"O",
				"relatório",
				"cujo",
				"o",
				"autor",
				"sumiu",
				"está",
				"incompleto",
				"."
			],
			errorIndex: 3,
			correction: "",
			why: "Cujo não admite artigo: cujo autor."
		},
		{
			id: "c5",
			tokens: [
				"Se",
				"eu",
				"ver",
				"Henrique,",
				"aviso",
				"a",
				"chefe",
				"."
			],
			errorIndex: 2,
			correction: "vir",
			why: "Futuro do subjuntivo de ver: se eu vir."
		},
		{
			id: "c6",
			tokens: [
				"Se",
				"eu",
				"manter",
				"o",
				"sigilo,",
				"o",
				"caso",
				"avança",
				"."
			],
			errorIndex: 2,
			correction: "mantiver",
			why: "Futuro do subjuntivo de manter: se eu mantiver."
		},
		{
			id: "c7",
			tokens: [
				"Se",
				"nós",
				"vermos",
				"Henrique,",
				"avisamos",
				"a",
				"chefe",
				"."
			],
			errorIndex: 2,
			correction: "virmos",
			why: "Futuro do subjuntivo de ver: se nós virmos."
		},
		{
			id: "c8",
			tokens: [
				"Menas",
				"pistas",
				"apareceram",
				"depois",
				"da",
				"chuva",
				"."
			],
			errorIndex: 0,
			correction: "Menos",
			why: "Menos é invariável: Menos pistas."
		},
		{
			id: "c9",
			tokens: [
				"Vou",
				"ao",
				"encontro",
				"a",
				"Henrique",
				"amanhã",
				"."
			],
			errorIndex: 3,
			correction: "de",
			why: "Ir ao encontro de = favorável/encontrar."
		},
		{
			id: "c10",
			tokens: [
				"Este",
				"é",
				"um",
				"dos",
				"casos",
				"que",
				"mais",
				"me",
				"intrigou",
				"."
			],
			errorIndex: 8,
			correction: "intrigaram",
			why: "Que retoma 'casos': intrigaram."
		},
		{
			id: "c11",
			tokens: [
				"Não",
				"o",
				"vi",
				"a",
				"ele",
				"na",
				"estação",
				"."
			],
			errorIndex: 3,
			correction: "",
			why: "Redundância: Não o vi na estação (sem 'a ele')."
		},
		{
			id: "c12",
			tokens: [
				"Fazem",
				"quinze",
				"dias",
				"que",
				"Henrique",
				"sumiu",
				"."
			],
			errorIndex: 0,
			correction: "Faz",
			why: "Tempo: Faz quinze dias."
		}
	]
};
var NEWS = {
	iniciante: [
		{
			id: "n1",
			trueNews: {
				headline: "Estagiário é visto na biblioteca municipal",
				body: "A bibliotecária Lúcia Mendes confirmou que Henrique consultou gramáticas às 21h. O registro de entrada está no livro de visitantes.",
				source: "Boletim interno da D.L.P., 22/09"
			},
			fakeNews: {
				headline: "Henrique embarcou para o exterior",
				body: "Circula que o desaparecido viajou sem avisar. Ninguém mostra passagem, foto ou depoimento.",
				source: "Perfil anônimo em rede social"
			}
		},
		{
			id: "n2",
			trueNews: {
				headline: "Chapéu de jornal encontrado no arquivo morto",
				body: "O perito Carlos Nunes descreveu o objeto no laudo 441. Havia anotações de concordância na aba.",
				source: "Laudo 441 / Setor de Perícias"
			},
			fakeNews: {
				headline: "Delegacia é invadida por alienígenas da língua",
				body: "Fontes não identificadas afirmam que seres vieram corrigir crase. Sem imagem, sem nome, sem hora.",
				source: "Cadeia de mensagens"
			}
		},
		{
			id: "n3",
			trueNews: {
				headline: "Câmera registra Henrique saindo às 22h14",
				body: "A imagem da portaria, autenticada pela segurança, mostra o estagiário com uma pasta vermelha.",
				source: "Portaria / CFTV, 22h14"
			},
			fakeNews: {
				headline: "Chefe Manuella demite toda a equipe",
				body: "Dizem por aí. Não há comunicado oficial nem entrevista.",
				source: "Boato de corredor"
			}
		},
		{
			id: "n4",
			trueNews: {
				headline: "Dicionário de papelão some da sala 04",
				body: "Gabriel D. registrou o furto no livro de ocorrências, com horário e testemunha.",
				source: "Livro de ocorrências, sala 04"
			},
			fakeNews: {
				headline: "Sinônimos foram proibidos no país",
				body: "Um texto viral promete multa para quem usar 'entretanto'. Sem lei, sem órgão, sem data.",
				source: "Site sem editor-chefe"
			}
		}
	],
	intermediario: [
		{
			id: "n5",
			trueNews: {
				headline: "Análise grafotécnica confirma recado de Henrique",
				body: "O laboratório comparou a letra com os relatórios do estagiário. Conclusão: autoria provável, com erros propositalmente marcados.",
				source: "Lab. Grafotécnico, parecer 18"
			},
			fakeNews: {
				headline: "Especialistas afirmam que Henrique nunca existiu",
				body: "Os tais especialistas não são nomeados. O texto só usa 'muita gente diz'.",
				source: "Blog sem autor"
			}
		},
		{
			id: "n6",
			trueNews: {
				headline: "Ônibus 27 parou na biblioteca após o expediente",
				body: "A empresa de ônibus enviou a listagem de embarque com o cartão funcional de Henrique.",
				source: "Transporte Municipal, ofício 90"
			},
			fakeNews: {
				headline: "Testemunha exclusiva revela sequestro",
				body: "A testemunha 'não pode se identificar'. Não descreve veículo, hora ou rua.",
				source: "Canal de rumores"
			}
		},
		{
			id: "n7",
			trueNews: {
				headline: "Pasta vermelha continha rascunhos de redação",
				body: "Anne catalogou três folhas com conectivos circulados. O material está lacrado.",
				source: "Auto de apreensão 12"
			},
			fakeNews: {
				headline: "Redação nota 1000 é golpe da chefia",
				body: "Afirmação sem dado, sem prova e sem responsável.",
				source: "Comentário em fórum"
			}
		}
	],
	enem: [
		{
			id: "n8",
			trueNews: {
				headline: "Perícia linguística: erros deliberados no recado",
				body: "O parecer cita frequência de desvios incompatível com o histórico escolar de Henrique e aponta intenção de deixar pistas.",
				source: "Parecer linguístico 03 / D.L.P."
			},
			fakeNews: {
				headline: "Estudo prova que concordância não importa",
				body: "O 'estudo' não tem universidade, amostra nem data. Só conclusões apelativas.",
				source: "Infográfico sem citação"
			}
		},
		{
			id: "n9",
			trueNews: {
				headline: "Biblioteca registra empréstimo de 'Nova Gramática'",
				body: "O sistema mostra o código do crachá de Henrique e a devolução em aberto.",
				source: "Acervo municipal / terminal 2"
			},
			fakeNews: {
				headline: "Fontes próximas dizem que o caso já foi resolvido",
				body: "Quem são as fontes? O texto não diz. Tampouco apresenta o paradeiro.",
				source: "Manchete sem lide"
			}
		},
		{
			id: "n10",
			trueNews: {
				headline: "Manuella convoca inquérito interno por plágio",
				body: "A portaria 77 detalha o relatório copiado e nomeia Gabriel D. como relator.",
				source: "Portaria 77 da Chefia"
			},
			fakeNews: {
				headline: "Plágio agora é permitido se for 'homenagem'",
				body: "Nenhuma norma é citada. Argumento circular: 'porque eu acho'.",
				source: "Opinião disfarçada de fato"
			}
		}
	]
};
var HIDDEN_BANK = {
	iniciante: [
		{
			id: "hi1",
			intro: "Toque as palavras escritas no sentido errado.",
			tokens: [
				{ text: "Henrique" },
				{ text: "deixou" },
				{ text: "um" },
				{ text: "bilhete:" },
				{ text: "\"A" },
				{ text: "gente" },
				{
					text: "vamos",
					error: "'A gente' pede verbo no singular: vai — e o crime ortográfico da estação é o par a gente / agente. Aqui 'vamos' denuncia o descuido."
				},
				{ text: "achar" },
				{ text: "o" },
				{ text: "agente" },
				{ text: "mas" },
				{ text: "tem" },
				{
					text: "mais",
					error: "Oposição: mas. 'Mais' indica quantidade."
				},
				{ text: "confusão" },
				{ text: "do" },
				{ text: "que" },
				{ text: "pista.\"" }
			]
		},
		{
			id: "hi2",
			intro: "Caça às trapaças: onde o sentido quebra.",
			tokens: [
				{ text: "O" },
				{ text: "inspetor" },
				{ text: "disse" },
				{
					text: "pra",
					error: "Na escrita formal: para / para a."
				},
				{ text: "nós" },
				{ text: "que" },
				{ text: "tinha" },
				{ text: "menos" },
				{ text: "pistas." },
				{ text: "Na" },
				{ text: "hora" },
				{ text: "h" },
				{ text: "alguém" },
				{ text: "escreveu" },
				{
					text: "menas",
					error: "Menos é invariável."
				},
				{ text: "provas" },
				{ text: "no" },
				{ text: "quadro." }
			]
		},
		{
			id: "hi3",
			intro: "Três desvios no mesmo depoimento.",
			tokens: [
				{ text: "Eu" },
				{ text: "vi" },
				{
					text: "ele",
					error: "Pronome oblíquo: Eu o vi / vi-o."
				},
				{ text: "sair." },
				{ text: "A" },
				{ text: "gente" },
				{
					text: "ficamos",
					error: "A gente ficou."
				},
				{ text: "na" },
				{ text: "porta" },
				{
					text: "mais",
					error: "Adversativo: mas."
				},
				{ text: "ele" },
				{ text: "já" },
				{ text: "tinha" },
				{ text: "ido." }
			]
		},
		{
			id: "hi4",
			intro: "Ortografia de correio interno.",
			tokens: [
				{ text: "Preciso" },
				{ text: "da" },
				{ text: "sua" },
				{ text: "ajuda" },
				{
					text: "as",
					error: "Tempo decorrido: há vezes / há dias."
				},
				{ text: "vezes." },
				{ text: "O" },
				{ text: "dicionário" },
				{ text: "está" },
				{
					text: "atras",
					error: "Atrás (com acento)."
				},
				{ text: "da" },
				{ text: "estante." }
			]
		},
		{
			id: "hi5",
			intro: "Homófonos na parede.",
			tokens: [
				{ text: "O" },
				{ text: "caso" },
				{
					text: "esta",
					error: "Está (verbo) leva acento."
				},
				{ text: "frio." },
				{ text: "Isso" },
				{ text: "não" },
				{ text: "tem" },
				{ text: "nada" },
				{
					text: "haver",
					error: "Nada a ver (relação)."
				},
				{ text: "com" },
				{ text: "viagem." }
			]
		}
	],
	intermediario: [
		{
			id: "hm1",
			intro: "Crase e homônimos no boletim.",
			tokens: [
				{ text: "Fomos" },
				{
					text: "a",
					error: "Fomos à delegacia (crase: a + a)."
				},
				{ text: "delegacia" },
				{
					text: "as",
					error: "às 22h."
				},
				{ text: "22h." },
				{ text: "Henrique" },
				{ text: "tinha" },
				{ text: "ido" },
				{ text: "a" },
				{ text: "pé" },
				{
					text: "mais",
					error: "mas não voltou."
				},
				{ text: "não" },
				{ text: "voltou." }
			]
		},
		{
			id: "hm2",
			intro: "Por que / porque / porquê.",
			tokens: [
				{ text: "Ninguém" },
				{ text: "sabe" },
				{ text: "o" },
				{
					text: "porque",
					error: "O porquê (substantivo) leva acento."
				},
				{ text: "da" },
				{ text: "fuga." },
				{
					text: "Porque",
					error: "Pergunta: Por que Henrique saiu?"
				},
				{ text: "Henrique" },
				{ text: "saiu?" },
				{ text: "Vamos" },
				{ text: "averiguar" },
				{ text: "por" },
				{
					text: "quê",
					error: "Fim de frase: por quê."
				},
				{ text: "amanhã." }
			]
		},
		{
			id: "hm3",
			intro: "Onde / aonde / mal / mau.",
			tokens: [
				{
					text: "Aonde",
					error: "Onde (situação, sem movimento)."
				},
				{ text: "está" },
				{ text: "o" },
				{ text: "dicionário?" },
				{ text: "O" },
				{
					text: "mau",
					error: "Mal (advérbio) escrito: o recado foi mal redigido."
				},
				{ text: "redigido" },
				{ text: "recado" },
				{ text: "confundiu" },
				{ text: "a" },
				{ text: "equipe" },
				{ text: "se" },
				{
					text: "não",
					error: "Senão = caso contrário / a não ser."
				},
				{ text: "o" },
				{ text: "próprio" },
				{ text: "chefe." }
			]
		},
		{
			id: "hm4",
			intro: "Há / a / à.",
			tokens: [
				{
					text: "A",
					error: "Há dois dias (tempo decorrido)."
				},
				{ text: "dois" },
				{ text: "dias" },
				{ text: "Henrique" },
				{ text: "sumiu." },
				{ text: "Vamos" },
				{ text: "à" },
				{ text: "biblioteca" },
				{ text: "daqui" },
				{ text: "a" },
				{ text: "pouco" },
				{
					text: "mais",
					error: "mas com cautela."
				},
				{ text: "com" },
				{ text: "cautela." }
			]
		}
	],
	enem: [
		{
			id: "he1",
			intro: "Desvios cultos, quase invisíveis.",
			tokens: [
				{
					text: "Haviam",
					error: "Havia (existir) muitas anotações."
				},
				{ text: "muitas" },
				{ text: "anotações" },
				{ text: "a" },
				{
					text: "cerca",
					error: "Acerca de = sobre. Cerca de = aproximadamente."
				},
				{ text: "de" },
				{ text: "concordância." },
				{ text: "Ao" },
				{
					text: "invés",
					error: "Em vez de (substituição)."
				},
				{ text: "de" },
				{ text: "corrigir," },
				{ text: "ele" },
				{ text: "sublinhou." }
			]
		},
		{
			id: "he2",
			intro: "Registro formal do inquérito.",
			tokens: [
				{ text: "Se" },
				{ text: "nós" },
				{
					text: "mantermos",
					error: "Futuro do subjuntivo: se nós mantivermos."
				},
				{ text: "o" },
				{ text: "sigilo," },
				{ text: "o" },
				{ text: "caso" },
				{ text: "anda." },
				{
					text: "Fazem",
					error: "Faz semanas."
				},
				{ text: "semanas" },
				{ text: "que" },
				{ text: "o" },
				{
					text: "cujo",
					error: "cujo o — o artigo é crime: cujo autor."
				},
				{ text: "o" },
				{ text: "autor" },
				{ text: "sumiu." }
			]
		},
		{
			id: "he3",
			intro: "Mais um trecho do quadro da chefia.",
			tokens: [
				{ text: "Preferimos" },
				{ text: "a" },
				{ text: "prova" },
				{
					text: "do",
					error: "Preferir X a Y: à especulação / a especulação sem 'do que'."
				},
				{ text: "que" },
				{ text: "a" },
				{ text: "especulação." },
				{ text: "Isto" },
				{ text: "não" },
				{ text: "tem" },
				{ text: "nada" },
				{
					text: "haver",
					error: "Nada a ver."
				},
				{ text: "com" },
				{ text: "viagem" },
				{ text: "ao" },
				{ text: "exterior." }
			]
		}
	]
};
var VOCAB_BANK = {
	iniciante: [
		{
			id: "v1",
			title: "Relatório plagiado — sala 04",
			slots: [
				{
					before: "O ",
					repeated: "detetive",
					after: " entrou no arquivo.",
					options: [
						"investigador",
						"arquivo",
						"erro",
						"frase"
					],
					answer: "investigador"
				},
				{
					before: "O ",
					repeated: "detetive",
					after: " viu a pasta vermelha.",
					options: [
						"inspetor",
						"pasta",
						"quadro",
						"jornal"
					],
					answer: "inspetor"
				},
				{
					before: "O ",
					repeated: "detetive",
					after: " anotou o horário.",
					options: [
						"agente",
						"horário",
						"carimbo",
						"lupa"
					],
					answer: "agente"
				}
			]
		},
		{
			id: "v2",
			title: "Depoimento copiado",
			slots: [
				{
					before: "A ",
					repeated: "pista",
					after: " estava no chapéu.",
					options: [
						"evidência",
						"chapéu",
						"sala",
						"chefe"
					],
					answer: "evidência"
				},
				{
					before: "A ",
					repeated: "pista",
					after: " cheirava a tinta.",
					options: [
						"indício",
						"tinta",
						"papel",
						"giz"
					],
					answer: "indício"
				},
				{
					before: "A ",
					repeated: "pista",
					after: " apontava a biblioteca.",
					options: [
						"vestígio",
						"livro",
						"ônibus",
						"porta"
					],
					answer: "vestígio"
				}
			]
		},
		{
			id: "v3",
			title: "Ofício repetitivo",
			slots: [
				{
					before: "O ",
					repeated: "caso",
					after: " começou à noite.",
					options: [
						"inquérito",
						"noite",
						"lâmpada",
						"pátio"
					],
					answer: "inquérito"
				},
				{
					before: "O ",
					repeated: "caso",
					after: " ganhou testemunhas.",
					options: [
						"ocorrido",
						"voz",
						"banco",
						"selo"
					],
					answer: "ocorrido"
				},
				{
					before: "O ",
					repeated: "caso",
					after: " segue aberto.",
					options: [
						"processo",
						"janela",
						"carimbo",
						"fita"
					],
					answer: "processo"
				}
			]
		}
	],
	intermediario: [{
		id: "v4",
		title: "Cópia do relatório 18",
		slots: [
			{
				before: "A ",
				repeated: "investigação",
				after: " avançou pouco.",
				options: [
					"apuração",
					"pouco",
					"mesa",
					"selo"
				],
				answer: "apuração"
			},
			{
				before: "A ",
				repeated: "investigação",
				after: " exigiu sigilo.",
				options: [
					"sindicância",
					"sigilo",
					"porta",
					"chave"
				],
				answer: "sindicância"
			},
			{
				before: "A ",
				repeated: "investigação",
				after: " cruzou depoimentos.",
				options: [
					"diligência",
					"cruz",
					"mapa",
					"giz"
				],
				answer: "diligência"
			}
		]
	}, {
		id: "v5",
		title: "Texto sem repertório",
		slots: [
			{
				before: "Henrique ",
				repeated: "saiu",
				after: " da portaria.",
				options: [
					"retirou-se",
					"portaria",
					"cracha",
					"livro"
				],
				answer: "retirou-se"
			},
			{
				before: "Henrique ",
				repeated: "saiu",
				after: " com a pasta.",
				options: [
					"partiu",
					"pasta",
					"vermelho",
					"aba"
				],
				answer: "partiu"
			},
			{
				before: "Henrique ",
				repeated: "saiu",
				after: " rumo à biblioteca.",
				options: [
					"dirigiu-se",
					"rumo",
					"livro",
					"banco"
				],
				answer: "dirigiu-se"
			}
		]
	}],
	enem: [{
		id: "v6",
		title: "Redação plagiada do arquivo",
		slots: [
			{
				before: "O ",
				repeated: "problema",
				after: " não é a viagem.",
				options: [
					"óbice",
					"viagem",
					"ônibus",
					"mapa"
				],
				answer: "óbice"
			},
			{
				before: "O ",
				repeated: "problema",
				after: " está no plágio.",
				options: [
					"entrave",
					"plágio",
					"cola",
					"prova"
				],
				answer: "entrave"
			},
			{
				before: "O ",
				repeated: "problema",
				after: " exige conectivos.",
				options: [
					"questão",
					"vírgula",
					"ponto",
					"linha"
				],
				answer: "questão"
			}
		]
	}, {
		id: "v7",
		title: "Variação lexical — ENEM",
		slots: [
			{
				before: "A ",
				repeated: "ausência",
				after: " de Henrique é o centro.",
				options: [
					"falta",
					"centro",
					"mesa",
					"chefe"
				],
				answer: "falta"
			},
			{
				before: "A ",
				repeated: "ausência",
				after: " gera boatos.",
				options: [
					"desaparecimento",
					"boato",
					"jornal",
					"fake"
				],
				answer: "desaparecimento"
			},
			{
				before: "A ",
				repeated: "ausência",
				after: " pede método.",
				options: [
					"lacuna",
					"método",
					"régua",
					"lupa"
				],
				answer: "lacuna"
			}
		]
	}]
};
var FINAL_BANK = {
	iniciante: [{
		id: "f1",
		template: [
			"Henrique não viajou; ",
			" uma notícia falsa afirmou o contrário. ",
			", o recado quebrava a concordância. ",
			", as pistas levam à biblioteca, ",
			" o relatório plagiado tentava despistar. ",
			", o desaparecido Henrique ainda pode ser encontrado."
		],
		blanks: [
			{
				options: [
					"entretanto",
					"porque",
					"quando"
				],
				answer: "entretanto"
			},
			{
				options: [
					"Além disso",
					"Ou",
					"Nem"
				],
				answer: "Além disso"
			},
			{
				options: [
					"Portanto",
					"Embora",
					"Tipo"
				],
				answer: "Portanto"
			},
			{
				options: [
					"mas",
					"mais",
					"onde"
				],
				answer: "mas"
			},
			{
				options: [
					"Dessa forma",
					"Às vezes",
					"Tipo assim"
				],
				answer: "Dessa forma"
			}
		]
	}, {
		id: "f2",
		template: [
			"O recado tinha erro de concordância; ",
			" era uma pista. A notícia sem fonte era fake; ",
			", o quadro misturava 'a gente' e 'agente'. ",
			" o texto repetia 'detetive'. ",
			", reunimos as provas e seguimos Henrique."
		],
		blanks: [
			{
				options: [
					"ou seja",
					"apesar",
					"nunca"
				],
				answer: "ou seja"
			},
			{
				options: [
					"além disso",
					"em vez",
					"só"
				],
				answer: "além disso"
			},
			{
				options: [
					"Por fim,",
					"Antes,",
					"Nunca,"
				],
				answer: "Por fim,"
			},
			{
				options: [
					"Assim",
					"Embora",
					"Qual"
				],
				answer: "Assim"
			}
		]
	}],
	intermediario: [{
		id: "f3",
		template: [
			"A grafia do recado aponta autoria de Henrique; ",
			", a notícia verdadeira cita a biblioteca. ",
			" o boletim traz crase e homônimos como isca, ",
			" o relatório copiado empobrece o vocabulário. ",
			" a chefia autoriza o certificado a quem articula essas pistas."
		],
		blanks: [
			{
				options: [
					"todavia",
					"portanto",
					"quando"
				],
				answer: "portanto"
			},
			{
				options: [
					"Enquanto",
					"Conquanto",
					"Porquanto"
				],
				answer: "Enquanto"
			},
			{
				options: [
					"ao passo que",
					"a fim de",
					"visto"
				],
				answer: "ao passo que"
			},
			{
				options: [
					"Desse modo,",
					"Mesmo que",
					"Ainda que"
				],
				answer: "Desse modo,"
			}
		]
	}],
	enem: [{
		id: "f4",
		template: [
			"Não se trata de viagem; ",
			" de um despiste linguístico. ",
			" a perícia indica erros deliberados, ",
			" a notícia sem fonte não sustenta o álibi. ",
			", articular conectivos é o último lacre do inquérito."
		],
		blanks: [
			{
				options: [
					"senão",
					"se não",
					"si não"
				],
				answer: "senão"
			},
			{
				options: [
					"Uma vez que",
					"Ainda quando",
					"Conquanto"
				],
				answer: "Uma vez que"
			},
			{
				options: [
					"ao passo que",
					"a fim de que",
					"para que"
				],
				answer: "ao passo que"
			},
			{
				options: [
					"Nessa perspectiva",
					"Em tese aleatória",
					"Tipo"
				],
				answer: "Nessa perspectiva"
			}
		]
	}]
};
function anneBank(level) {
	return ANNE[level];
}
function newsBank(level) {
	return NEWS[level];
}
var payloadSchema = object({
	detectiveName: string().max(80),
	level: _enum([
		"iniciante",
		"intermediario",
		"enem"
	]),
	completedStations: array(_enum([
		"anne",
		"bryan",
		"bedin",
		"gabriel",
		"manuella"
	])),
	clues: record(string(), string()),
	score: number().int().min(0).max(5e3),
	certified: boolean()
});
var getProgress = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("1eb384ef09b83fd6fddaee213edb6af65eac98e36a8e0dbab7f93beede048233"));
var saveProgress = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(payloadSchema).handler(createSsrRpc("a511ba3eeec90c26ed864141218723eded09ed746436ae6ccb6084aacfa6951d"));
var empty = {
	detectiveName: "",
	level: "iniciante",
	completedStations: [],
	clues: {},
	score: 0,
	certified: false
};
var useGame = create()(persist((set, get) => ({
	...empty,
	screen: "title",
	activeStation: null,
	roundSeed: Date.now(),
	setName: (detectiveName) => set({ detectiveName }),
	setLevel: (level) => set({
		level,
		completedStations: [],
		clues: {},
		score: 0,
		certified: false
	}),
	go: (screen) => set({ screen }),
	openStation: (id) => set({
		activeStation: id,
		screen: "station",
		roundSeed: Date.now() + Math.floor(Math.random() * 9999)
	}),
	completeStation: (id, clue, points) => {
		const { completedStations, clues, score } = get();
		if (completedStations.includes(id)) {
			set({
				clues: {
					...clues,
					[id]: clue
				},
				screen: "hq",
				activeStation: null
			});
			return;
		}
		set({
			completedStations: [...completedStations, id],
			clues: {
				...clues,
				[id]: clue
			},
			score: score + points,
			screen: id === "manuella" ? "certificate" : "hq",
			activeStation: null,
			certified: id === "manuella" ? true : get().certified
		});
	},
	certify: () => set({
		certified: true,
		screen: "certificate"
	}),
	hydrate: (p) => set({ ...p }),
	resetCase: () => set({
		completedStations: [],
		clues: {},
		score: 0,
		certified: false,
		screen: "briefing",
		activeStation: null,
		roundSeed: Date.now()
	}),
	snapshot: () => {
		const s = get();
		return {
			detectiveName: s.detectiveName,
			level: s.level,
			completedStations: s.completedStations,
			clues: s.clues,
			score: s.score,
			certified: s.certified
		};
	}
}), {
	name: "dlp-progress-v1",
	partialize: (s) => ({
		detectiveName: s.detectiveName,
		level: s.level,
		completedStations: s.completedStations,
		clues: s.clues,
		score: s.score,
		certified: s.certified
	})
}));
var STATION_ORDER = [
	"anne",
	"bryan",
	"bedin",
	"gabriel",
	"manuella"
];
var LEVELS = [
	{
		id: "iniciante",
		label: "Iniciante",
		blurb: "Erros evidentes. Ideal para treinar o olho."
	},
	{
		id: "intermediario",
		label: "Intermediário",
		blurb: "Regência, crase e interpretação."
	},
	{
		id: "enem",
		label: "ENEM",
		blurb: "Sutilezas de redação nota 1000."
	}
];
function mulberry32(seed) {
	let t = seed >>> 0;
	return function next() {
		t += 1831565813;
		let r = Math.imul(t ^ t >>> 15, 1 | t);
		r ^= r + Math.imul(r ^ r >>> 7, 61 | r);
		return ((r ^ r >>> 14) >>> 0) / 4294967296;
	};
}
function shuffle(list, seed) {
	const rng = mulberry32(seed);
	const copy = [...list];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
}
function pickN(list, n, seed) {
	return shuffle(list, seed).slice(0, Math.min(n, list.length));
}
function StationView(props) {
	const meta = DETECTIVES[props.id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-[0.18em] text-muted",
						children: meta.room
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-ink",
						children: meta.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink-soft",
						children: meta.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: ["Crime: ", meta.crime]
					})
				]
			}),
			props.id === "anne" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnneGame, { ...props }),
			props.id === "bryan" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BryanGame, { ...props }),
			props.id === "bedin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BedinGame, { ...props }),
			props.id === "gabriel" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GabrielGame, { ...props }),
			props.id === "manuella" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManuellaGame, { ...props })
		]
	});
}
function AnneGame({ level, seed, onSolved, onBack }) {
	const n = level === "iniciante" ? 6 : 8;
	const items = (0, import_react.useMemo)(() => pickN(anneBank(level), n, seed), [
		level,
		seed,
		n
	]);
	const [marked, setMarked] = (0, import_react.useState)({});
	const [checked, setChecked] = (0, import_react.useState)(false);
	const allRight = items.length > 0 && items.every((it) => marked[it.id] === it.errorIndex);
	function submit() {
		setChecked(true);
		if (!allRight) return;
		onSolved(STATION_CLUES.anne, 100);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-start gap-2 text-sm text-ink-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mt-0.5 h-4 w-4 shrink-0" }), "Toque a palavra criminosa em cada frase. Prenda com um X vermelho."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-3",
				children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-ink/10 bg-paper-dark/40 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-2 text-[11px] font-semibold tracking-wider text-muted",
							children: ["PISTA ", i + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "flex flex-wrap gap-1.5",
							children: it.tokens.map((tok, idx) => {
								const isMark = marked[it.id] === idx;
								const isError = idx === it.errorIndex;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setMarked((m) => ({
										...m,
										[it.id]: idx
									})),
									className: cn("relative min-h-10 rounded-sm px-2 py-1 text-left text-base text-ink", isMark ? "bg-stamp/10" : "hover:bg-ink/5"),
									children: [
										tok,
										isMark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "pointer-events-none absolute inset-0 grid place-items-center font-display text-2xl text-stamp",
											children: "X"
										}) : null,
										checked && isMark && !isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sr-only",
											children: "marcado errado"
										}) : null
									]
								}, `${it.id}-${idx}`);
							})
						}),
						checked && marked[it.id] === it.errorIndex ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-ok",
							children: [
								"Correção: ",
								it.correction || "apague o excesso",
								". ",
								it.why
							]
						}) : null,
						checked && marked[it.id] !== it.errorIndex ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-stamp",
							children: "Ainda solto. Olhe de novo com a lupa."
						}) : null
					]
				}, it.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
					onClick: submit,
					disabled: items.some((it) => marked[it.id] === void 0),
					children: "Prender erros"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
					onClick: onBack,
					children: "Voltar ao QG"
				})]
			})
		]
	});
}
function BryanGame({ level, seed, onSolved, onBack }) {
	const pair = (0, import_react.useMemo)(() => pickN(newsBank(level), 1, seed)[0], [level, seed]);
	const order = (0, import_react.useMemo)(() => shuffle(["true", "fake"], seed + 3), [seed]);
	const [pick, setPick] = (0, import_react.useState)(null);
	const [checked, setChecked] = (0, import_react.useState)(false);
	if (!pair) return null;
	const cards = {
		true: pair.trueNews,
		fake: pair.fakeNews
	};
	function submit() {
		setChecked(true);
		if (pick !== "fake") return;
		onSolved(STATION_CLUES.bryan, 100);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-start gap-2 text-sm text-ink-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newspaper, { className: "mt-0.5 h-4 w-4 shrink-0" }), "Uma é verdadeira (fonte e argumento). A outra é fake. Carimbe a falsa."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: order.map((key) => {
					const n = cards[key];
					const selected = pick === key;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setPick(key),
						className: cn("relative min-h-44 rounded-lg border bg-paper p-4 text-left shadow-sm", selected ? "border-stamp" : "border-ink/15"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-[10px] tracking-[0.2em] text-muted",
								children: "EDIÇÃO DE PAREDE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-lg leading-snug text-ink",
								children: n.headline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-ink-soft",
								children: n.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xs text-muted",
								children: ["Fonte: ", n.source]
							}),
							selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "stamp-mark pointer-events-none absolute right-3 top-8 px-3 py-1 text-sm",
								children: "FAKE?"
							}) : null
						]
					}, key);
				})
			}),
			checked && pick === "fake" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ok",
				children: "Carimbo certo: falta fonte confiável ou argumento verificável."
			}) : null,
			checked && pick !== "fake" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-stamp",
				children: "Essa tinha fonte. A fake é a que não prova nada."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
					onClick: submit,
					disabled: !pick,
					children: "Carimbar FAKE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
					onClick: onBack,
					children: "Voltar ao QG"
				})]
			})
		]
	});
}
function BedinGame({ level, seed, onSolved, onBack }) {
	const item = (0, import_react.useMemo)(() => pickN(HIDDEN_BANK[level], 1, seed)[0], [level, seed]);
	const [found, setFound] = (0, import_react.useState)([]);
	const [miss, setMiss] = (0, import_react.useState)(false);
	if (!item) return null;
	const errors = item.tokens.map((t, i) => t.error ? i : -1).filter((i) => i >= 0);
	const done = errors.length > 0 && errors.every((i) => found.includes(i));
	function tap(i) {
		if (!item.tokens[i].error) {
			setMiss(true);
			return;
		}
		setMiss(false);
		setFound((f) => f.includes(i) ? f : [...f, i]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-start gap-2 text-sm text-ink-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "mt-0.5 h-4 w-4 shrink-0" }),
					item.intro,
					" Adesivo de Detetive Júnior se prender todos."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-dashed border-paper bg-ink p-4 text-paper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 font-display text-xs tracking-[0.2em] text-tape",
					children: "QUADRO-NEGRO"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "flex flex-wrap gap-1.5 leading-relaxed",
					children: item.tokens.map((tok, i) => {
						const caught = found.includes(i);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => tap(i),
							className: cn("min-h-10 rounded-sm px-1.5 font-display text-lg", caught ? "bg-stamp text-paper line-through" : "hover:bg-paper/10"),
							children: tok.text
						}, `${tok.text}-${i}`);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Presos ",
					found.length,
					" de ",
					errors.length
				]
			}),
			miss ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-stamp",
				children: "Essa palavra é inocente."
			}) : null,
			done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-ok",
				children: [item.tokens.find((t) => t.error)?.error, " Adesivo: Detetive Júnior."]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
					disabled: !done,
					onClick: () => onSolved(STATION_CLUES.bedin, 100),
					children: "Lacrar quadro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
					onClick: onBack,
					children: "Voltar ao QG"
				})]
			})
		]
	});
}
function GabrielGame({ level, seed, onSolved, onBack }) {
	const item = (0, import_react.useMemo)(() => pickN(VOCAB_BANK[level], 1, seed)[0], [level, seed]);
	const [picks, setPicks] = (0, import_react.useState)({});
	if (!item) return null;
	const ok = item.slots.every((s, i) => picks[i] === s.answer);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-start gap-2 text-sm text-ink-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "mt-0.5 h-4 w-4 shrink-0" }), "O texto plagiou a mesma palavra. Troque por sinônimos do fichário."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-folder-edge/40 bg-folder/30 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-[0.18em] text-folder-edge",
					children: item.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-3",
					children: item.slots.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex flex-wrap items-center gap-2 text-base text-ink",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.before }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-sm bg-stamp/15 px-1 font-display line-through",
								children: s.repeated
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: "min-h-11 min-w-40 rounded-md border border-ink/20 bg-paper px-2 text-sm",
								value: picks[i] ?? "",
								onChange: (e) => setPicks((p) => ({
									...p,
									[i]: e.target.value
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "sinônimo…"
								}), s.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: o,
									children: o
								}, o))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.after })
						]
					}, i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
					disabled: !ok,
					onClick: () => onSolved(STATION_CLUES.gabriel, 100),
					children: "Arquivar sinônimos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
					onClick: onBack,
					children: "Voltar ao QG"
				})]
			})
		]
	});
}
function ManuellaGame({ level, seed, clues, onSolved, onBack }) {
	const puzzle = (0, import_react.useMemo)(() => pickN(FINAL_BANK[level], 1, seed)[0], [level, seed]);
	const [picks, setPicks] = (0, import_react.useState)({});
	const [checked, setChecked] = (0, import_react.useState)(false);
	if (!puzzle) return null;
	const ok = puzzle.blanks.every((b, i) => picks[i] === b.answer);
	function submit() {
		setChecked(true);
		if (!ok) return;
		onSolved("Parágrafo lacrado com conectivos. Henrique segue na biblioteca.", 200);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-start gap-2 text-sm text-ink-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stamp, { className: "mt-0.5 h-4 w-4 shrink-0" }), "Junte as pistas e monte um parágrafo com conectivos. Carimbo: APROVADO."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: [
					"anne",
					"bryan",
					"bedin",
					"gabriel"
				].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-md border border-ink/10 bg-paper-dark/40 px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold",
						children: [DETECTIVES[id].name, ": "]
					}), clues[id] ?? STATION_CLUES[id]]
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
				className: "rounded-lg border border-ink/15 bg-paper p-4 text-base leading-relaxed text-ink",
				children: puzzle.template.map((chunk, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [chunk, puzzle.blanks[i] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "mx-1 mb-1 min-h-11 min-w-36 rounded-md border border-ink/20 bg-paper-dark/50 px-2 text-sm",
					value: picks[i] ?? "",
					onChange: (e) => setPicks((p) => ({
						...p,
						[i]: e.target.value
					})),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "conectivo…"
					}), puzzle.blanks[i].options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: o,
						children: o
					}, o))]
				}) : null] }, i))
			}),
			checked && !ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-stamp",
				children: "Ainda sem nota 1000. Troque os conectivos frouxos."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
					onClick: submit,
					children: "Pedir carimbo da chefia"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
					onClick: onBack,
					children: "Voltar ao QG"
				})]
			})
		]
	});
}
var ICONS = {
	anne: Search,
	bryan: Newspaper,
	bedin: PenLine,
	gabriel: BookOpen,
	manuella: Stamp
};
function GameApp() {
	const game = useGame();
	const { user, isPending } = useCurrentUserState();
	const synced = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (isPending || !user || synced.current) return;
		synced.current = true;
		getProgress().then((remote) => {
			if (!remote) {
				saveProgress({ data: useGame.getState().snapshot() });
				return;
			}
			const local = useGame.getState();
			if (remote.completedStations.length >= local.completedStations.length) local.hydrate(remote);
			else saveProgress({ data: local.snapshot() });
		}).catch(() => void 0);
	}, [user, isPending]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		saveProgress({ data: useGame.getState().snapshot() }).catch(() => void 0);
	}, [
		user,
		game.completedStations,
		game.score,
		game.certified,
		game.level,
		game.detectiveName
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "paper-bg min-h-dvh text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrimeTape, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "text-left",
					onClick: () => game.go("title"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg tracking-wide",
						children: "D.L.P."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold tracking-[0.16em] text-muted",
						children: "DELEGACIA DA LÍNGUA"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeChip, { name: game.detectiveName || user?.displayName || "" }), isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 animate-pulse rounded-full bg-ink/10" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "inline-flex min-h-11 items-center rounded-md border border-ink/20 px-3 text-sm font-medium",
						children: "Salvar conta"
					}) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-5xl px-4 pb-16 pt-4",
				children: [
					game.screen === "title" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {}),
					game.screen === "briefing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefing, {}),
					game.screen === "hq" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HQ, {}),
					game.screen === "station" && game.activeStation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StationView, {
						id: game.activeStation,
						level: game.level,
						seed: game.roundSeed,
						clues: game.clues,
						onBack: () => game.go("hq"),
						onSolved: (clue, points) => {
							if (game.activeStation) game.completeStation(game.activeStation, clue, points);
						}
					}),
					game.screen === "certificate" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Certificate, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrimeTape, { label: "NÃO ULTRAPASSE — LÍNGUA PORTUGUESA" })
		]
	});
}
function Title() {
	const game = useGame();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid items-start gap-8 md:grid-cols-[1fr_auto]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.22em] text-stamp",
				children: "INQUÉRITO ABERTO"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl leading-tight sm:text-5xl",
				children: "Delegacia da Língua"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 max-w-xl text-base leading-relaxed text-ink-soft",
				children: [HENRIQUE.name, " desapareceu. Cinco detetives montaram um QG barato: fita zebrada, lupa de papelão, chapéu de jornal. Você entra com crachá. Cada sala é um crime gramatical. O caso final vale certificado Nota 1000."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-6 block text-sm font-medium",
				children: ["Nome no crachá", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: game.detectiveName,
					onChange: (e) => game.setName(e.target.value),
					placeholder: "Seu nome de detetive",
					className: "mt-1 block min-h-11 w-full max-w-sm rounded-md border border-ink/20 bg-paper px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm font-medium",
				children: "Nível da investigação"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 grid gap-2 sm:grid-cols-3",
				children: LEVELS.map((lv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => game.setLevel(lv.id),
					className: cn("min-h-20 rounded-lg border px-3 py-3 text-left", game.level === lv.id ? "border-ink bg-ink text-paper" : "border-ink/15 bg-paper"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display",
						children: lv.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-1 text-xs", game.level === lv.id ? "text-paper/80" : "text-muted"),
						children: lv.blurb
					})]
				}, lv.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
				className: "mt-6",
				onClick: () => game.go("briefing"),
				children: "Assinar o inquérito"
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WantedPoster, {})]
	});
}
function Briefing() {
	const game = useGame();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-[0.2em] text-stamp",
				children: "BRIEFING"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-3xl",
				children: "O desaparecido chama-se Henrique"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 leading-relaxed text-ink-soft",
				children: "Estagiário da D.L.P., visto no arquivo morto às 22h14. Deixou um recado cheio de erros — de propósito. Anne, Bryan, Bedin e Gabriel D. já abriram salas. Manuella só recebe quem trouxer as quatro pistas e montar um parágrafo com conectivos."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "As perguntas mudam a cada entrada na sala. Salve o progresso criando conta (e-mail) ou Google / X."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
					onClick: () => game.go("hq"),
					children: "Entrar no QG"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
					onClick: () => game.go("title"),
					children: "Trocar nível"
				})]
			})
		]
	});
}
function HQ() {
	const game = useGame();
	const four = game.completedStations.filter((s) => s !== "manuella").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: "Quartel-general"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"Pontuação ",
						game.score,
						" · salas ",
						four,
						"/4 · nível ",
						LEVELS.find((l) => l.id === game.level)?.label
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
					onClick: () => game.resetCase(),
					children: "Reabrir o caso"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: STATION_ORDER.map((id) => {
					const meta = DETECTIVES[id];
					const Icon = ICONS[id];
					const done = game.completedStations.includes(id);
					const locked = id === "manuella" && four < 4;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: locked,
						onClick: () => game.openStation(id),
						className: cn("flex min-h-28 items-start gap-3 rounded-xl border p-4 text-left", done ? "border-ok/40 bg-ok/10" : "border-ink/15 bg-paper", locked && "opacity-60"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-11 w-11 shrink-0 place-items-center rounded-md bg-ink text-tape",
							children: locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display text-lg",
								children: meta.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-sm text-ink-soft",
								children: meta.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-xs text-muted",
								children: meta.room
							}),
							done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 inline-block text-xs font-semibold text-ok",
								children: "Pista lacrada"
							}) : null,
							locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 block text-xs",
								children: "Traga as 4 pistas para a chefia."
							}) : null
						] })]
					}, id);
				})
			}),
			game.certified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
				onClick: () => game.go("certificate"),
				children: "Ver certificado"
			}) : null
		]
	});
}
function Certificate() {
	const game = useGame();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "relative overflow-hidden border-2 border-ink py-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderOpen, { className: "mx-auto h-8 w-8 text-folder-edge" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-xs tracking-[0.24em] text-muted",
					children: "D.L.P. · GABINETE DA CHEFE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-4 font-display text-3xl leading-tight",
					children: ["Policial da Língua Portuguesa", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block",
						children: "Nota 1000"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-ink-soft",
					children: [
						"Certifica-se que ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-ink",
							children: game.detectiveName || "Detetive"
						}),
						" ",
						"reconstituiu o paradeiro de Henrique, articulou conectivos e prendeu os erros."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						"Pontuação ",
						game.score,
						" · ",
						LEVELS.find((l) => l.id === game.level)?.label
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "stamp-mark mx-auto mt-8 inline-block px-4 py-2 text-xl",
					children: "Aprovado"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-xs text-muted",
					children: "Manuella · Chefe da Delegacia"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
				onClick: () => game.go("hq"),
				children: "Voltar ao QG"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GhostButton, {
				onClick: () => game.resetCase(),
				children: "Novo inquérito"
			})]
		})]
	});
}
function Home() {
	const [live, setLive] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setLive(true), []);
	if (!live) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "paper-bg min-h-dvh text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-4 py-6 font-display text-lg",
			children: "D.L.P."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameApp, {});
}
//#endregion
export { Home as component };
