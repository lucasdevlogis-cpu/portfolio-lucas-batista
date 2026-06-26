# CHECKLIST.md — Checklist de Qualidade e Pré-Deploy

> **Uso:** Use este checklist antes de cada deploy, a cada fase concluída, e como ferramenta de revisão de qualidade. Marque cada item com [x] quando concluído. Não deploye com itens críticos pendentes.
>
> **Referência cruzada:** Para visão estratégica, veja [VISION.md](VISION.md). Para arquitetura técnica, veja [ARCHITECTURE.md](ARCHITECTURE.md). Para roteiro, veja [ROADMAP.md](ROADMAP.md).

---

## Checklist de Conteúdo (O que o visitante vê)

### Textos e Copy

- [ ] Todos os textos em português do Brasil (sem mistura de inglês inadvertida)
- [ ] Não há placeholder text ("Lorem ipsum", "exemplo.com", "Seu nome aqui", "[substituir]")
- [ ] Email e LinkedIn atualizados com dados reais
- [ ] Headline e subheadline reforçam a tese central (VISION.md seção 1)
- [ ] Cada seção tem um propósito claro e reforça o posicionamento
- [ ] Nenhuma seção contradiz a política de limitação ética

### Cases

- [ ] Cases aparecem na seção Cases (6 na home para grid simétrico, ou 7 com grid flexível)
- [ ] Cada case tem: título, descrição, categoria, tags, ícone
- [ ] Cases P0 (01, 02, 03) têm demos Streamlit funcionando e linkadas
- [ ] Cada case tem pergunta de negócio clara (VISION.md seção 6)
- [ ] Cada case tem limitação declarada
- [ ] Nenhum case é apresentado como resultado real de cliente quando é demonstrativo

### Ofertas e Serviços

- [ ] 5 níveis de serviço estão claros e em ordem lógica
- [ ] Cada nível tem: título, descrição, entregas, limite
- [ ] Escada de contratação é intuitiva (do mais simples ao mais complexo)
- [ ] CTA "Solicitar leitura inicial" está presente e funcional

### Política de Dados

- [ ] Footer contém declaração de limitação ética dos dados
- [ ] Cases com dados sintéticos têm aviso explícito
- [ ] Não há promessa de "IA garante redução de custo" ou "IA decide sozinha"

---

## Checklist de Funcionalidade (O que o visitante faz)

### Navegação

- [ ] Scroll suave funciona em todas as seções (click no header → scroll para seção)
- [ ] Menu mobile funciona (hamburger abre/fecha, links clicáveis, fecha ao clicar em link)
- [ ] Estado ativo no menu destaca a seção visível na viewport
- [ ] Botões CTA levam para o destino correto (contato, cases, etc.)

### Formulário de Contato

- [ ] Formulário renderiza corretamente em desktop e mobile
- [ ] Validação frontend funciona (nome e email obrigatórios, email válido)
- [ ] Submit envia dados para destino configurado (Firebase, Formspree, ou console.log)
- [ ] Mensagem de sucesso aparece após submit
- [ ] Dados de teste chegam ao destino (envie um contato de teste)

### Demos Streamlit

- [ ] Iframes carregam corretamente na landing page
- [ ] Parâmetro `?embed=true` está presente na URL
- [ ] Iframe tem altura suficiente (700px desktop / 500px mobile) e não corta conteúdo
- [ ] Demos P0 funcionam independentemente no Streamlit Cloud
- [ ] Fluxo completo testado: landing → clica em case → abre modal → demo carrega → fecha modal → formulário de contato

### Links

- [ ] Todos os links internos funcionam (navegação, âncoras)
- [ ] Links externos (LinkedIn, GitHub) abrem em nova aba
- [ ] Links para demos Streamlit estão corretos
- [ ] Links para repositórios GitHub estão corretos

---

## Checklist de Design e UX (Como o visitante se sente)

### Visual

