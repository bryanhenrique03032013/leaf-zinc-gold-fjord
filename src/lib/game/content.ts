import type { LevelId } from "./types";

export interface ConcordanceItem {
  id: string;
  tokens: string[];
  errorIndex: number;
  correction: string;
  why: string;
}

export interface NewsPair {
  id: string;
  trueNews: { headline: string; body: string; source: string };
  fakeNews: { headline: string; body: string; source: string };
}

export interface HiddenWordItem {
  id: string;
  intro: string;
  tokens: { text: string; error?: string }[];
}

export interface VocabItem {
  id: string;
  title: string;
  slots: { before: string; repeated: string; after: string; options: string[]; answer: string }[];
}

export interface FinalItem {
  id: string;
  blanks: { options: string[]; answer: string }[];
  template: string[];
}

export const HENRIQUE = {
  name: "Henrique",
  role: "estagiário da D.L.P.",
  lastSeen: "Arquivo Morto — 22h14",
  note: "Deixou um recado cheio de pistas gramaticais.",
};

export const DETECTIVES = {
  anne: {
    name: "Anne",
    title: "Detetive da Concordância e Transitividade",
    crime: "Frases com erro de concordância ou regência",
    room: "Sala 01 — Parede de provas",
  },
  bryan: {
    name: "Bryan",
    title: "Detetive do Fake News",
    crime: "Notícia sem fonte nem argumento",
    room: "Sala 02 — Redação do jornal",
  },
  bedin: {
    name: "Bedin",
    title: "Detetive Ortográfico",
    crime: "Palavras erradas escondidas no texto",
    room: "Sala 03 — Quadro-negro",
  },
  gabriel: {
    name: "Gabriel D.",
    title: "Detetive do Plágio",
    crime: "Texto com repetição e vocabulário pobre",
    room: "Sala 04 — Fichário de sinônimos",
  },
  manuella: {
    name: "Manuella",
    title: "Chefe da Delegacia",
    crime: "Redação sem conectivos",
    room: "Gabinete — O caso final",
  },
} as const;

export const STATION_CLUES = {
  anne: "O recado de Henrique quebrava a concordância de propósito.",
  bryan: "A notícia verdadeira aponta a biblioteca; a falsa diz que ele viajou.",
  bedin: "No quadro, ele misturou 'a gente' e 'agente' para despistar.",
  gabriel: "O relatório copiado repetia 'detetive' sem sinônimo.",
} as const;

