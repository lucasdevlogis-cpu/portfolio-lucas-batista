# Documentação

Documentação curta e canônica. Histórico de código permanece no Git; relatórios
gerados pertencem a `.artifacts/`, não a `docs/`.

| Documento                                                                    | Função                                            |
| ---------------------------------------------------------------------------- | ------------------------------------------------- |
| [`CANON.md`](CANON.md)                                                       | objetivo, escopo, fontes da verdade e estado      |
| [`ARQUITETURA.md`](ARQUITETURA.md)                                           | topologia, camadas e fluxos                       |
| [`OPERACAO.md`](OPERACAO.md)                                                 | setup, comandos, deploy e troubleshooting         |
| [`QUALIDADE.md`](QUALIDADE.md)                                               | critérios técnicos, visuais e de acessibilidade   |
| [`ROADMAP.md`](ROADMAP.md)                                                   | concluído, pendências e próxima ordem de execução |
| [`../design/design.md`](../design/design.md)                                 | direção visual ativa                              |
| [`decisions/0001-single-repository.md`](decisions/0001-single-repository.md) | decisão de repositório único                      |

Leitura mínima para alterar código: `CANON.md` → `ARQUITETURA.md` → documento
específico da tarefa.

## Anti-deriva

- Não duplicar comandos ou status em novos relatórios datados.
- Atualizar o documento canônico quando arquitetura, deploy ou gate mudar.
- Não commitar screenshots, Lighthouse JSON, logs ou export intermediário do CV.
- Usar `docs/ROADMAP.md` como única fila ativa.