- [ ] Paleta de cores segue o design system (ARCHITECTURE.md seção 8)
- [ ] Tipografia consistente (Inter para headings, Geist Sans para body)
- [ ] Espaçamento consistente (seções py-20, cards p-6, gap-6)
- [ ] Ícones são todos do Lucide React (nunca imagens genéricas de stock)
- [ ] Cards têm hover com scale leve e sombra
- [ ] Animações são sutis (não distraem do conteúdo)
- [ ] Não há CLS (layout shift) ao carregar fontes ou imagens

### Responsividade

- [ ] Site funciona em mobile (teste com DevTools: iPhone SE, iPhone 12, Android)
- [ ] Site funciona em tablet (iPad, iPad Mini)
- [ ] Site funciona em desktop (1920x1080, 1366x768)
- [ ] Grid de cases: 3 colunas (desktop), 2 (tablet), 1 (mobile)
- [ ] Grid de dores: 4 colunas (desktop), 2 (tablet), 1 (mobile)
- [ ] Menu mobile: hamburger em telas < 768px (Sheet do shadcn)
- [ ] Hero: botões empilham verticalmente em mobile
- [ ] Iframes de demo: altura ajustada para não quebrar em mobile
- [ ] Texto não corta em nenhum breakpoint

### Performance

- [ ] Imagens usam `next/image` com lazy loading
- [ ] Fontes são preloaded (Inter)
- [ ] CSS não bloqueia renderização (Tailwind v4 purga automaticamente)
- [ ] Animações usam `will-change` e não bloqueiam thread principal
- [ ] Lighthouse Performance > 90

---

## Checklist Técnico (O que está por baixo)

### SEO

- [ ] Title tag presente e descritivo: "Lucas Batista | Inteligência Operacional para Logística"
- [ ] Meta description presente e atrativa
- [ ] Keywords relevantes: logística, supply chain, frete, e-commerce, Brasil
- [ ] Open Graph tags configuradas (og:title, og:description, og:image, og:url)
- [ ] Twitter Card tags configuradas
- [ ] Robots: index, follow
- [ ] Arquivo `public/robots.txt` permite indexação
- [ ] Arquivo `public/sitemap.xml` presente
- [ ] Favicon definido e carregando (`public/favicon.ico`)
- [ ] Schema.org JSON-LD para Person (opcional, mas recomendado)

### Acessibilidade

- [ ] Todas as imagens têm `alt` text descritivo
- [ ] Contraste de cores adequado (WCAG AA) — verifique com ferramenta de contraste
- [ ] Botões e links têm foco visível (focus ring do Tailwind)
- [ ] Formulários têm labels associados (shadcn Label)
- [ ] Lighthouse Accessibility > 90

### Código

- [ ] Não há erros no console do navegador (F12 → Console)
- [ ] Não há warnings críticos no console
- [ ] TypeScript compila sem erros (`npm run build`)
- [ ] Não há `any` types desnecessários
- [ ] Componentes seguem padrão de nomenclatura (PascalCase)
- [ ] Arquivos de dados separados de componentes (não hardcode textos)
- [ ] Tailwind v4 configurado corretamente (`@import "tailwindcss"`, `@theme` block)

### Deploy

- [ ] `next.config.ts` sem `output: 'export'` (deploy Vercel usa `.next/` nativo)
- [ ] Não há rotas dinâmicas que dependam de SSR
- [ ] Build na Vercel passa sem erros
- [ ] `NEXT_PUBLIC_DEMOS_BASE_URL` definida **antes do build** na Vercel (URLs de demo são fixadas em compile time)
- [ ] Output Directory no painel Vercel: **vazio**, overrides desligados
- [ ] Site está acessível no URL da Vercel
- [ ] Domínio personalizado configurado (opcional)

---

## Checklist de Primeira Execução (Apenas no início do projeto)