const ANNE: Record<LevelId, ConcordanceItem[]> = {
  iniciante: [
    { id: "a1", tokens: ["Haviam", "muitas", "pistas", "no", "arquivo", "."], errorIndex: 0, correction: "Havia", why: "Haver no sentido de existir é impessoal: Havia muitas pistas." },
    { id: "a2", tokens: ["Fazem", "dois", "anos", "que", "Henrique", "entrou", "na", "delegacia", "."], errorIndex: 0, correction: "Faz", why: "Fazer indicando tempo é impessoal: Faz dois anos." },
    { id: "a3", tokens: ["A", "gente", "fomos", "até", "o", "arquivo", "morto", "."], errorIndex: 2, correction: "foi", why: "'A gente' pede verbo no singular: A gente foi." },
    { id: "a4", tokens: ["Houveram", "vários", "depoimentos", "falsos", "."], errorIndex: 0, correction: "Houve", why: "Haver = existir: Houve depoimentos." },
    { id: "a5", tokens: ["Os", "detetive", "encontraram", "um", "chapéu", "de", "jornal", "."], errorIndex: 1, correction: "detetives", why: "Concordância nominal: Os detetives." },
    { id: "a6", tokens: ["Eu", "lhe", "vi", "na", "biblioteca", "."], errorIndex: 1, correction: "o", why: "Ver 'ver' é transitivo direto: Eu o vi." },
    { id: "a7", tokens: ["Assisti", "o", "depoimento", "inteiro", "."], errorIndex: 1, correction: "ao", why: "Assistir no sentido de ver pede a: Assisti ao depoimento." },
    { id: "a8", tokens: ["Fazem", "frio", "no", "porão", "da", "delegacia", "."], errorIndex: 0, correction: "Faz", why: "Fazer indicando fenômeno é impessoal: Faz frio." },
    { id: "a9", tokens: ["Sobrou", "poucas", "provas", "depois", "do", "incêndio", "."], errorIndex: 0, correction: "Sobraram", why: "O sujeito é 'poucas provas': Sobraram poucas provas." },
    { id: "a10", tokens: ["Trata-se", "de", "casos", "graves", "e", "exige", "sigilo", "."], errorIndex: 5, correction: "exigem", why: "O sujeito é 'casos graves': exigem sigilo." },
    { id: "a11", tokens: ["Aluga-se", "salas", "para", "inquérito", "."], errorIndex: 0, correction: "Alugam-se", why: "Voz passiva sintética: Alugam-se salas." },
    { id: "a12", tokens: ["Havia", "chegados", "muitos", "visitantes", "."], errorIndex: 1, correction: "chegado", why: "Com ter/haver, particípio invariável: Havia chegado." },
  ],
  intermediario: [
    { id: "b1", tokens: ["Informei", "o", "chefe", "o", "paradeiro", "de", "Henrique", "."], errorIndex: 3, correction: "do", why: "Informar alguém de algo: Informei o chefe do paradeiro." },
    { id: "b2", tokens: ["Os", "fatos", "que", "se", "viu", "não", "fecham", "."], errorIndex: 4, correction: "viram", why: "Concordância com 'fatos': que se viram." },
    { id: "b3", tokens: ["Chegamos", "a", "delegacia", "antes", "do", "amanhecer", "."], errorIndex: 1, correction: "à", why: "Chegar a + a delegacia = à (crase)." },
    { id: "b4", tokens: ["Prefiro", "o", "silêncio", "do", "que", "o", "boato", "."], errorIndex: 3, correction: "ao", why: "Preferir algo a algo: Prefiro o silêncio ao boato." },
    { id: "b5", tokens: ["Obedeci", "o", "protocolo", "da", "chefia", "."], errorIndex: 1, correction: "ao", why: "Obedecer é transitivo indireto: Obedeci ao protocolo." },
    { id: "b6", tokens: ["Fazem", "meses", "que", "o", "caso", "está", "aberto", "."], errorIndex: 0, correction: "Faz", why: "Tempo decorrido: Faz meses." },
    { id: "b7", tokens: ["A", "maioria", "dos", "agentes", "estavam", "no", "pátio", "."], errorIndex: 4, correction: "estava", why: "Com 'a maioria', o verbo pode ir ao núcleo: estava (forma culta preferida)." },
    { id: "b8", tokens: ["Visamos", "o", "cargo", "de", "inspetor", "."], errorIndex: 1, correction: "ao", why: "Visar = almejar pede a: Visamos ao cargo." },
    { id: "b9", tokens: ["Namorar", "com", "a", "verdade", "não", "é", "método", "."], errorIndex: 1, correction: "", why: "Namorar é transitivo direto: Namorar a verdade (sem com)." },
    { id: "b10", tokens: ["Implicou", "no", "desaparecimento", "sem", "prova", "."], errorIndex: 1, correction: "o", why: "Implicar = envolver é TD: Implicou o desaparecimento." },
    { id: "b11", tokens: ["Haviam", "sido", "apagadas", "as", "gravações", "."], errorIndex: 0, correction: "Havia", why: "Haver auxiliar de tempo composto não varia: Havia sido." },
    { id: "b12", tokens: ["Custou", "caro", "aos", "boatos", "se", "espalhar", "."], errorIndex: 0, correction: "Custou-lhes", why: "Custar = ser difícil: Custou aos boatos espalhar-se (verbo no singular)." },
  ],
  enem: [
    { id: "c1", tokens: ["Ao", "invés", "de", "confessar,", "inventou", "um", "álibi", "."], errorIndex: 1, correction: "em vez", why: "'Ao invés de' = ao contrário; aqui cabe 'em vez de' (substituição)." },
    { id: "c2", tokens: ["A", "cerca", "de", "dez", "agentes", "revistaram", "o", "porão", "."], errorIndex: 0, correction: "Cerca", why: "Quantidade aproximada: Cerca de dez (sem o artigo A)." },
    { id: "c3", tokens: ["Cerca", "de", "dez", "agentes", "revistou", "o", "porão", "."], errorIndex: 4, correction: "revistaram", why: "Sujeito no plural: revistaram." },
    { id: "c4", tokens: ["O", "relatório", "cujo", "o", "autor", "sumiu", "está", "incompleto", "."], errorIndex: 3, correction: "", why: "Cujo não admite artigo: cujo autor." },
    { id: "c5", tokens: ["Se", "eu", "ver", "Henrique,", "aviso", "a", "chefe", "."], errorIndex: 2, correction: "vir", why: "Futuro do subjuntivo de ver: se eu vir." },
    { id: "c6", tokens: ["Se", "eu", "manter", "o", "sigilo,", "o", "caso", "avança", "."], errorIndex: 2, correction: "mantiver", why: "Futuro do subjuntivo de manter: se eu mantiver." },
    { id: "c7", tokens: ["Se", "nós", "vermos", "Henrique,", "avisamos", "a", "chefe", "."], errorIndex: 2, correction: "virmos", why: "Futuro do subjuntivo de ver: se nós virmos." },
    { id: "c8", tokens: ["Menas", "pistas", "apareceram", "depois", "da", "chuva", "."], errorIndex: 0, correction: "Menos", why: "Menos é invariável: Menos pistas." },
    { id: "c9", tokens: ["Vou", "ao", "encontro", "a", "Henrique", "amanhã", "."], errorIndex: 3, correction: "de", why: "Ir ao encontro de = favorável/encontrar." },
    { id: "c10", tokens: ["Este", "é", "um", "dos", "casos", "que", "mais", "me", "intrigou", "."], errorIndex: 8, correction: "intrigaram", why: "Que retoma 'casos': intrigaram." },
    { id: "c11", tokens: ["Não", "o", "vi", "a", "ele", "na", "estação", "."], errorIndex: 3, correction: "", why: "Redundância: Não o vi na estação (sem 'a ele')." },
    { id: "c12", tokens: ["Fazem", "quinze", "dias", "que", "Henrique", "sumiu", "."], errorIndex: 0, correction: "Faz", why: "Tempo: Faz quinze dias." },
  ],
};

