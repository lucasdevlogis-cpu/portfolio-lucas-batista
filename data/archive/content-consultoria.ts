import type { LucideIconName, SecaoCopy } from "@/data/content";

export interface Dor {
  icon: LucideIconName;
  title: string;
}

export interface Servico {
  numero: number;
  titulo: string;
  paraQuem: string;
  quandoContratar: string;
  entregas: string[];
  exemplo: string;
  corBorda: string;
  /** Nível recomendado como porta de entrada — recebe destaque visual na escada. */
  recomendado?: boolean;
}

export interface MetodoPasso {
  numero: number;
  titulo: string;
  descricao: string;
}

export interface IaConteudo {
  eyebrow: string;
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

export interface ContatoForm {
  titulo: string;
  descricao: string;
  ctaBotao: string;
  microcopy: string;
  camposFormulario: CampoFormulario[];
  tituloSucesso: string;
  mensagemSucesso: string;
  mensagemErro: string;
  enviandoLabel: string;
}

export interface SobreConteudo {
  titulo: string;
  paragrafos: string[];
  miniTimeline: { icon: LucideIconName; texto: string }[];
  ferramentasTitulo: string;
  /** Ferramentas agrupadas por área — leitura escaneável para triagem técnica. */
  ferramentasGrupos: { grupo: string; itens: string[] }[];
  /** Modelo de engajamento e disponibilidade — sinal rápido para recrutadores. */
  disponibilidade: string;
}

export interface ConsultoriaSecoesCopy {
  dores: SecaoCopy;
  servicos: SecaoCopy;
  metodo: SecaoCopy;
  contatoBeneficio: string;
}

export interface ContentConsultoria {
  secoes: ConsultoriaSecoesCopy;
  dores: Dor[];
  servicos: Servico[];
  metodo: MetodoPasso[];
  ia: IaConteudo;
  sobre: SobreConteudo;
  contato: ContatoForm;
}

export const CONTENT_CONSULTORIA: ContentConsultoria = {
  secoes: {
    dores: {
      eyebrow: "O problema",
      title: "Dores que resolvo",
      subtitle:
        "Problemas comuns em operações logísticas que já encontrei e sei como endereçar.",
    },
    servicos: {
      eyebrow: "Como trabalho",
      title: "Como posso ajudar",
      subtitle:
        "Do diagnóstico rápido ao piloto com IA. Escolha o nível de contratação que faz sentido para o seu momento.",
    },
    metodo: {
      eyebrow: "Como conduzo",
      title: "Meu método",
      subtitle: "Processo simples e validado em operações reais.",
    },
    contatoBeneficio:
      "Uma leitura inicial ajuda a identificar se faz sentido avançar — sem compromisso de projeto grande.",
  },

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
      paraQuem:
        "Operações com dor difusa, sem clareza sobre onde está o maior problema.",
      quandoContratar:
        "Quando algo custa caro ou atrasa, mas você não sabe por onde começar.",
      entregas: [
        "Mapa de dores da operação",
        "Matriz impacto × esforço",
        "Recomendação de próximos passos priorizada",
      ],
      exemplo:
        "Um transporte que sabe que o frete está alto, mas não sabe qual região ou transportadora puxa o custo.",
      corBorda: "border-slate-400",
    },
    {
      numero: 2,
      titulo: "Estudo Pontual",
      paraQuem:
        "Quem tem uma pergunta específica e precisa de resposta com método.",
      quandoContratar:
        "Quando há uma decisão concreta esperando um número confiável.",
      entregas: [
        "Leitura dos dados disponíveis",
        "Análise com premissas documentadas",
        "Relatório executivo com limitações declaradas",
      ],
      exemplo:
        "Avaliar se vale abrir um hub em determinada região antes de investir.",
      corBorda: "border-blue-400",
    },
    {
      numero: 3,
      titulo: "Painel, Automação ou Simulador Enxuto",
      paraQuem:
        "Times que repetem relatórios manuais ou decidem sem conseguir simular cenários.",
      quandoContratar:
        "Quando a informação existe, mas está espalhada e chega tarde.",
      entregas: [
        "Ferramenta navegável (painel, automação ou simulador)",
        "Dados do cliente ou sintéticos",
        "Documentação de uso e treinamento simples",
      ],
      exemplo:
        "Uma mini torre de controle que mostra as entregas críticas do dia em uma só tela.",
      corBorda: "border-teal-400",
      recomendado: true,
    },
    {
      numero: 4,
      titulo: "Acompanhamento Recorrente",
      paraQuem:
        "Operações que já têm indicadores, mas não têm ritmo de leitura.",
      quandoContratar:
        "Quando você quer acompanhar KPIs e desvios sem montar um time interno.",
      entregas: [
        "Ritual de acompanhamento periódico",
        "Alertas de desvio",
        "Evolução contínua do painel",
      ],
      exemplo:
        "Leitura mensal de SLA e frete com destaque para o que saiu da curva.",
      corBorda: "border-amber-400",
    },
    {
      numero: 5,
      titulo: "Produto Interno ou Piloto com IA",
      paraQuem:
        "Quem quer testar uma ideia de produto ou automação antes de escalar.",
      quandoContratar:
        "Quando há um processo repetitivo que pede um protótipo real para validar.",
      entregas: [
        "Protótipo funcional",
        "Validação com usuário real",
        "Documentação e plano de evolução",
      ],
      exemplo:
        "Um triador de ocorrências que organiza chamados por tipo, sempre com validação humana.",
      corBorda: "border-purple-400",
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
    eyebrow: "Uso responsável de IA",
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

  sobre: {
    titulo: "Quem está por trás",
    paragrafos: [
      "Sou o Lucas, especialista autônomo em inteligência operacional para logística, transporte, varejo e e-commerce. Trabalho na fronteira entre operação, dados e tecnologia.",
      "Meu foco é entregar a menor peça útil primeiro: algo que já ajuda a decidir melhor, sempre com premissas e limitações declaradas.",
    ],
    miniTimeline: [
      { icon: "Clock", texto: "+10 anos em operações logísticas" },
      {
        icon: "BarChart3",
        texto: "4 setores: transporte, varejo, e-commerce, indústria",
      },
      {
        icon: "FileSpreadsheet",
        texto:
          "10 cases demonstráveis com dados sintéticos inspirados em problemas reais",
      },
    ],
    ferramentasTitulo: "Ferramentas que uso",
    ferramentasGrupos: [
      { grupo: "Dados", itens: ["Python", "SQL", "Pandas"] },
      { grupo: "Análise e BI", itens: ["Power BI", "Excel avançado"] },
      { grupo: "Apps e produto", itens: ["Streamlit", "Next.js"] },
      { grupo: "IA aplicada", itens: ["IA / LLMs"] },
    ],
    disponibilidade:
      "Consultoria autônoma · aberto a conversas de projeto e colaboração",
  },

  contato: {
    titulo: "Contato profissional direto",
    descricao:
      "Para conversas sobre posições, entrevistas ou avaliação de fit profissional, prefira LinkedIn ou email. O retorno traz contexto, disponibilidade e próximos passos.",
    ctaBotao: "Enviar contato profissional",
    microcopy:
      "Resposta em até 1 dia útil quando houver alinhamento com posições, projetos ou entrevistas.",
    tituloSucesso: "Contato recebido.",
    mensagemSucesso:
      "Obrigado pelo contato. Retorno em breve com contexto profissional e próximos passos.",
    mensagemErro:
      "Não foi possível enviar agora. Tente o email direto abaixo ou tente novamente.",
    enviandoLabel: "Enviando…",
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
};