- [x] `.cursorrules` está na raiz do projeto (não em `docs/`)
- [x] O Cursor reconhece o `.cursorrules` (abra um arquivo, verifique se o contexto está carregado)
- [x] `docs/` contém todos os documentos: INDEX, VISION, ARCHITECTURE, PROMPTS, CONTENT, ROADMAP, CHECKLIST
- [x] Node.js 24.x (`engines` no package.json)
- [x] Conta GitHub criada (`lucasdevlogis-cpu`)
- [x] Conta Vercel criada e projeto linkado
- [x] Conta Streamlit Cloud — app deployado
- [x] `npm run dev` funciona sem erros
- [x] `npm run build` passa (Next.js nativo, sem static export)

---

## Checklist de Pré-Deploy (Executar antes de cada deploy)

### 24h antes do deploy

- [ ] Revisar todos os textos mais uma vez (leia em voz alta)
- [ ] Testar formulário de contato com dados reais
- [ ] Verificar se todos os links funcionam
- [ ] Revisar se cases estão com limitações declaradas

### 1h antes do deploy

- [ ] Rodar `npm run build` localmente e verificar erros
- [ ] Executar Lighthouse em todas as categorias
- [ ] Testar em mobile (DevTools)
- [ ] Verificar se o console do navegador está limpo
- [ ] Confirmar que o `.cursorrules` está atualizado na raiz do projeto

### Após o deploy

- [ ] Acessar <https://portfolio-lucas-batista-murex.vercel.app>
- [ ] Testar navegação em todas as seções
- [ ] Testar formulário de contato em produção
- [ ] Verificar se demos Streamlit carregam nos iframes
- [ ] Verificar meta tags com [Facebook Debugger](https://developers.facebook.com/tools/debug/) e [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Verificar robots.txt e sitemap.xml
- [ ] Tirar screenshot da página para registro

---

## Checklist de Pós-Lançamento (Semana 1)

- [ ] Vercel Analytics configurado e coletando dados
- [ ] Primeira semana: acompanhar visitas, páginas mais vistas, origem do tráfego
- [ ] LinkedIn: publicar primeiro post com link do portfólio
- [ ] Verificar se leads do formulário estão chegando
- [ ] Coletar feedback de 2-3 pessoas sobre o site
- [ ] Anotar ajustes para próxima versão

---

## Severidade dos Itens

| Severidade | Cor | Significado | Ação |
|---|---|---|---|
| 🔴 **Crítico** | Vermelho | Impede o funcionamento ou causa dano à credibilidade | Corrigir antes de qualquer deploy |
| 🟡 **Importante** | Amarelo | Afeta experiência ou SEO significativamente | Corrigir antes do lançamento oficial |
| 🟢 **Desejável** | Verde | Melhoraia ou refinamento | Pode ser adiado para próxima versão |

### Itens Críticos (🔴)

- Placeholder text não substituído ("[substituir]", "exemplo.com")
- Formulário não envia leads (nem console.log)
- Demos P0 não funcionam
- Cases sem limitação declarada
- Erros no console do navegador que impedem funcionamento
- Build quebrado (`npm run build` falha)
- Site não funciona em mobile
- `.cursorrules` não está na raiz do projeto

### Itens Importantes (🟡)

- SEO meta tags incompletas
- Lighthouse score < 90
- Sem favicon
- Links quebrados
- Sem declaração ética no footer
- Menu mobile não fecha ao clicar em link
- Scroll suave não funciona

### Itens Desejáveis (🟢)

- Schema.org JSON-LD
- Domínio personalizado
- Animações mais sofisticadas
- PWA (service worker)
- Dark mode
- Vercel Analytics configurado

---

## Versão Rápida (Checklist Mínimo para Deploy)

Se estiver com pressa, verifique apenas estes 10 itens:

2. [x] Email e LinkedIn reais
3. [ ] Formulário envia dados (ou console.log + mensagem de sucesso)
4. [ ] Cases P0 com demos funcionando
5. [ ] Sem erros no console que impedem funcionamento
6. [ ] Site funciona em mobile
7. [ ] Lighthouse > 85
8. [ ] Meta tags OG configuradas
9. [ ] Footer com declaração ética
10. [ ] Build passa na Vercel

---

*Documento de checklist. Versão revisada. Atualize conforme o projeto evolui e novos padrões de qualidade forem definidos.*
