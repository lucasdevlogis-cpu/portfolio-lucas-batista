/** Ícones Lucide usados no site — referenciados como string para render dinâmico. */
export type LucideIconName =
  | "Truck"
  | "BarChart3"
  | "Clock"
  | "FileSpreadsheet"
  | "Database"
  | "Route"
  | "MapPin"
  | "AlertTriangle"
  | "Package"
  | "Warehouse";

export type CasePrioridade = "P0" | "P1" | "P2";

export type CaseCategoria =
  | "Frete e Custo"
  | "Roteirização e SLA"
  | "Last Mile e E-commerce"
  | "Operação de CD"
  | "Método e Governança";

export interface Pessoal {
  nome: string;
  titulo: string;
  headline: string;
  subheadline: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface Dor {
  icon: LucideIconName;
  title: string;
}

export interface Servico {
  numero: number;
  titulo: string;
  descricao: string;
  entregas: string[];
  corBorda: string;
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
  prioridade: CasePrioridade;
  perguntaNegocio: string;
  metricaPrincipal: string;
  decisaoApoiada: string;
  limitacao: string;
  /** false = case 07 ou extras fora do grid simétrico da home */
  exibirNaHome: boolean;
}

export interface MetodoPasso {
  numero: number;
  titulo: string;
  descricao: string;
}

export interface IaConteudo {
  titulo: string;
  descricao: string;
  exemplosSeguros: string[];
  naoPrometer: string[];
}

export interface CampoFormulario {
  nome: string;
  tipo: "text" | "email" | "textarea";
  obrigatorio: boolean;
  validacao?: string;
  placeholder?: string;
}

export interface Contato {
  titulo: string;
  descricao: string;
  ctaBotao: string;
  camposFormulario: CampoFormulario[];
}

export interface FooterConteudo {
  copyright: string;
  declaracaoLimitacao: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SecaoCopy {
  title: string;
  subtitle: string;
}

export interface HeroConteudo {
  badge: string;
  ctaPrimario: string;
  ctaSecundario: string;
}

export interface SecoesCopy {
  dores: SecaoCopy;
  servicos: SecaoCopy;
  cases: SecaoCopy;
  metodo: SecaoCopy;
  contatoBeneficio: string;
}

export interface Content {
  pessoal: Pessoal;
  hero: HeroConteudo;
  secoes: SecoesCopy;
  nav: NavLink[];
  navCta: string;
  dores: Dor[];
  servicos: Servico[];
  cases: Case[];
  metodo: MetodoPasso[];
  ia: IaConteudo;
  contato: Contato;
  footer: FooterConteudo;
}

/** URL base das demos no Streamlit Cloud — definir em `.env.local` */
export const DEMOS_BASE_URL =
  process.env.NEXT_PUBLIC_DEMOS_BASE_URL?.replace(/\/$/, "") ?? "";

/** Monta URL da page Streamlit (slug sem .py) */
export function demoUrl(pageSlug: string): string {
  if (!DEMOS_BASE_URL || !pageSlug) return "";
  return `${DEMOS_BASE_URL}/${pageSlug}`;
}

/** Mapeamento case id → slug da page Streamlit */
export const CASE_DEMO_SLUGS: Record<string, string> = {
  "01-precificacao-frete": "01_precificacao_frete",
  "02-torre-controle": "02_mini_torre_controle",
  "03-promessa-cep": "04_promessa_cep",
  "07-classificador-ocorrencias": "07_classificador_ocorrencias",
};

export const CONTENT: Content = {
  pessoal: {
    nome: "Lucas Batista",
    titulo: "Especialista em Inteligência Operacional para Logística",
    headline:
      "Transformo dados e rotinas logísticas em clareza para decidir melhor",
    subheadline:
      "Diagnósticos, análises, automações, painéis e protótipos digitais para operações de transporte, varejo e e-commerce que precisam enxergar custo, prazo, frete, gargalos e performance com mais segurança.",
    email: "[substituir pelo real]",
    linkedin: "[substituir pelo real]",
    github: "[substituir pelo real]",
  },

  hero: {
    badge: "Consultor em Inteligência Logística",
    ctaPrimario: "Quero uma leitura inicial",
    ctaSecundario: "Ver cases demonstráveis",
  },

  secoes: {
    dores: {
      title: "Dores que resolvo",
      subtitle:
        "Problemas comuns em operações logísticas que já encontrei e sei como endereçar",
    },
    servicos: {
      title: "Como posso ajudar",
      subtitle:
        "Escada de contratação: do diagnóstico rápido ao produto com IA",
    },
    cases: {
      title: "Cases demonstráveis",
      subtitle:
        "Biblioteca prática de análises logísticas com dados sintéticos. Cada case responde a uma pergunta real de negócio.",
    },
    metodo: {
      title: "Meu método",
      subtitle: "Processo simples e validado em operações reais",
    },
    contatoBeneficio:
      "Uma leitura inicial ajuda a identificar se faz sentido avançar — sem compromisso de projeto grande.",
  },

  nav: [
    { label: "Dores", href: "#dores" },
    { label: "Serviços", href: "#servicos" },
    { label: "Cases", href: "#cases" },
    { label: "Método", href: "#metodo" },
    { label: "Contato", href: "#contato" },
  ],
  navCta: "Falar sobre minha operação",

  dores: [
    { icon: "Truck", title: "Frete caro sem explicação clara" },
    {
      icon: "BarChart3",
      title: "Indicadores que mudam dependendo da planilha",
    },
    { icon: "Clock", title: "Entregas atrasadas sem causa raiz visível" },
    {
      icon: "FileSpreadsheet",
      title: "Relatórios manuais que consomem horas",
    },
    {
      icon: "Database",
      title: "Dados espalhados entre sistemas, planilhas e mensagens",
    },
    {
      icon: "Route",
      title: "Decisões sobre rota, origem e SLA sem simulação",
    },
    {
      icon: "MapPin",
      title: "Promessa de entrega pouco confiável por CEP/região",
    },
    {
      icon: "AlertTriangle",
      title: "Ocorrências operacionais sem classificação acionável",
    },
  ],

  servicos: [
    {
      numero: 1,
      titulo: "Diagnóstico de Clareza Operacional",
      descricao:
        "Para empresa com dor, mas sem clareza sobre causa e prioridade.",
      entregas: [
        "Checklist de maturidade",
        "Mapa de dores",
        "Matriz impacto x esforço",
        "Recomendação de próximos passos",
      ],
      corBorda: "border-slate-400",
    },
    {
      numero: 2,
      titulo: "Estudo Pontual",
      descricao:
        "Análise estruturada de uma pergunta específica (frete, SLA, região, rota).",
      entregas: [
        "Leitura de dados",
        "Análise com premissas documentadas",
        "Relatório executivo",
        "Limitações declaradas",
      ],
      corBorda: "border-blue-400",
    },
    {
      numero: 3,
      titulo: "Painel, Automação ou Simulador Enxuto",
      descricao: "Mini torre de controle, painel de frete, simulador de custo.",
      entregas: [
        "Ferramenta navegável",
        "Dados sintéticos ou do cliente",
        "Documentação de uso",
        "Treinamento simples",
      ],
      corBorda: "border-teal-400",
    },
    {
      numero: 4,
      titulo: "Acompanhamento Recorrente",
      descricao:
        "Leitura mensal de KPIs, atualização de painel, identificação de desvios.",
      entregas: [
        "Ritual de acompanhamento",
        "Alertas",
        "Revisão semanal/mensal",
        "Evolução do painel",
      ],
      corBorda: "border-amber-400",
    },
    {
      numero: 5,
      titulo: "Produto Interno ou Piloto com IA",
      descricao:
        "Assistente de consulta, triagem de ocorrências, cockpit operacional.",
      entregas: [
        "Protótipo funcional",
        "Validação com usuário",
        "Documentação",
        "Plano de evolução",
      ],
      corBorda: "border-purple-400",
    },
  ],

  cases: [
    {
      id: "01-precificacao-frete",
      titulo: "Simulador de Custo de Frete",
      descricao:
        "Decomposição de componentes de custo em embarques logísticos. Identifica onde o frete pesa, quais regiões e transportadoras concentram maior custo, e onde há oportunidade de investigação.",
      categoria: "Frete e Custo",
      icone: "Truck",
      tags: ["frete", "custo", "precificação", "componentes", "região"],
      linkDemo: demoUrl(CASE_DEMO_SLUGS["01-precificacao-frete"] ?? ""),
      linkGitHub: "",
      prioridade: "P0",
      perguntaNegocio: "Qual região concentra maior custo por entrega?",
      metricaPrincipal: "Custo por kg, custo por entrega, composição de frete",
      decisaoApoiada:
        "Entender composição e pressão de custo para priorizar negociações",
      limitacao:
        "Dados sintéticos. Para uso real, precisa de base de frete do cliente e tabelas contratuais.",
      exibirNaHome: true,
    },
    {
      id: "02-torre-controle",
      titulo: "Mini Torre de Controle de Entregas",
      descricao:
        "Visão acionável de entregas em andamento: status por transportadora, região e canal, alertas de atraso e ocorrências, priorização de follow-up.",
      categoria: "Roteirização e SLA",
      icone: "BarChart3",
      tags: ["SLA", "OTD", "atraso", "ocorrência", "torre de controle"],
      linkDemo: demoUrl(CASE_DEMO_SLUGS["02-torre-controle"] ?? ""),
      linkGitHub: "",
      prioridade: "P0",
      perguntaNegocio: "Quais entregas exigem ação imediata?",
      metricaPrincipal:
        "SLA, OTD, tempo de resposta, ocorrências por transportadora",
      decisaoApoiada: "Priorizar entregas críticas e follow-ups",
      limitacao:
        "Não substitui TMS completo. Dados de entrada dependem da integração disponível.",
      exibirNaHome: true,
    },
    {
      id: "03-promessa-cep",
      titulo: "Promessa de Entrega por CEP",
      descricao:
        "Análise territorial de prazo, custo e risco por CEP5, bairro e região. Ajuda a calibrar promessa de entrega e identificar zonas críticas.",
      categoria: "Last Mile e E-commerce",
      icone: "MapPin",
      tags: ["CEP", "last mile", "promessa", "prazo", "risco territorial"],
      linkDemo: demoUrl(CASE_DEMO_SLUGS["03-promessa-cep"] ?? ""),
      linkGitHub: "",
      prioridade: "P0",
      perguntaNegocio:
        "Qual CEP ou praça tem maior risco de atraso ou insucesso?",
      metricaPrincipal:
        "Taxa de insucesso, prazo médio por CEP, risco territorial",
      decisaoApoiada: "Ajustar prazo, risco e modalidade por região",
      limitacao:
        "CEP e geocoding são apoio, não verdade absoluta. Precisa validar com dados reais do cliente.",
      exibirNaHome: true,
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
      linkGitHub: "",
      prioridade: "P1",
      perguntaNegocio: "Qual origem atende melhor: CD, loja, hub ou parceiro?",
      metricaPrincipal:
        "Custo por origem, prazo por origem, ocupação de estoque",
      decisaoApoiada:
        "Escolher origem considerando prazo, custo, estoque e capacidade",
      limitacao:
        "Modelo simplificado. Dados reais de estoque e capacidade são necessários para decisão real.",
      exibirNaHome: true,
    },
    {
      id: "05-auditoria-endereco",
      titulo: "Auditoria de Endereço e Geocoding",
      descricao:
        "Validação de qualidade de endereços para entrega: geocoding, correção de CEP, identificação de endereços de risco, sugestão de revisão.",
      categoria: "Last Mile e E-commerce",
      icone: "MapPin",
      tags: ["endereço", "geocoding", "CEP", "qualidade", "risco"],
      linkDemo: "",
      linkGitHub: "",
      prioridade: "P1",
      perguntaNegocio:
        "Quais endereços precisam de revisão antes da decisão logística?",
      metricaPrincipal:
        "Score de qualidade de endereço, taxa de geocoding bem-sucedido",
      decisaoApoiada: "Bloquear, revisar ou aceitar endereço para análise",
      limitacao:
        "Geocoding depende de APIs externas (OpenStreetMap, Google). Endereços brasileiros têm variação de qualidade.",
      exibirNaHome: true,
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
      decisaoApoiada:
        "Identificar endereços críticos, ocupação e risco de expedição",
      limitacao:
        "Dados sintéticos. Para uso real, precisa de integração com WMS/TMS.",
      exibirNaHome: true,
    },
    {
      id: "07-classificador-ocorrencias",
      titulo: "Classificador de Ocorrências Operacionais",
      descricao:
        "Classificação automática de textos de ocorrências logísticas (atraso, avaria, endereço incorreto, recusa) usando NLP. Transforma mensagens soltas em categorias acionáveis.",
      categoria: "Método e Governança",
      icone: "AlertTriangle",
      tags: ["IA", "NLP", "ocorrências", "classificação", "triagem"],
      linkDemo: demoUrl(CASE_DEMO_SLUGS["07-classificador-ocorrencias"] ?? ""),
      linkGitHub: "",
      prioridade: "P2",
      perguntaNegocio:
        "Como transformar mensagens, chamados e justificativas em categorias acionáveis?",
      metricaPrincipal:
        "Precisão de classificação, tempo de triagem, categorias mais frequentes",
      decisaoApoiada:
        "Organizar textos soltos em categorias, prioridades e resumos com validação humana",
      limitacao:
        "IA não decide sozinha exceções críticas. Validação humana obrigatória. Modelo treinado com dados sintéticos.",
      exibirNaHome: false,
    },
  ],

  metodo: [
    {
      numero: 1,
      titulo: "Entendo a dor real",
      descricao:
        "Antes de construir qualquer solução, entender qual decisão está travada.",
    },
    {
      numero: 2,
      titulo: "Mapeio dados e processo",
      descricao:
        "Ver onde a informação nasce, como circula, quem usa e onde quebra.",
    },
    {
      numero: 3,
      titulo: "Crio uma primeira entrega útil",
      descricao:
        "Diagnóstico, estudo, painel, automação, simulador ou protótipo.",
    },
    {
      numero: 4,
      titulo: "Valido com a rotina real",
      descricao: "Ajustar linguagem, regra, visual e nível de detalhe.",
    },
    {
      numero: 5,
      titulo: "Documento e evoluo",
      descricao: "Deixar claro o uso, limites, próxima evolução e sustentação.",
    },
  ],

  ia: {
    titulo: "IA como acelerador, não como atalho cego",
    descricao:
      "Uso IA e vibecoding para acelerar análise, automação, documentação e prototipagem. Isso reduz o tempo entre diagnóstico e primeira entrega útil. Mas a decisão continua dependendo de contexto, dados confiáveis, validação humana e entendimento do impacto no negócio.",
    exemplosSeguros: [
      "Resumir chamados",
      "Classificar ocorrências",
      "Gerar documentação inicial",
      "Criar protótipos",
      "Montar rascunhos de relatórios",
      "Apoiar análise exploratória",
      "Transformar regras em assistentes consultivos",
    ],
    naoPrometer: [
      "IA decidindo pagamento de frete sozinha",
      "IA alterando SLA sem validação",
      "IA aprovando exceção crítica",
      "IA substituindo análise operacional",
      "IA como garantia de redução de custo",
    ],
  },

  contato: {
    titulo: "Vamos começar por uma leitura simples da sua operação?",
    descricao:
      "Me conte qual problema mais pesa hoje: frete, atraso, reentrega, relatório manual, indicador inconsistente, promessa de entrega ou falta de visibilidade. A partir disso, eu te mostro o próximo passo mais lógico.",
    ctaBotao: "Solicitar leitura inicial",
    camposFormulario: [
      {
        nome: "nome",
        tipo: "text",
        obrigatorio: true,
        validacao: "required",
        placeholder: "Seu nome",
      },
      {
        nome: "email",
        tipo: "email",
        obrigatorio: true,
        validacao: "required|email",
        placeholder: "seu@email.com",
      },
      {
        nome: "empresa",
        tipo: "text",
        obrigatorio: false,
        placeholder: "Nome da empresa (opcional)",
      },
      {
        nome: "desafio",
        tipo: "textarea",
        obrigatorio: false,
        placeholder: "Principal dor ou desafio logístico (opcional)",
      },
    ],
  },

  footer: {
    copyright: "© 2026 Lucas Batista. Todos os direitos reservados.",
    declaracaoLimitacao:
      "Trabalho com dados públicos, sintéticos, anonimizados ou fornecidos pelo cliente com finalidade definida. Dados sensíveis, bases restritas, credenciais e informações pessoais são tratados com cuidado, acesso controlado e validação de uso.",
  },
};

/** Cases exibidos na home (grid 3×2 simétrico). */
export const CASES_HOME = CONTENT.cases.filter((c) => c.exibirNaHome);

/** Categorias únicas para filtro na seção Cases. */
export const CASE_CATEGORIAS = [
  "Todos",
  ...Array.from(new Set(CONTENT.cases.map((c) => c.categoria))),
] as const;
