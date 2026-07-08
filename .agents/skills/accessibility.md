# Skill: Acessibilidade (a11y) — Checklist Operacional

## Descricao
Checklist operacional de acessibilidade para o portfolio. Use em conjunto com `.agents/skills/a11y.md`.

## Checklist Obrigatorio

### Contraste
- [ ] Ratio mínimo 4.5:1 para texto normal (< 18px)
- [ ] Ratio mínimo 3:1 para texto grande (>= 18px bold ou >= 24px)
- [ ] Ratio mínimo 3:1 para componentes interativos
- [ ] Nunca texto cinza-claro sobre fundo claro
- [ ] Verificar com axe DevTools ou Stark

### Navegacao por Teclado
- [ ] Todos os elementos interativos acessíveis via Tab
- [ ] Ordem de foco lógica
- [ ] Elemento focado tem outline visível (`.focus-ring`)
- [ ] Skip link presente: "Pular para conteúdo"
- [ ] Escape fecha modais/mobile menu

### Leitores de Tela
- [ ] Imagens com alt text descritivo
- [ ] Links externos com aria-label descritivo
- [ ] Ícones sem texto têm aria-hidden + aria-label no pai
- [ ] Seções com aria-label quando necessário
- [ ] `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` usados corretamente
- [ ] H1 único, hierarquia sem pulos
- [ ] Filtros anunciam mudanças via aria-live

### Touch Targets
- [ ] Botões/links: mínimo 44x44px
- [ ] Espaço entre botões adjacentes: mínimo 8px

### Animacoes
- [ ] `prefers-reduced-motion` respeitado
- [ ] Duração máxima 600ms
- [ ] Nenhum efeito piscante

## Tokens de Cor Verificados
| Combinação | Ratio | Status |
|------------|-------|--------|
| Ink `#07111f` sobre Editorial `#f7f4ec` | 15.8:1 | ✅ |
| Muted `#667085` sobre Editorial `#f7f4ec` | 4.8:1 | ✅ |
| Accent `#16a99c` sobre Surface dark `#07111f` | 4.9:1 | ✅ |
| Warm accent `#d4a853` sobre Surface dark `#07111f` | 8.2:1 | ✅ |

## Testes Rápidos
1. Desconectar mouse, navegar com Tab
2. Verificar foco visível em todos os elementos
3. Fechar modal com ESC
4. Rodar Lighthouse a11y
5. Meta: score >= 100
