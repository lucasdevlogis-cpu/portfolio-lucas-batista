# ARCHITECTURE.md — Arquitetura Técnica do Portfólio

> **Uso:** Este documento define a arquitetura, stack e infraestrutura. Leia antes de qualquer decisão técnica. Para o QUÊ e PORQUÊ, veja [VISION.md](VISION.md). Para execução no Cursor, veja [.cursorrules](../.cursorrules) e [PROMPTS.md](PROMPTS.md).
>
> **Referência cruzada:** Para conteúdo do site (textos, cases), veja [CONTENT.md](CONTENT.md). Para roteiro de execução, veja [ROADMAP.md](ROADMAP.md).

---

## 1. Stack Definitiva

| Componente | Tecnologia | Justificativa |
|---|---|---|
| **Landing Page** | Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript | SEO excelente, captura de leads, credibilidade profissional |
| **Template Base** | jigar-sable/next-portfolio (fork) ou scaffold limpo | Formulário com backend Firebase, timeline, projetos com tags, deploy one-click |
| **UI Components** | shadcn/ui + Lucide React + Framer Motion | Componentes acessíveis, ícones consistentes, animações sutis |
| **Demos Interativas** | Streamlit no Streamlit Cloud | Embedado via iframe com `?embed=true` — análises Python viram apps navegáveis sem código frontend |
| **APIs de Processamento** | Python serverless na Vercel (FastAPI/Flask) — opcional | Endpoints leves (cálculo de frete, geocoding) — mesmo domínio, sem CORS |
| **Hospedagem Landing** | Vercel (gratuito) | Um projeto só: Next.js na raiz + variáveis de ambiente no dashboard |
| **Hospedagem Demos** | Streamlit Cloud (gratuito) | Apps Python interativos, deploy via GitHub |

**Arquitetura resumida:** Uma landing page Next.js na Vercel apresenta serviços, cases e CTA de contato. Cada case linka para uma demo Streamlit no Streamlit Cloud, embedada via iframe. Se precisar de API Python, usa Vercel Functions na mesma conta. Tudo gratuito, tudo no mesmo domínio.

---

## 2. Decisões Arquiteturais

### 2.1 Por Que Não Só Streamlit?

- O site parece uma ferramenta interna, não uma vitrine comercial.
- SEO ruim, URL estranha (`*.streamlit.app`), interface não transmite credibilidade.
- **Conclusão:** Streamlit é ótimo para demos, péssimo para primeira impressão.

### 2.2 Por Que Não Só Next.js?

- Mostra descrições dos cases, mas o visitante não interage com os dados.
- Para um consultor de "inteligência operacional", a prova está na interatividade.
- **Conclusão:** Next.js sozinho não entrega prova técnica.

### 2.3 A Combinação Vencedora

- **Next.js** cuida da primeira impressão profissional, do SEO e da captura de leads.
- **Streamlit** cuida da prova técnica interativa.
- **Vercel** cuida do hosting gratuito e rápido.
- **Você foca no conteúdo, não na infraestrutura.**

### 2.4 Tailwind CSS v4 — Diferenças Importantes

Tailwind v4 usa configuração CSS-based, não `tailwind.config.ts` como na v3:

- **Import:** `@import "tailwindcss"` em `globals.css`
- **Tema:** bloco `@theme` com variáveis CSS em `globals.css`
- **Cores:** `--color-primary: #1e3a5f` em vez de `theme.extend.colors`
- **Não existe** `tailwind.config.ts` — se o template tiver um, ele é para v3

**Para shadcn/ui com Tailwind v4:**

```bash
npx shadcn@latest init --yes --defaults
# ou interativo: npx shadcn@latest init
npx shadcn@latest add button card dialog sheet badge input textarea
```

---

## 3. Organização de Repositórios

### Repositório 1 — Landing Page (Next.js na Vercel)