const NEWS: Record<LevelId, NewsPair[]> = {
  iniciante: [
    {
      id: "n1",
      trueNews: {
        headline: "Estagiário é visto na biblioteca municipal",
        body: "A bibliotecária Lúcia Mendes confirmou que Henrique consultou gramáticas às 21h. O registro de entrada está no livro de visitantes.",
        source: "Boletim interno da D.L.P., 22/09",
      },
      fakeNews: {
        headline: "Henrique embarcou para o exterior",
        body: "Circula que o desaparecido viajou sem avisar. Ninguém mostra passagem, foto ou depoimento.",
        source: "Perfil anônimo em rede social",
      },
    },
    {
      id: "n2",
      trueNews: {
        headline: "Chapéu de jornal encontrado no arquivo morto",
        body: "O perito Carlos Nunes descreveu o objeto no laudo 441. Havia anotações de concordância na aba.",
        source: "Laudo 441 / Setor de Perícias",
      },
      fakeNews: {
        headline: "Delegacia é invadida por alienígenas da língua",
        body: "Fontes não identificadas afirmam que seres vieram corrigir crase. Sem imagem, sem nome, sem hora.",
        source: "Cadeia de mensagens",
      },
    },
    {
      id: "n3",
      trueNews: {
        headline: "Câmera registra Henrique saindo às 22h14",
        body: "A imagem da portaria, autenticada pela segurança, mostra o estagiário com uma pasta vermelha.",
        source: "Portaria / CFTV, 22h14",
      },
      fakeNews: {
        headline: "Chefe Manuella demite toda a equipe",
        body: "Dizem por aí. Não há comunicado oficial nem entrevista.",
        source: "Boato de corredor",
      },
    },
    {
      id: "n4",
      trueNews: {
        headline: "Dicionário de papelão some da sala 04",
        body: "Gabriel D. registrou o furto no livro de ocorrências, com horário e testemunha.",
        source: "Livro de ocorrências, sala 04",
      },
      fakeNews: {
        headline: "Sinônimos foram proibidos no país",
        body: "Um texto viral promete multa para quem usar 'entretanto'. Sem lei, sem órgão, sem data.",
        source: "Site sem editor-chefe",
      },
    },
  ],
  intermediario: [
    {
      id: "n5",
      trueNews: {
        headline: "Análise grafotécnica confirma recado de Henrique",
        body: "O laboratório comparou a letra com os relatórios do estagiário. Conclusão: autoria provável, com erros propositalmente marcados.",
        source: "Lab. Grafotécnico, parecer 18",
      },
      fakeNews: {
        headline: "Especialistas afirmam que Henrique nunca existiu",
        body: "Os tais especialistas não são nomeados. O texto só usa 'muita gente diz'.",
        source: "Blog sem autor",
      },
    },
    {
      id: "n6",
      trueNews: {
        headline: "Ônibus 27 parou na biblioteca após o expediente",
        body: "A empresa de ônibus enviou a listagem de embarque com o cartão funcional de Henrique.",
        source: "Transporte Municipal, ofício 90",
      },
      fakeNews: {
        headline: "Testemunha exclusiva revela sequestro",
        body: "A testemunha 'não pode se identificar'. Não descreve veículo, hora ou rua.",
        source: "Canal de rumores",
      },
    },
    {
      id: "n7",
      trueNews: {
        headline: "Pasta vermelha continha rascunhos de redação",
        body: "Anne catalogou três folhas com conectivos circulados. O material está lacrado.",
        source: "Auto de apreensão 12",
      },
      fakeNews: {
        headline: "Redação nota 1000 é golpe da chefia",
        body: "Afirmação sem dado, sem prova e sem responsável.",
        source: "Comentário em fórum",
      },
    },
  ],
  enem: [
    {
      id: "n8",
      trueNews: {
        headline: "Perícia linguística: erros deliberados no recado",
        body: "O parecer cita frequência de desvios incompatível com o histórico escolar de Henrique e aponta intenção de deixar pistas.",
        source: "Parecer linguístico 03 / D.L.P.",
      },
      fakeNews: {
        headline: "Estudo prova que concordância não importa",
        body: "O 'estudo' não tem universidade, amostra nem data. Só conclusões apelativas.",
        source: "Infográfico sem citação",
      },
    },
    {
      id: "n9",
      trueNews: {
        headline: "Biblioteca registra empréstimo de 'Nova Gramática'",
        body: "O sistema mostra o código do crachá de Henrique e a devolução em aberto.",
        source: "Acervo municipal / terminal 2",
      },
      fakeNews: {
        headline: "Fontes próximas dizem que o caso já foi resolvido",
        body: "Quem são as fontes? O texto não diz. Tampouco apresenta o paradeiro.",
        source: "Manchete sem lide",
      },
    },
    {
      id: "n10",
      trueNews: {
        headline: "Manuella convoca inquérito interno por plágio",
        body: "A portaria 77 detalha o relatório copiado e nomeia Gabriel D. como relator.",
        source: "Portaria 77 da Chefia",
      },
      fakeNews: {
        headline: "Plágio agora é permitido se for 'homenagem'",
        body: "Nenhuma norma é citada. Argumento circular: 'porque eu acho'.",
        source: "Opinião disfarçada de fato",
      },
    },
  ],
};

