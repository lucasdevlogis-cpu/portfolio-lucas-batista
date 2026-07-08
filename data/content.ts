/**
 * Ícones Lucide usados no site — fonte única. Referenciados como string para
 * render dinâmico via `LucideIconByName`. Ao adicionar um ícone aqui, registre-o
 * também em `components/LucideIconByName.tsx`.
 */
export const LUCIDE_ICON_NAMES = [
  "Truck",
  "BarChart3",
  "Clock",
  "FileSpreadsheet",
  "Database",
  "Route",
  "MapPin",
  "AlertTriangle",
  "Package",
  "Warehouse",
  "Network",
  "Waypoints",
  "DollarSign",
  "Radar",
  "ScanSearch",
  "Star",
  "Zap",
  "User",
  "Mail",
  "Building2",
  "MessageSquare",
  "CheckCircle2",
  "ArrowDown",
] as const;

export type LucideIconName = (typeof LUCIDE_ICON_NAMES)[number];

export type CasePrioridade = "P0" | "P1" | "P2";

export type CaseCategoria =
  | "Frete e Custo"
  | "Roteirização e SLA"
  | "Last Mile e E-commerce"
  | "Operação de CD"
  | "Rede e Estratégia"
  | "Método e Governança";

export interface Pessoal {
  nome: string;
  nomeCurto: string;
  titulo: string;
  headline: string;
  subheadline: string;
  email: string;
  linkedin: string;
  github: string;
  localizacao: string;
  tempoResposta: string;
  stackTags: string[];
  empresasResumo: { nome: string; abreviacao?: string }[];
}

export interface Case {
  id: string;
  titulo: string;
  descricao: string;
  categoria: CaseCategoria;
  icone: LucideIconName;
  tags: string[];
  linkDemo: string;
  linkGitHub: string;
  /** Caminho opcional para uma imagem de thumbnail real (ex.: "/cases/frete.png"). */
  thumbnail?: string;
  prioridade: CasePrioridade;
  perguntaNegocio: string;
  metricaPrincipal: string;
  /** Métrica curta para a linha de triagem do card (ex.: "distância e frota otimizadas"). */
  metricaResumo: string;
  decisaoApoiada: string;
  limitacao: string;
}