```
github.com/SEU-USUARIO/portfolio-lucas-batista
├── .cursorrules              ← Regras para Kimi Code (na raiz!)
├── app/
│   ├── page.tsx               # Delega para HomePage
│   ├── layout.tsx             # Metadata, fontes, viewport
│   └── globals.css            # Tailwind v4 config, tema, scroll-smooth
├── components/
│   ├── HomePage.tsx           # Orquestra seções + Intersection Observer
│   ├── Header.tsx             # Nav fixo, scroll, mobile menu (Sheet)
│   ├── Hero.tsx               # Hero section com animações
│   ├── Dores.tsx              # Grid de 8 dores
│   ├── Servicos.tsx           # Escada de 5 serviços
│   ├── Cases.tsx              # Grid de cases com filtro e modal
│   ├── Metodo.tsx             # 5 passos do processo
│   ├── IASection.tsx          # Seção sobre IA (evita conflito com nome 'IA')
│   ├── Contato.tsx            # Formulário de contato
│   ├── Footer.tsx             # Footer com links e declaração ética
│   ├── SectionHeader.tsx      # Header reutilizável de seções
│   ├── PainPointCard.tsx      # Card de dor
│   ├── ServiceCard.tsx        # Card de serviço
│   ├── CaseCard.tsx           # Card de case
│   └── DemoModal.tsx          # Modal com iframe do Streamlit
├── data/
│   └── content.ts             # Fonte de verdade de TODO o conteúdo
├── lib/
│   └── utils.ts               # cn() e helpers (gerado pelo shadcn)
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── design/
│   └── design.md              # Documento de design (fase 0)
├── docs/                      # Documentação do projeto (este diretório)
├── next.config.ts             # Static export, imagens
├── package.json
└── tsconfig.json
```

**Nota sobre rotas:** No MVP, mantenha tudo em uma única página (`page.tsx`). Rotas separadas como `/cases/precificacao-frete` exigem `generateStaticParams` e complicam o static export. Adicione rotas separadas apenas após o MVP estar no ar.

### Repositório 2 — Demos Streamlit (Streamlit Cloud)

```
github.com/SEU-USUARIO/demos-logistica
├── app.py                    # Entry point
├── requirements.txt          # Dependências
├── data/                     # CSVs sintéticos
│   ├── frete_embarques.csv
│   ├── cvrp_entregas.csv
│   └── ocorrencias.csv
└── pages/
    ├── 01_precificacao_frete.py
    ├── 02_mini_torre_controle.py   # Case P0 landing (torre)
    ├── 03_cvrp_urbano.py           # CVRP demo técnica
    ├── 04_promessa_cep.py          # Case P0 promessa
    └── 07_classificador_ocorrencias.py
```

---

## 4. Templates de Landing Page

### Opção A: jigar-sable/next-portfolio (fork)