export const HIDDEN_BANK: Record<LevelId, HiddenWordItem[]> = {
  iniciante: [
    {
      id: "hi1",
      intro: "Toque as palavras escritas no sentido errado.",
      tokens: [
        { text: "Henrique" }, { text: "deixou" }, { text: "um" }, { text: "bilhete:" },
        { text: "\"A" }, { text: "gente" }, { text: "vamos", error: "'A gente' pede verbo no singular: vai — e o crime ortográfico da estação é o par a gente / agente. Aqui 'vamos' denuncia o descuido." },
        { text: "achar" }, { text: "o" }, { text: "agente" }, { text: "mas" },
        { text: "tem" }, { text: "mais", error: "Oposição: mas. 'Mais' indica quantidade." },
        { text: "confusão" }, { text: "do" }, { text: "que" }, { text: "pista.\"" },
      ],
    },
    {
      id: "hi2",
      intro: "Caça às trapaças: onde o sentido quebra.",
      tokens: [
        { text: "O" }, { text: "inspetor" }, { text: "disse" }, { text: "pra", error: "Na escrita formal: para / para a." },
        { text: "nós" }, { text: "que" }, { text: "tinha" }, { text: "menos" },
        { text: "pistas." }, { text: "Na" }, { text: "hora" }, { text: "h" },
        { text: "alguém" }, { text: "escreveu" }, { text: "menas", error: "Menos é invariável." },
        { text: "provas" }, { text: "no" }, { text: "quadro." },
      ],
    },
    {
      id: "hi3",
      intro: "Três desvios no mesmo depoimento.",
      tokens: [
        { text: "Eu" }, { text: "vi" }, { text: "ele", error: "Pronome oblíquo: Eu o vi / vi-o." },
        { text: "sair." }, { text: "A" }, { text: "gente" }, { text: "ficamos", error: "A gente ficou." },
        { text: "na" }, { text: "porta" }, { text: "mais", error: "Adversativo: mas." },
        { text: "ele" }, { text: "já" }, { text: "tinha" }, { text: "ido." },
      ],
    },
    {
      id: "hi4",
      intro: "Ortografia de correio interno.",
      tokens: [
        { text: "Preciso" }, { text: "da" }, { text: "sua" }, { text: "ajuda" },
        { text: "as", error: "Tempo decorrido: há vezes / há dias." },
        { text: "vezes." }, { text: "O" }, { text: "dicionário" }, { text: "está" },
        { text: "atras", error: "Atrás (com acento)." },
        { text: "da" }, { text: "estante." },
      ],
    },
    {
      id: "hi5",
      intro: "Homófonos na parede.",
      tokens: [
        { text: "O" }, { text: "caso" }, { text: "esta", error: "Está (verbo) leva acento." },
        { text: "frio." }, { text: "Isso" }, { text: "não" }, { text: "tem" },
        { text: "nada" }, { text: "haver", error: "Nada a ver (relação)." },
        { text: "com" }, { text: "viagem." },
      ],
    },
  ],
  intermediario: [
    {
      id: "hm1",
      intro: "Crase e homônimos no boletim.",
      tokens: [
        { text: "Fomos" }, { text: "a", error: "Fomos à delegacia (crase: a + a)." },
        { text: "delegacia" }, { text: "as", error: "às 22h." },
        { text: "22h." }, { text: "Henrique" }, { text: "tinha" }, { text: "ido" },
        { text: "a" }, { text: "pé" }, { text: "mais", error: "mas não voltou." },
        { text: "não" }, { text: "voltou." },
      ],
    },
    {
      id: "hm2",
      intro: "Por que / porque / porquê.",
      tokens: [
        { text: "Ninguém" }, { text: "sabe" }, { text: "o" }, { text: "porque", error: "O porquê (substantivo) leva acento." },
        { text: "da" }, { text: "fuga." }, { text: "Porque", error: "Pergunta: Por que Henrique saiu?" },
        { text: "Henrique" }, { text: "saiu?" }, { text: "Vamos" }, { text: "averiguar" },
        { text: "por" }, { text: "quê", error: "Fim de frase: por quê." },
        { text: "amanhã." },
      ],
    },
    {
      id: "hm3",
      intro: "Onde / aonde / mal / mau.",
      tokens: [
        { text: "Aonde", error: "Onde (situação, sem movimento)." },
        { text: "está" }, { text: "o" }, { text: "dicionário?" },
        { text: "O" }, { text: "mau", error: "Mal (advérbio) escrito: o recado foi mal redigido." },
        { text: "redigido" }, { text: "recado" }, { text: "confundiu" }, { text: "a" },
        { text: "equipe" }, { text: "se" }, { text: "não", error: "Senão = caso contrário / a não ser." },
        { text: "o" }, { text: "próprio" }, { text: "chefe." },
      ],
    },
    {
      id: "hm4",
      intro: "Há / a / à.",
      tokens: [
        { text: "A", error: "Há dois dias (tempo decorrido)." },
        { text: "dois" }, { text: "dias" }, { text: "Henrique" }, { text: "sumiu." },
        { text: "Vamos" }, { text: "à" }, { text: "biblioteca" }, { text: "daqui" },
        { text: "a" }, { text: "pouco" }, { text: "mais", error: "mas com cautela." },
        { text: "com" }, { text: "cautela." },
      ],
    },
  ],
  enem: [
    {
      id: "he1",
      intro: "Desvios cultos, quase invisíveis.",
      tokens: [
        { text: "Haviam", error: "Havia (existir) muitas anotações." },
        { text: "muitas" }, { text: "anotações" }, { text: "a" }, { text: "cerca", error: "Acerca de = sobre. Cerca de = aproximadamente." },
        { text: "de" }, { text: "concordância." }, { text: "Ao" }, { text: "invés", error: "Em vez de (substituição)." },
        { text: "de" }, { text: "corrigir," }, { text: "ele" }, { text: "sublinhou." },
      ],
    },
    {
      id: "he2",
      intro: "Registro formal do inquérito.",
      tokens: [
        { text: "Se" }, { text: "nós" }, { text: "mantermos", error: "Futuro do subjuntivo: se nós mantivermos." },
        { text: "o" }, { text: "sigilo," }, { text: "o" }, { text: "caso" },
        { text: "anda." }, { text: "Fazem", error: "Faz semanas." },
        { text: "semanas" }, { text: "que" }, { text: "o" }, { text: "cujo", error: "cujo o — o artigo é crime: cujo autor." },
        { text: "o" }, { text: "autor" }, { text: "sumiu." },
      ],
    },
    {
      id: "he3",
      intro: "Mais um trecho do quadro da chefia.",
      tokens: [
        { text: "Preferimos" }, { text: "a" }, { text: "prova" }, { text: "do", error: "Preferir X a Y: à especulação / a especulação sem 'do que'." },
        { text: "que" }, { text: "a" }, { text: "especulação." }, { text: "Isto" },
        { text: "não" }, { text: "tem" }, { text: "nada" }, { text: "haver", error: "Nada a ver." },
        { text: "com" }, { text: "viagem" }, { text: "ao" }, { text: "exterior." },
      ],
    },
  ],
};