export interface FooterConteudo {
  copyright: string;
  declaracaoLimitacao: string;
  voltarTopo: string;
  badgeCases: string;
  linksRapidosTitulo: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SecaoCopy {
  title: string;
  subtitle: string;
  eyebrow?: string;
  sugestaoTitulo?: string;
  sugestao?: string;
  avaliacaoTitulo?: string;
  avaliacaoItens?: string[];
}

export interface HeroProva {
  valor: string;
  label: string;
}

export interface HeroConteudo {
  badge: string;
  ctaPrimario: string;
  ctaSecundario: string;
  provas: HeroProva[];
}

export interface CareerTargetConteudo {
  eyebrow: string;
  titulo: string;
  resumo: string;
  senioridade: string;
  disponibilidade: string;
  modeloAtuacao: string;
}

export interface ProofStat {
  valor: string;
  label: string;
  detalhe: string;
}

export interface RecruiterBriefItem {
  titulo: string;
  descricao: string;
  evidencia?: string;
}

export interface RecruiterBriefPergunta {
  pergunta: string;
  resposta: string;
}

export interface RecruiterBriefConteudo {
  eyebrow: string;
  titulo: string;
  resumo: string;
  itens: RecruiterBriefItem[];
  perguntasTitulo: string;
  perguntasResumo: string;
  perguntas: RecruiterBriefPergunta[];
}

export interface ExperienceSignal {
  titulo: string;
  descricao: string;
}

export interface Impacto {
  valor: string;
  label: string;
  descricao: string;
}

export interface Experiencia {
  cargo: string;
  empresa: string;
  periodo: string;
  atribuicoes: string[];
  destaques?: string[];
}

export interface Formacao {
  titulo: string;
  instituicao: string;
  periodo: string;
}

export interface ExperienceSignalsConteudo {
  eyebrow: string;
  titulo: string;
  resumo: string;
  trajetoria: ExperienceSignal[];
  stackTitulo: string;
  stackGrupos: { grupo: string; itens: string[] }[];
  dominiosTitulo: string;
  dominios: string[];
  impactosTitulo: string;
  impactos: Impacto[];
  experienciasTitulo: string;
  experiencias: Experiencia[];
  formacaoTitulo: string;
  formacao: Formacao[];
  certificacoesTitulo: string;
  certificacoes: string[];
  idiomasTitulo: string;
  idiomas: string[];
}

export interface ContactLinksConteudo {
  eyebrow: string;
  titulo: string;
  descricao: string;
  primaryLabel: string;
  linkedinLabel: string;
  emailLabel: string;
  githubLabel: string;
  cvLabel: string;
  cvUrl: string;
  nota: string;
  manifesto: string[];
  faq: { pergunta: string; resposta: string }[];
}

export interface DialogCopy {
  closeLabel: string;
}

export interface MobileNavCopy {
  menuTitle: string;
  openLabel: string;
  closeLabel: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  keywords: string[];
  jobTitle: string;
}

export interface SecoesCopy {
  cases: SecaoCopy;
  casesBiblioteca: SecaoCopy;
  casesRoadmap: SecaoCopy;
  caseDemoLabel: string;
  caseDemoUnavailableLabel: string;
  caseCodeLabel: string;
  demoOpenExternalLabel: string;
  demoFullscreenLabel: string;
  demoLoadInlineLabel: string;
  demoMobileHint: string;
  demoContextLabels: {
    pergunta: string;
    decisao: string;
    metrica: string;
    limitacao: string;
    contextoMobile: string;
  };
  demoIndisponivel: string;
  demoCarregando: string;
  demoErro: string;
}

export interface Content {
  pessoal: Pessoal;
  hero: HeroConteudo;
  careerTarget: CareerTargetConteudo;
  proofStats: ProofStat[];
  recruiterBrief: RecruiterBriefConteudo;
  featuredProofCases: string[];
  experienceSignals: ExperienceSignalsConteudo;
  contactLinks: ContactLinksConteudo;
  secoes: SecoesCopy;
  nav: NavLink[];
  navCta: string;
  cases: Case[];
  footer: FooterConteudo;
  siteMetadata: SiteMetadata;
  dialog: DialogCopy;
  mobileNav: MobileNavCopy;
}

/** URL pública do site — definir em `.env.local` ou na Vercel */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portfolio-lucas-batista-murex.vercel.app";

/** URL base das demos no Streamlit Cloud — definir em `.env.local` */
export const GITHUB_PROFILE_URL = "https://github.com/lucasdevlogis-cpu";
export const GITHUB_DEMOS_URL =
  "https://github.com/lucasdevlogis-cpu/demos-logistica";

export const DEMOS_BASE_URL =
  process.env.NEXT_PUBLIC_DEMOS_BASE_URL?.replace(/\/$/, "") ?? "";

/** Monta URL da page Streamlit (slug sem .py) */
export function demoUrl(pageSlug: string): string {
  if (!DEMOS_BASE_URL || !pageSlug) return "";
  return `${DEMOS_BASE_URL}/${pageSlug}`;
}

/**
 * Mapeamento case id → slug de URL Streamlit (sem prefixo numérico).
 * Arquivo `pages/08_ship_from_store.py` → URL `/ship_from_store`, não `/08_ship_from_store`.
 */
export const CASE_DEMO_SLUGS: Record<string, string> = {
  "01-precificacao-frete": "precificacao_frete",
  "02-torre-controle": "mini_torre_controle",
  "03-promessa-cep": "promessa_cep",
  "04-ship-from-store": "ship_from_store",
  "05-auditoria-endereco": "auditoria_endereco",
  "07-classificador-ocorrencias": "classificador_ocorrencias",
  "08-cvrp-urbano": "cvrp_urbano",
  "09-vrptw-ultima-milha": "vrptw_ultima_milha",
  "10-rede-interhubs": "rede_interhubs",
  "11-tsp-baseline-sp": "tsp_baseline_sp",
};

/** Constantes derivadas da SSOT para evitar redundância e inconsistência. */
export const CASE_COUNT = Object.keys(CASE_DEMO_SLUGS).length;
export const ANOS_EXPERIENCIA = 10;
export const IMPACTO_PRINCIPAL = "+R$ 20M";

export const CONTENT: Content = {
  pessoal: {
    nome: "Lucas Farias Batista",
    nomeCurto: "Lucas Batista",
    titulo: "Analista de Transportes Sênior | Operações, Dados e IA Aplicada",
    headline:
      "Operações logísticas com dados, produto interno, IA aplicada e impacto mensurável",
    subheadline:
      "Mais de 10 anos conectando execução diária a indicadores, automações e decisões. Atua na interseção entre logística, analytics e tecnologia para reduzir custo, melhorar SLA e traduzir operação em resultado financeiro.",
    email: "lucas.farias.log@outlook.com",
    linkedin: "https://linkedin.com/in/lucasfariaslog",
    github: GITHUB_PROFILE_URL,
    localizacao: "São Paulo/SP",
    tempoResposta: "resposta em até 24h (dias úteis)",
    stackTags: ["Python", "SQL", "Power BI", "Streamlit", "IA aplicada"],
    empresasResumo: [
      { nome: "GRUPO SBF", abreviacao: "Centauro e Nike" },
      { nome: "GRUPO NOS", abreviacao: "Shell Select e OXXO" },
      { nome: "VESTE S.A" },
      { nome: "AREZZO&CO" },
    ],
  },

  hero: {
    badge: "Dossiê executivo",
    ctaPrimario: "Ver provas técnicas",
    ctaSecundario: "Contato profissional",
    provas: [
      {
        valor: `+${ANOS_EXPERIENCIA} anos`,
        label: "de operação em transporte, varejo, e-commerce e indústria",
      },
      {
        valor: IMPACTO_PRINCIPAL,
        label: "em working capital liberado e recuperação tributária",
      },
      {
        valor: `${CASE_COUNT} demos`,
        label: "navegáveis em frete, SLA, last mile e IA aplicada",
      },
    ],
  },

  careerTarget: {
    eyebrow: "Direção de carreira",
    titulo: "Perfil híbrido de operação, analytics e produto interno",
    resumo:
      "Atuo na interseção entre logística, dados e IA aplicada. O melhor fit está em posições que precisam conectar problema operacional, análise estruturada, prototipagem e comunicação executiva para diretoria.",
    senioridade:
      "Analista Sênior com +10 anos de operação e portfólio técnico demonstrável",
    disponibilidade:
      "São Paulo/SP — aberto a conversas com headhunters, recrutadores e lideranças de operações e dados",
    modeloAtuacao:
      "Ambientes onde execução, processo, dados e tecnologia precisam conversar de forma pragmática",
  },

  proofStats: [
    {
      valor: "+10",
      label: "anos em operação",
      detalhe:
        "Transporte, varejo, e-commerce, moda e indústria. Base prática para gargalos, exceções e trade-offs.",
    },
    {
      valor: "+R$ 20M",
      label: "impacto financeiro",
      detalhe:
        "Working capital liberado, recuperação tributária e redução de custos de frete mensuráveis.",
    },
    {
      valor: "10",
      label: "demos navegáveis",
      detalhe:
        "Cases em Streamlit com contexto de negócio, métrica, decisão e limitação declarada.",
    },
    {
      valor: "5",
      label: "frentes de atuação",
      detalhe: "Frete, SLA/OTD, last mile, CD e IA supervisionada aplicada à operação.",
    },
  ],

  recruiterBrief: {
    eyebrow: "Perfil em 60 segundos",
    titulo: "O que um headhunter precisa entender rápido",
    resumo:
      "Portfólio reorganizado como dossiê de fit: evidências de julgamento operacional, clareza analítica, capacidade de prototipagem e comunicação com diretoria.",
    itens: [
      {
        titulo: "Operação com resultado",
        descricao:
          "Histórico comprovado de redução de custos, melhoria de SLA e impacto direto em EBITDA e capital de giro.",
        evidencia: "-20% frete cadeia fria · +R$ 20M working capital",
      },
      {
        titulo: "Entrega demonstrável",
        descricao:
          "Transforma hipóteses em dashboards, simuladores e demos navegáveis, com limites e premissas declarados.",
        evidencia: `${CASE_COUNT} cases publicados em Streamlit + Next.js`,
      },
      {
        titulo: "Comunicação executiva",
        descricao:
          "Storytelling de dados para liderança: traduz métricas operacionais em decisão financeira e próxima ação.",
        evidencia: "Apresentações recorrentes à diretoria",
      },
      {
        titulo: "Stack pragmática",
        descricao:
          "Python, SQL, Power BI, Excel avançado, Power Automate, Streamlit, Next.js, TypeScript e IA aplicada.",
        evidencia: "Do BI ao protótipo com IA supervisionada",
      },
    ],
    perguntasTitulo: "Perguntas que este perfil responde",
    perguntasResumo:
      "Leitura rápida para transformar o portfólio em triagem objetiva, sem depender de interpretação genérica de currículo.",
    perguntas: [
      {
        pergunta: "Onde o perfil gera mais valor?",
        resposta:
          "Em ambientes onde operação, processo, dados e tecnologia precisam virar decisão executiva sem perder pragmatismo.",
      },
      {
        pergunta: "Como avaliar profundidade técnica?",
        resposta:
          "Pelos cases navegáveis: cada prova mostra pergunta de negócio, métrica, decisão apoiada e limitação declarada.",
      },
      {
        pergunta: "Que tipo de conversa faz sentido?",
        resposta:
          "Triagem para posições em operações, transportes, inteligência logística, analytics operacional e produto interno.",
      },
    ],
  },

  featuredProofCases: [
    "01-precificacao-frete",
    "02-torre-controle",
    "08-cvrp-urbano",
  ],

  experienceSignals: {
    eyebrow: "Trajetória e stack",
    titulo: "Evolução da carreira até 2026",
    resumo:
      "Perfil que combina chão de fábrica, leitura de dados e prototipagem. Recrutadores conseguem avaliar fit sem depender de uma conversa inicial longa.",
    trajetoria: [
      {
        titulo: `+${ANOS_EXPERIENCIA} anos em operações logísticas`,
        descricao:
          "Transporte, varejo, e-commerce, moda e indústria. Conectando execução diária a indicadores e decisões.",
      },
      {
        titulo: "Transição para inteligência operacional",
        descricao:
          "Dados, automação e produtos internos para reduzir ambiguidade em frete, SLA, roteirização, last mile e visibilidade.",
      },
      {
        titulo: "Portfólio com prova navegável",
        descricao:
          `${CASE_COUNT} cases publicados em Streamlit com contexto de negócio, métrica principal, decisão apoiada e limitação declarada.`,
      },
    ],
    stackTitulo: "Stack por tipo de contribuição",
    stackGrupos: [
      {
        grupo: "Dados & Analytics",
        itens: [
          "Python",
          "SQL Server",
          "BigQuery",
          "Pandas",
          "modelagem analítica",
        ],
      },
      {
        grupo: "BI e decisão",
        itens: [
          "Power BI",
          "DAX",
          "Power Query M",
          "Oracle Analytics",
          "Excel avançado",
          "KPIs",
        ],
      },
      {
        grupo: "Automação & Produto",
        itens: [
          "Power Automate",
          "Streamlit",
          "Next.js",
          "TypeScript",
          "prototipagem",
        ],
      },
      {
        grupo: "IA aplicada",
        itens: [
          "LLMs",
          "prompt engineering",
          "classificação de textos (NLP)",
          "assistentes supervisionados",
          "documentação técnica",
        ],
      },
    ],
    dominiosTitulo: "Domínios de negócio",
    dominios: [
      "Frete e composição de custo",
      "SLA, OTD, OTIF e torre de controle",
      "Last mile e promessa por CEP",
      "Roteirização urbana e dimensionamento de frota",
      "Operação de CD e integração WMS/TMS",
    ],
    impactosTitulo: "Impactos quantificados",
    impactos: [
      {
        valor: "+R$ 20M",
        label: "Capital de giro liberado",
        descricao: "Working capital +2 dias operacionais.",
      },
      {
        valor: "-20%",
        label: "Custo de frete cadeia fria",
        descricao: "~R$ 150 mil mensais economizados.",
      },
      {
        valor: "+R$ 600K",
        label: "Recuperação de tributos",
        descricao: "Identificação e revisão fiscal.",
      },
      {
        valor: "-28%",
        label: "Custo médio de frete",
        descricao: "BID de última milha renegociado.",
      },
      {
        valor: "-50%",
        label: "Mudança de modal",
        descricao: "Aéreo para rodoviário mantendo SLA.",
      },
    ],
    experienciasTitulo: "Experiência profissional",
    experiencias: [
      {
        cargo: "Analista de Transportes Sr — Processos & Dados",
        empresa: "GRUPO SBF (Centauro e Nike)",
        periodo: "Fev/2025 — Atual",
        atribuicoes: [
          "Análise de transporte e roteirização: eficiência de rotas (km/entrega, ocupação, custo por rota).",
          "Monitoramento de SLA, OTD, OTIF e custo por entrega com planos de ação e ajustes de malha.",
          "Dashboards e relatórios executivos com storytelling para liderança, integrando TMS, OMS e ERP.",
          "Interface com Planejamento, Operações, Tecnologia e parceiros logísticos para visão única de performance.",
        ],
      },
      {
        cargo: "Analista de Supply Chain Sr — Performance & Torre de Controle",
        empresa: "GRUPO NOS (Shell Select e OXXO)",
        periodo: "Set/2022 — Jan/2025",
        atribuicoes: [
          "Gestão de KPIs de transporte e CDs (SLA, OTD, OTIF, custo/rota, CAPEX/OPEX).",
          "Implantação de TMS (Performaxxi) e CRM (Zendesk) integrando controle de entrega e atendimento.",
          "Dashboards em Power BI/Oracle Analytics e automações com Power Automate.",
          "Control Tower na identificação de desvios (tempos de espera, recorrência, falhas) e ajuste de cercas geográficas.",
        ],
        destaques: [
          "Redução de 20% no custo de frete cadeia fria (~R$ 150K/mês).",
          "Liberação de +R$ 20M em Working Capital (+2 dias operacionais).",
          "Recuperação de +R$ 600K em tributos.",
        ],
      },
      {
        cargo: "Especialista em Transportes B2C e Omnichannel",
        empresa: "VESTE S.A",
        periodo: "Jun/2022 — Ago/2022",
        atribuicoes: [
          "Estratégias de transporte omnichannel conectando e-commerce, lojas físicas e canais B2B.",
          "Ajuste de regras do Linx OMS reduzindo conflitos de promessas de prazo.",
          "Condução de BID de última milha (Loggi, DHL, Carbono Zero) reduzindo 28% o custo médio de frete.",
          "Implementação de coletas ecológicas (Ship from Store) com economia de custo e prazo.",
        ],
      },
      {
        cargo: "Analista de Logística Omnichannel",
        empresa: "AREZZO&CO (Azzas 2154)",
        periodo: "Fev/2020 — Jun/2022",
        atribuicoes: [
          "Dashboards de transporte e nível de serviço por canal, região e transportadora.",
          "Acompanhamento de KPIs (SLA, OTD, OTIF, lead time) e apresentações para diretoria.",
          "Correção de desvios de prazo com transportadoras, CDs e lojas; apoio à gestão de fretes.",
        ],
      },
      {
        cargo: "Líder de Estoque — BU Schutz",
        empresa: "AREZZO&CO",
        periodo: "Jun/2016 — Fev/2020",
        atribuicoes: [
          "Liderança de equipe de estoque, inventários e rotinas operacionais.",
          "Embaixador no projeto de RFID, aumentando acurácia e rastreabilidade dos produtos.",
        ],
      },
    ],
    formacaoTitulo: "Formação",
    formacao: [
      {
        titulo: "MBA Data Science e Analytics",
        instituicao: "USP/Esalq",
        periodo: "2025-2026 (em andamento)",
      },
      {
        titulo: "MBA Engenharia Logística",
        instituicao: "UNIP",
        periodo: "2019-2020",
      },
      {
        titulo: "Gestão da Cadeia de Suprimentos",
        instituicao: "UNIP",
        periodo: "2017-2018",
      },
    ],
    certificacoesTitulo: "Certificações",
    certificacoes: [
      "Power BI — Modelagem e Dashboards",
      "SQL Server — Intermediário",
      "Gestão e Análise de Dados",
      "Power Automate",
      "Excel Avançado",
      "Gestão de Custos, Lean",
    ],
    idiomasTitulo: "Idiomas",
    idiomas: [
      "Português: Nativo",
      "Inglês: Intermediário",
      "Espanhol: Intermediário",
    ],
  },

  contactLinks: {
    eyebrow: "Contato",
    titulo: "Contato profissional direto",
    descricao:
      "Para oportunidades, triagem de perfil ou conversas com liderança de operações e dados, use LinkedIn ou email direto.",
    primaryLabel: "Conversar no LinkedIn",
    linkedinLabel: "LinkedIn",
    emailLabel: "Email",
    githubLabel: "GitHub",
    cvLabel: "CV em PDF",
    cvUrl: "/lucas-batista-cv.pdf",
    nota: "CV executivo em PDF alinhado ao portfólio. Para detalhes completos de trajetória, use LinkedIn ou os cases demonstráveis.",
    manifesto: [
      "Conecto execução operacional a decisão baseada em dados e protótipos rápidos.",
      "Prefiro entregas mensuráveis a apresentações genéricas: cada case mostra métrica e limitação.",
      "Trabalho bem em ambientes onde operação, tecnologia e financeiro precisam falar a mesma língua.",
    ],
    faq: [
      { pergunta: "Você está aberto a relocation?", resposta: "Base em São Paulo/SP; aberto a conversas presenciais ou híbridas, dependendo do desafio." },
      { pergunta: "Prefere CLT ou PJ?", resposta: "Flexível. O formato depende do escopo, senioridade da posição e modelo da empresa." },
      { pergunta: "Qual o tempo de resposta?", resposta: "Costumo responder em até 24h em dias úteis. LinkedIn é o canal mais rápido." },
    ],
  },

  secoes: {
    cases: {
      eyebrow: "Prova técnica",
      title: "Cases âncora para avaliação profissional",
      subtitle:
        "Três provas navegáveis para avaliar raciocínio operacional, modelagem analítica, comunicação executiva e capacidade de transformar problema em ferramenta.",
    },
    casesBiblioteca: {
      title: "Biblioteca complementar de evidências",
      subtitle:
        "Mais demos por domínio logístico. A biblioteca amplia a leitura de stack, repertório e profundidade técnica.",
    },
    casesRoadmap: {
      title: "Prova em preparação",
      subtitle:
        "Análise ainda sem demo publicada. Mantida como sinal de continuidade do portfólio.",
      sugestaoTitulo: "Próxima evidência sugerida",
      sugestao:
        "Transformar o roadmap de KPIs de CD em uma leitura de causa operacional: ocupação, picking, expedição, backlog e efeito no transporte.",
      avaliacaoTitulo: "Como avaliar quando publicar",
      avaliacaoItens: [
        "Se a demo conecta CD e transporte em uma mesma linha de decisão.",
        "Se a métrica principal evita painel decorativo e aponta gargalo acionável.",
        "Se a limitação deixa claro quais integrações WMS/TMS seriam necessárias em produção.",
      ],
    },
    caseDemoLabel: "Abrir demo e leitura",
    caseDemoUnavailableLabel: "Demo em preparação",
    caseCodeLabel: "Ver repositório",
    demoOpenExternalLabel: "Abrir demo em nova aba",
    demoFullscreenLabel: "Abrir demo em tela cheia",
    demoLoadInlineLabel: "Carregar demo aqui",
    demoMobileHint:
      "A demo interativa pode ficar apertada no celular. Abra em tela cheia ou carregue dentro do modal.",
    demoContextLabels: {
      pergunta: "Pergunta de negócio",
      decisao: "Decisão apoiada",
      metrica: "Métrica principal",
      limitacao: "Limitação declarada",
      contextoMobile: "Contexto da análise",
    },
    demoIndisponivel:
      "Demo interativa em breve. Enquanto isso, use LinkedIn ou email na seção Contato.",
    demoCarregando:
      "Carregando a demo… As demos hospedadas no plano gratuito podem levar até 30 segundos para acordar na primeira visita.",
    demoErro:
      "Não foi possível carregar a demo aqui. Abra em uma nova aba pelo botão acima.",
  },

  nav: [
    { label: "Perfil", href: "#perfil" },
    { label: "Provas", href: "#cases" },
    { label: "Trajetória", href: "#trajetoria" },
    { label: "Contato", href: "#contato" },
  ],
  navCta: "Contato profissional",

  cases: [
    {
      id: "01-precificacao-frete",
      titulo: "Simulador de Custo de Frete",
      descricao:
        "Decomposição de componentes de custo em embarques logísticos. Identifica onde o frete pesa, quais regiões e transportadoras concentram maior custo, e onde há oportunidade de investigação.",
      categoria: "Frete e Custo",
      icone: "DollarSign",
      tags: ["frete", "custo", "precificação", "componentes", "região"],
      linkDemo: "",
      linkGitHub: GITHUB_DEMOS_URL,
      prioridade: "P0",
      perguntaNegocio: "Qual região concentra maior custo por entrega?",
      metricaPrincipal: "Custo por kg, custo por entrega, composição de frete",
      metricaResumo: "custo por kg e por entrega",
      decisaoApoiada:
        "Entender composição e pressão de custo para priorizar negociações",
      limitacao:
        "Dados sintéticos. Para uso real, precisa de base de frete do cliente e tabelas contratuais.",
    },
    {
      id: "02-torre-controle",
      titulo: "Mini Torre de Controle de Entregas",
      descricao:
        "Visão acionável de entregas em andamento: status por transportadora, região e canal, alertas de atraso e ocorrências, priorização de follow-up.",
      categoria: "Roteirização e SLA",
      icone: "Radar",
      tags: ["SLA", "OTD", "atraso", "ocorrência", "torre de controle"],
      linkDemo: "",
      linkGitHub: GITHUB_DEMOS_URL,
      prioridade: "P0",
      perguntaNegocio: "Quais entregas exigem ação imediata?",
      metricaPrincipal:
        "SLA, OTD, tempo de resposta, ocorrências por transportadora",
      metricaResumo: "SLA, OTD e follow-up priorizado",
      decisaoApoiada: "Priorizar entregas críticas e follow-ups",
      limitacao:
        "Não substitui TMS completo. Dados de entrada dependem da integração disponível.",
    },
    {
      id: "03-promessa-cep",
      titulo: "Promessa de Entrega por CEP",
      descricao:
        "Análise territorial de prazo, custo e risco por CEP5, bairro e região. Ajuda a calibrar promessa de entrega e identificar zonas críticas.",
      categoria: "Last Mile e E-commerce",
      icone: "MapPin",
      tags: ["CEP", "last mile", "promessa", "prazo", "risco territorial"],
      linkDemo: "",
      linkGitHub: GITHUB_DEMOS_URL,
      prioridade: "P0",
      perguntaNegocio:
        "Qual CEP ou praça tem maior risco de atraso ou insucesso?",
      metricaPrincipal:
        "Taxa de insucesso, prazo médio por CEP, risco territorial",
      metricaResumo: "risco e prazo por CEP",
      decisaoApoiada: "Ajustar prazo, risco e modalidade por região",
      limitacao:
        "CEP e geocoding são apoio, não verdade absoluta. Precisa validar com dados reais do cliente.",
    },
    {
      id: "04-ship-from-store",
      titulo: "Ship from Store / Origem Ótima",
      descricao:
        "Comparação de origens de atendimento (CD, loja, hub) considerando prazo, custo, estoque e capacidade operacional.",
      categoria: "Last Mile e E-commerce",
      icone: "Package",
      tags: ["ship from store", "omnichannel", "origem", "estoque", "prazo"],
      linkDemo: "",
      linkGitHub: GITHUB_DEMOS_URL,
      prioridade: "P1",
      perguntaNegocio: "Qual origem atende melhor: CD, loja, hub ou parceiro?",
      metricaPrincipal:
        "Custo por origem, prazo por origem, ocupação de estoque",
      metricaResumo: "custo e prazo por origem",
      decisaoApoiada:
        "Escolher origem considerando prazo, custo, estoque e capacidade",
      limitacao:
        "Modelo simplificado. Dados reais de estoque e capacidade são necessários para decisão real.",
    },
    {
      id: "05-auditoria-endereco",
      titulo: "Auditoria de Endereço e Geocoding",
      descricao:
        "Validação de qualidade de endereços para entrega: geocoding, correção de CEP, identificação de endereços de risco, sugestão de revisão.",
      categoria: "Last Mile e E-commerce",
      icone: "ScanSearch",
      tags: ["endereço", "geocoding", "CEP", "qualidade", "risco"],
      linkDemo: "",
      linkGitHub: GITHUB_DEMOS_URL,
      prioridade: "P1",
      perguntaNegocio:
        "Quais endereços precisam de revisão antes da decisão logística?",
      metricaPrincipal:
        "Score de qualidade de endereço, taxa de geocoding bem-sucedido",
      metricaResumo: "score de qualidade de endereço",
      decisaoApoiada: "Bloquear, revisar ou aceitar endereço para análise",
      limitacao:
        "Geocoding depende de APIs externas (OpenStreetMap, Google). Endereços brasileiros têm variação de qualidade.",
    },
    {
      id: "06-kpis-cd",
      titulo: "KPIs de Armazenagem e Expedição",
      descricao:
        "Painel de indicadores de CD: ocupação, picking, expedição, SLA interno, backlog. Conecta armazenagem com transporte e entrega.",
      categoria: "Operação de CD",
      icone: "Warehouse",
      tags: ["CD", "armazenagem", "picking", "expedição", "SLA", "ocupação"],
      linkDemo: "",
      linkGitHub: "",
      prioridade: "P2",
      perguntaNegocio:
        "O atraso de entrega começa no picking, na ocupação ou na expedição?",
      metricaPrincipal:
        "Ocupação, produtividade de picking, tempo de expedição, backlog",
      metricaResumo: "ocupação, picking e expedição",
      decisaoApoiada:
        "Identificar endereços críticos, ocupação e risco de expedição",
      limitacao:
        "Dados sintéticos. Para uso real, precisa de integração com WMS/TMS.",
    },
    {
      id: "07-classificador-ocorrencias",
      titulo: "Classificador de Ocorrências Operacionais",
      descricao:
        "Classificação automática de textos de ocorrências logísticas (atraso, avaria, endereço incorreto, recusa) usando NLP. Transforma mensagens soltas em categorias acionáveis.",
      categoria: "Método e Governança",
      icone: "AlertTriangle",
      tags: ["IA", "NLP", "ocorrências", "classificação", "triagem"],
      linkDemo: "",
      linkGitHub: GITHUB_DEMOS_URL,
      prioridade: "P2",
      perguntaNegocio:
        "Como transformar mensagens, chamados e justificativas em categorias acionáveis?",
      metricaPrincipal:
        "Precisão de classificação, tempo de triagem, categorias mais frequentes",
      metricaResumo: "triagem de ocorrências por NLP",
      decisaoApoiada:
        "Organizar textos soltos em categorias, prioridades e resumos com validação humana",
      limitacao:
        "IA não decide sozinha exceções críticas. Validação humana obrigatória. Modelo treinado com dados sintéticos.",
    },
    {
      id: "08-cvrp-urbano",
      titulo: "Roteirização Urbana (CVRP)",
      descricao:
        "Otimização de rotas urbanas com capacidade de veículo: quantos veículos usar, quais paradas em cada rota e quanta distância economizar frente ao atendimento na ordem de cadastro.",
      categoria: "Roteirização e SLA",
      icone: "Route",
      tags: ["CVRP", "roteirização", "capacidade", "frota", "otimização"],
      linkDemo: "",
      linkGitHub: GITHUB_DEMOS_URL,
      prioridade: "P0",
      perguntaNegocio:
        "Quantos veículos atendem as entregas e quanta distância dá para economizar?",
      metricaPrincipal:
        "Distância total, veículos usados, economia vs ordem de cadastro",
      metricaResumo: "distância e frota otimizadas",
      decisaoApoiada:
        "Dimensionar frota e sequenciar entregas respeitando a capacidade",
      limitacao:
        "Heurística nearest-neighbor com distância em linha reta. Produção usaria PyVRP/OR-Tools sobre malha viária real.",
    },
    {
      id: "09-vrptw-ultima-milha",
      titulo: "Última Milha com Janelas (VRPTW)",
      descricao:
        "Sequenciamento de entregas respeitando janelas de tempo prometidas ao cliente. Compara a ordem de cadastro com um despacho por prazo (earliest-deadline-first) e detecta violações de SLA.",
      categoria: "Roteirização e SLA",
      icone: "Clock",
      tags: ["VRPTW", "janela de tempo", "SLA", "última milha", "sequência"],
      linkDemo: "",
      linkGitHub: GITHUB_DEMOS_URL,
      prioridade: "P1",
      perguntaNegocio:
        "A sequência de entregas respeita as janelas prometidas ao cliente?",
      metricaPrincipal:
        "Violações de SLA, tempo de espera, horário da última entrega",
      metricaResumo: "violações de janela (SLA)",
      decisaoApoiada:
        "Ordenar entregas por prazo para reduzir violações de janela",
      limitacao:
        "Simulação com velocidade média constante. Produção usaria PyVRP com time windows e trânsito real.",
    },
    {
      id: "10-rede-interhubs",
      titulo: "Rede Inter-hubs / Corredores",
      descricao:
        "Análise de custo por tonelada por corredor, mapa da rede e ranking de lanes para priorizar consolidação e negociação entre hubs.",
      categoria: "Rede e Estratégia",
      icone: "Network",
      tags: [
        "rede",
        "corredores",
        "custo por tonelada",
        "consolidação",
        "hubs",
      ],
      linkDemo: "",
      linkGitHub: GITHUB_DEMOS_URL,
      prioridade: "P1",
      perguntaNegocio:
        "Qual corredor tem melhor custo por tonelada e onde priorizar consolidação?",
      metricaPrincipal:
        "Custo por tonelada por lane, volume por corredor, custo total",
      metricaResumo: "custo por tonelada por lane",
      decisaoApoiada:
        "Priorizar consolidação e negociação nas lanes de maior impacto",
      limitacao:
        "Custo paramétrico sobre amostra curada. Produção usaria malha real e pedágio vigente.",
    },
    {
      id: "11-tsp-baseline-sp",
      titulo: "Sequência de Visitas (TSP)",
      descricao:
        "Melhor sequência para visitar pontos a partir de um CD com nearest-neighbor e melhoria local 2-opt, comparando o ganho frente à ordem de cadastro.",
      categoria: "Roteirização e SLA",
      icone: "Waypoints",
      tags: ["TSP", "sequência", "2-opt", "visitas", "otimização"],
      linkDemo: "",
      linkGitHub: GITHUB_DEMOS_URL,
      prioridade: "P1",
      perguntaNegocio:
        "Qual a melhor sequência para visitar os pontos a partir do CD?",
      metricaPrincipal: "Distância da rota, ganho do 2-opt, tempo estimado",
      metricaResumo: "distância e ganho do 2-opt",
      decisaoApoiada:
        "Definir a ordem de visitas que reduz distância e tempo total",
      limitacao:
        "Distância em linha reta e melhoria local. Produção usaria OR-Tools sobre rede viária real (OSMnx/OSRM).",
    },
  ],

  footer: {
    copyright: "© 2026 Lucas Batista. Todos os direitos reservados.",
    declaracaoLimitacao:
      "Portfólio profissional com dados sintéticos, públicos ou anonimizados. As demos demonstram raciocínio, método e capacidade de prototipagem; decisões reais exigem validação com dados, contexto e governança da operação.",
    voltarTopo: "Voltar ao topo",
    badgeCases: `${CASE_COUNT} provas navegáveis`,
    linksRapidosTitulo: "Links rápidos",
  },

  siteMetadata: {
    title: "Lucas Batista | Operações, Dados e Inteligência Logística",
    description:
      "Portfólio profissional para headhunters: operações logísticas, analytics, produto interno, IA aplicada e cases demonstráveis em frete, SLA, last mile e roteirização.",
    keywords: [
      "logística",
      "supply chain",
      "análise de dados",
      "frete",
      "transporte",
      "e-commerce",
      "headhunter",
      "recrutamento executivo",
      "portfólio profissional",
      "inteligência operacional",
      "Brasil",
    ],
    jobTitle: "Analista de Transportes Sênior | Operações, Dados e IA Aplicada",
  },

  dialog: {
    closeLabel: "Fechar",
  },

  mobileNav: {
    menuTitle: "Menu",
    openLabel: "Abrir menu de navegação",
    closeLabel: "Fechar menu",
  },

};

/** Um case é "demonstrável" quando tem uma demo Streamlit publicada. */
export function caseTemDemo(id: string): boolean {
  return id in CASE_DEMO_SLUGS;
}

// Fonte única: `linkDemo` é derivado de CASE_DEMO_SLUGS, nunca declarado à mão.
// Adicionar/remover uma entrada em CASE_DEMO_SLUGS já ativa ou desativa a demo.
for (const c of CONTENT.cases) {
  const slug = CASE_DEMO_SLUGS[c.id];
  c.linkDemo = slug ? demoUrl(slug) : "";
}

/** Cases com demo interativa. */
export const CASES_DEMONSTRAVEIS = CONTENT.cases.filter((c) =>
  caseTemDemo(c.id),
);

/**
 * Três cases principais — abrem a seção Cases com cards ricos.
 * Escolhidos por cobrirem decisões distintas: custo de frete, visibilidade/SLA
 * e roteirização.
 */
export const CASE_DESTAQUE_IDS = CONTENT.featuredProofCases;

export function caseEhDestaque(id: string): boolean {
  return (CASE_DESTAQUE_IDS as readonly string[]).includes(id);
}

/** Cases em destaque (ordem fixa de `CASE_DESTAQUE_IDS`). */
export const CASES_DESTAQUE = CASE_DESTAQUE_IDS.map(
  (id) => CASES_DEMONSTRAVEIS.find((c) => c.id === id)!,
).filter(Boolean);

/** Demais cases demonstráveis — biblioteca secundária filtrável. */
export const CASES_BIBLIOTECA = CASES_DEMONSTRAVEIS.filter(
  (c) => !caseEhDestaque(c.id),
);

/** Cases em desenvolvimento (sem demo) — lista compacta de roadmap. */
export const CASES_ROADMAP = CONTENT.cases.filter((c) => !caseTemDemo(c.id));

/** Impactos financeiros/operacionais quantificados do currículo. */
export const IMPACTOS = CONTENT.experienceSignals.impactos;

/** Categorias únicas para filtro (apenas biblioteca). */
export const CASE_CATEGORIAS = [
  "Todos",
  ...Array.from(new Set(CASES_BIBLIOTECA.map((c) => c.categoria))),
] as const;
