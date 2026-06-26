"use client";

import { Link, Mail } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTENT } from "@/data/content";

interface FormState {
  nome: string;
  email: string;
  empresa: string;
  desafio: string;
}

const initialForm: FormState = {
  nome: "",
  email: "",
  empresa: "",
  desafio: "",
};

export function Contato() {
  const { pessoal, contato, secoes } = CONTENT;
  const [form, setForm] = useState<FormState>(initialForm);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setEnviando(true);

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

    try {
      if (formId) {
        const response = await fetch(`https://formspree.io/f/${formId}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: form.nome,
            email: form.email,
            empresa: form.empresa,
            desafio: form.desafio,
            _subject: "Leitura inicial — Portfólio Lucas Batista",
          }),
        });

        if (!response.ok) {
          throw new Error("Falha ao enviar formulário");
        }
      } else {
        console.log("Contato recebido (Formspree não configurado):", form);
      }

      setEnviado(true);
      setForm(initialForm);
    } catch {
      setErro(
        "Não foi possível enviar agora. Tente o email direto abaixo ou tente novamente.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section id="contato" className="scroll-mt-20 bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {contato.titulo}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {contato.descricao}
          </p>
          <p className="mt-4 text-base text-foreground">
            {secoes.contatoBeneficio}
          </p>
        </div>

        <div>
          {enviado ? (
            <div
              className="rounded-xl border border-accent/30 bg-accent/5 p-8 text-center"
              role="status"
            >
              <p className="font-heading text-xl font-semibold text-primary">
                Mensagem recebida!
              </p>
              <p className="mt-2 text-muted-foreground">
                Obrigado pelo contato. Retorno em breve para alinhar a leitura
                inicial da sua operação.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-xl border bg-card p-6 shadow-sm"
            >
              <div className="space-y-2">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  name="nome"
                  required
                  value={form.nome}
                  placeholder="Seu nome"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, nome: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  placeholder="seu@email.com"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="empresa">Empresa</Label>
                <Input
                  id="empresa"
                  name="empresa"
                  value={form.empresa}
                  placeholder="Nome da empresa (opcional)"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, empresa: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desafio">Principal dor ou desafio</Label>
                <Textarea
                  id="desafio"
                  name="desafio"
                  rows={4}
                  value={form.desafio}
                  placeholder="Conte brevemente o que mais pesa hoje (opcional)"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, desafio: e.target.value }))
                  }
                />
              </div>
              <Button
                type="submit"
                disabled={enviando}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {enviando ? "Enviando…" : contato.ctaBotao}
              </Button>
              {erro ? (
                <p className="text-sm text-destructive" role="alert">
                  {erro}
                </p>
              ) : null}
            </form>
          )}

          <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-6">
            {!pessoal.email.startsWith("[") ? (
              <a
                href={`mailto:${pessoal.email}`}
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <Mail className="size-4" aria-hidden />
                {pessoal.email}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Mail className="size-4" aria-hidden />
                Email — preencher antes do deploy
              </span>
            )}
            {!pessoal.linkedin.startsWith("[") ? (
              <a
                href={pessoal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <Link className="size-4" aria-hidden />
                LinkedIn
              </a>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Link className="size-4" aria-hidden />
                LinkedIn — preencher antes do deploy
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