export const VOCAB_BANK: Record<LevelId, VocabItem[]> = {
  iniciante: [
    {
      id: "v1",
      title: "Relatório plagiado — sala 04",
      slots: [
        { before: "O ", repeated: "detetive", after: " entrou no arquivo.", options: ["investigador", "arquivo", "erro", "frase"], answer: "investigador" },
        { before: "O ", repeated: "detetive", after: " viu a pasta vermelha.", options: ["inspetor", "pasta", "quadro", "jornal"], answer: "inspetor" },
        { before: "O ", repeated: "detetive", after: " anotou o horário.", options: ["agente", "horário", "carimbo", "lupa"], answer: "agente" },
      ],
    },
    {
      id: "v2",
      title: "Depoimento copiado",
      slots: [
        { before: "A ", repeated: "pista", after: " estava no chapéu.", options: ["evidência", "chapéu", "sala", "chefe"], answer: "evidência" },
        { before: "A ", repeated: "pista", after: " cheirava a tinta.", options: ["indício", "tinta", "papel", "giz"], answer: "indício" },
        { before: "A ", repeated: "pista", after: " apontava a biblioteca.", options: ["vestígio", "livro", "ônibus", "porta"], answer: "vestígio" },
      ],
    },
    {
      id: "v3",
      title: "Ofício repetitivo",
      slots: [
        { before: "O ", repeated: "caso", after: " começou à noite.", options: ["inquérito", "noite", "lâmpada", "pátio"], answer: "inquérito" },
        { before: "O ", repeated: "caso", after: " ganhou testemunhas.", options: ["ocorrido", "voz", "banco", "selo"], answer: "ocorrido" },
        { before: "O ", repeated: "caso", after: " segue aberto.", options: ["processo", "janela", "carimbo", "fita"], answer: "processo" },
      ],
    },
  ],
  intermediario: [
    {
      id: "v4",
      title: "Cópia do relatório 18",
      slots: [
        { before: "A ", repeated: "investigação", after: " avançou pouco.", options: ["apuração", "pouco", "mesa", "selo"], answer: "apuração" },
        { before: "A ", repeated: "investigação", after: " exigiu sigilo.", options: ["sindicância", "sigilo", "porta", "chave"], answer: "sindicância" },
        { before: "A ", repeated: "investigação", after: " cruzou depoimentos.", options: ["diligência", "cruz", "mapa", "giz"], answer: "diligência" },
      ],
    },
    {
      id: "v5",
      title: "Texto sem repertório",
      slots: [
        { before: "Henrique ", repeated: "saiu", after: " da portaria.", options: ["retirou-se", "portaria", "cracha", "livro"], answer: "retirou-se" },
        { before: "Henrique ", repeated: "saiu", after: " com a pasta.", options: ["partiu", "pasta", "vermelho", "aba"], answer: "partiu" },
        { before: "Henrique ", repeated: "saiu", after: " rumo à biblioteca.", options: ["dirigiu-se", "rumo", "livro", "banco"], answer: "dirigiu-se" },
      ],
    },
  ],
  enem: [
    {
      id: "v6",
      title: "Redação plagiada do arquivo",
      slots: [
        { before: "O ", repeated: "problema", after: " não é a viagem.", options: ["óbice", "viagem", "ônibus", "mapa"], answer: "óbice" },
        { before: "O ", repeated: "problema", after: " está no plágio.", options: ["entrave", "plágio", "cola", "prova"], answer: "entrave" },
        { before: "O ", repeated: "problema", after: " exige conectivos.", options: ["questão", "vírgula", "ponto", "linha"], answer: "questão" },
      ],
    },
    {
      id: "v7",
      title: "Variação lexical — ENEM",
      slots: [
        { before: "A ", repeated: "ausência", after: " de Henrique é o centro.", options: ["falta", "centro", "mesa", "chefe"], answer: "falta" },
        { before: "A ", repeated: "ausência", after: " gera boatos.", options: ["desaparecimento", "boato", "jornal", "fake"], answer: "desaparecimento" },
        { before: "A ", repeated: "ausência", after: " pede método.", options: ["lacuna", "método", "régua", "lupa"], answer: "lacuna" },
      ],
    },
  ],
};