| Aspecto | Detalhe |
|---|---|
| Tecnologia | Next.js App Router + Tailwind + TypeScript + Firebase + Framer Motion |
| Destaque | Formulário com backend (Firebase + SendGrid), timeline, projetos com tags |
| Complexidade | Média |
| Link | [github.com/jigar-sable/next-portfolio](https://github.com/jigar-sable/next-portfolio) |

**Por que este:** Foi projetado para freelancers que precisam capturar leads. O formulário com Firebase armazena submissions e dispara e-mails via SendGrid.

**Variáveis de ambiente no Vercel:**

```
SENDGRID_API_KEY=XXXXXXXX
NEXT_PUBLIC_FIREBASE_DATABASE_URL=XXXXXXXXXX
MAIL_FROM=seu@email.com
MAIL_TO=seu@email.com
```

**Cuidado:** Este template pode usar Tailwind v3. Se for v3, você pode migrar para v4 ou manter v3. Na dúvida, mantenha o que o template usa.

### Opção B: Scaffold limpo com shadcn/ui

| Aspecto | Detalhe |
|---|---|
| Tecnologia | Next.js 15 + Tailwind v4 + TypeScript + shadcn/ui |
| Destaque | Controle total, sem dependências de template, shadcn v4 nativo |
| Complexidade | Média-Alta (mais trabalho inicial) |
| Comando | `npx create-next-app@latest` + `npx shadcn@latest init` |

**Quando escolher:** Se você quer controle total sobre cada componente, ou se o template do jigar-sable não funcionar bem com vibecoding. O shadcn v4 é mais moderno e integrado ao Tailwind v4.

**Recomendação:** Comece com o template do jigar-sable (mais rápido). Se encontrar problemas, pivote para scaffold limpo.

---

## 5. Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL (um único projeto)                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Next.js App Router (/)                                  │   │
│  │  ├── / → One-page landing (hero, serviços, cases, etc.) │   │
│  │  │   └── Embeds de demos Streamlit via modal/iframe     │   │
│  │  └── /api/ (opcional) → Python serverless functions    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│  ┌───────────────────────────┼──────────────────────────────┐  │
│  │                           ▼ iframe                        │  │
│  │  ┌────────────────────────────────────────────────────┐ │  │
│  │  │  Streamlit Cloud (separado, gratuito)             │ │  │
│  │  │  ├── Simulador de Frete                            │ │  │
│  │  │  ├── Roteirização Urbana                           │ │  │
│  │  │  ├── Promessa por CEP                              │ │  │
│  │  │  └── Classificador de Ocorrências                  │ │  │
│  │  └────────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Embeding de Streamlit

```tsx
// DemoModal.tsx — usa Dialog do shadcn/ui
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-4xl p-0 overflow-hidden">
    <DialogHeader className="p-4 pb-0">
      <DialogTitle>{titulo}</DialogTitle>
    </DialogHeader>
    <iframe
      src={`${demoUrl}?embed=true`}
      style={{
        width: "100%",
        height: "700px", // 500px em mobile
        border: "none"
      }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    />
  </DialogContent>
</Dialog>
```

**O `?embed=true`** remove toolbar, padding e footer do Streamlit.

**Mobile:** Reduza altura para 500px ou abra em nova aba em vez de modal.

---

## 7. API Python na Vercel (Opcional)

Para endpoints leves de processamento em tempo real:

```python
# api/index.py — pasta /api/ na RAIZ do projeto
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/frete', methods=['POST'])
def calcular_frete():
    dados = request.get_json()
    peso = dados.get('peso', 0)
    regiao = dados.get('regiao', '')
    # sua lógica de cálculo
    return jsonify({"custo_estimado": 150.0, "componentes": [...]})
```

- Adicione `flask` no `requirements.txt` na raiz.
- A Vercel detecta Python na pasta `/api/` e deploya como serverless function.

**Limitações da Vercel:**

- Não roda Streamlit (precisa de processo Python contínuo).
- Não roda aplicações Python com dependências pesadas (>100MB).
- Não suporta servidores persistentes (é serverless).
- Não tem banco de dados embutido (precisa PostgreSQL externo).

---

## 8. Design System

### 8.1 Paleta de Cores (Tailwind v4 CSS vars)

```css
/* app/globals.css */
@theme {
  --color-primary: #1e3a5f;
  --color-accent: #0d9488;
  --color-background: #f8fafc;
  --color-foreground: #0f172a;
  --color-muted: #64748b;
  --color-border: #e2e8f0;
  --color-card: #ffffff;
}
```

| Token | Valor | Uso |
|---|---|---|
| Primary | `#1e3a5f` | Azul escuro — confiança, seriedade. Headings, botões primários. |
| Accent | `#0d9488` | Verde-água — inovação. Badges, destaques, hover. |
| Background | `#f8fafc` | Cinza muito claro. Fundo da página. |
| Card | `#ffffff` | Branco puro. Cards, modais. |
| Text | `#0f172a` | Quase preto. Texto principal. |
| Muted | `#64748b` | Cinza médio. Subtítulos, legendas. |
| Border | `#e2e8f0` | Cinza claro. Bordas de cards. |

### 8.2 Tipografia

- **Headings:** Inter, bold, tracking-tight
- **Body:** Geist Sans (ou Inter), normal
- **Tamanhos:** hero 4xl-6xl, section 3xl, card xl, body base

### 8.3 Espaçamento

- **Seções:** py-20 (padding vertical grande)
- **Cards:** p-6 (padding interno)
- **Grid gap:** gap-6
- **Max-width:** max-w-7xl (container centralizado)

### 8.4 Animações

- **Entrada:** fade-in + slide-y de 20px
- **Duração:** 0.5s
- **Easing:** ease-out
- **Stagger:** 0.1s entre elementos
- **Hover:** scale-[1.02], shadow-md, transition 0.2s

### 8.5 Ícones

- **Biblioteca:** Lucide React
- **Tamanho:** 24px default, 48px para hero icons
- **Cor:** primary ou accent conforme contexto

---

## 9. SEO e Performance

### 9.1 Metadata (layout.tsx)

```tsx
export const metadata = {
  title: "Lucas Batista | Inteligência Operacional para Logística",
  description: "Transformo dados e rotinas logísticas em clareza para decidir melhor. Diagnósticos, análises, automações e protótipos para logística, transporte e e-commerce.",
  keywords: "logística, supply chain, análise de dados, frete, transporte, e-commerce, consultoria, inteligência operacional, Brasil",
  openGraph: {
    title: "Lucas Batista | Inteligência Operacional para Logística",
    description: "...",
    type: "website",
    url: "https://seu-dominio.vercel.app",
    image: "/og-image.png"
  },
  twitter: {
    card: "summary_large_image",
    title: "...",
    description: "...",
    image: "/og-image.png"
  },
  robots: "index, follow"
};
```

### 9.2 Arquivos Estáticos

- `public/robots.txt` — permite indexação
- `public/sitemap.xml` — estático
- `public/og-image.png` — imagem para compartilhamento social
- `public/favicon.ico` — ícone do site

### 9.3 Performance

- Imagens: `next/image` com lazy loading
- Fontes: preload Inter
- CSS: Tailwind v4 purga CSS não utilizado automaticamente
- Animações: `will-change`, não bloquear thread principal
- Meta: `viewport`, `theme-color`

---

## 10. Modelo de Case (GitHub README)

```markdown
# [Nome do Case]

## Pergunta de negócio

## Por que isso importa

## Dados e premissas
(Tipo de dado: sintético, público, proxy, benchmark ou restrito.)

## Como a análise funciona em alto nível

## Métricas principais

## Decisão apoiada

## Resultado demonstrativo

## Limitações

## Como isso viraria um projeto real

## Sobre o autor
[Link para portfólio / LinkedIn / consultoria]
```

---

## 11. Checklist Técnico Pré-Deploy

- [ ] Todos os textos em português do Brasil
- [ ] Não há placeholder text
- [ ] Email e LinkedIn atualizados com dados reais
- [ ] Cases aparecem na seção Cases (6 na home, link para ver todos)
- [ ] Cases P0 têm demos Streamlit funcionando e linkadas
- [ ] Formulário de contato envia dados (ou console.log + mensagem de sucesso)
- [ ] Navegação mobile funciona (menu hamburger via Sheet do shadcn)
- [ ] Scroll suave funciona em todas as seções
- [ ] Imagens têm alt text para acessibilidade
- [ ] Não há erros no console do navegador
- [ ] Lighthouse score > 90 em Performance, Accessibility, Best Practices, SEO
- [ ] Meta tags OG/Twitter configuradas
- [ ] Favicon definido
- [ ] robots.txt permite indexação
- [ ] Site funciona em mobile (teste com DevTools)
- [ ] Demos Streamlit carregam corretamente nos iframes
- [ ] Footer tem declaração de limitação ética dos dados

---

*Documento de arquitetura. Versão revisada. Atualize quando a stack evoluir.*