export const FINAL_BANK: Record<LevelId, FinalItem[]> = {
  iniciante: [
    {
      id: "f1",
      template: [
        "Henrique não viajou; ",
        " uma notícia falsa afirmou o contrário. ",
        ", o recado quebrava a concordância. ",
        ", as pistas levam à biblioteca, ",
        " o relatório plagiado tentava despistar. ",
        ", o desaparecido Henrique ainda pode ser encontrado.",
      ],
      blanks: [
        { options: ["entretanto", "porque", "quando"], answer: "entretanto" },
        { options: ["Além disso", "Ou", "Nem"], answer: "Além disso" },
        { options: ["Portanto", "Embora", "Tipo"], answer: "Portanto" },
        { options: ["mas", "mais", "onde"], answer: "mas" },
        { options: ["Dessa forma", "Às vezes", "Tipo assim"], answer: "Dessa forma" },
      ],
    },
    {
      id: "f2",
      template: [
        "O recado tinha erro de concordância; ",
        " era uma pista. A notícia sem fonte era fake; ",
        ", o quadro misturava 'a gente' e 'agente'. ",
        " o texto repetia 'detetive'. ",
        ", reunimos as provas e seguimos Henrique.",
      ],
      blanks: [
        { options: ["ou seja", "apesar", "nunca"], answer: "ou seja" },
        { options: ["além disso", "em vez", "só"], answer: "além disso" },
        { options: ["Por fim,", "Antes,", "Nunca,"], answer: "Por fim," },
        { options: ["Assim", "Embora", "Qual"], answer: "Assim" },
      ],
    },
  ],
  intermediario: [
    {
      id: "f3",
      template: [
        "A grafia do recado aponta autoria de Henrique; ",
        ", a notícia verdadeira cita a biblioteca. ",
        " o boletim traz crase e homônimos como isca, ",
        " o relatório copiado empobrece o vocabulário. ",
        " a chefia autoriza o certificado a quem articula essas pistas.",
      ],
      blanks: [
        { options: ["todavia", "portanto", "quando"], answer: "portanto" },
        { options: ["Enquanto", "Conquanto", "Porquanto"], answer: "Enquanto" },
        { options: ["ao passo que", "a fim de", "visto"], answer: "ao passo que" },
        { options: ["Desse modo,", "Mesmo que", "Ainda que"], answer: "Desse modo," },
      ],
    },
  ],
  enem: [
    {
      id: "f4",
      template: [
        "Não se trata de viagem; ",
        " de um despiste linguístico. ",
        " a perícia indica erros deliberados, ",
        " a notícia sem fonte não sustenta o álibi. ",
        ", articular conectivos é o último lacre do inquérito.",
      ],
      blanks: [
        { options: ["senão", "se não", "si não"], answer: "senão" },
        { options: ["Uma vez que", "Ainda quando", "Conquanto"], answer: "Uma vez que" },
        { options: ["ao passo que", "a fim de que", "para que"], answer: "ao passo que" },
        { options: ["Nessa perspectiva", "Em tese aleatória", "Tipo"], answer: "Nessa perspectiva" },
      ],
    },
  ],
};

export function anneBank(level: LevelId) {
  return ANNE[level];
}
export function newsBank(level: LevelId) {
  return NEWS[level];
}
