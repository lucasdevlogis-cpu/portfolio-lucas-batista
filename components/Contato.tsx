"use client";

import { Link, Mail } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTENT, type CampoFormulario } from "@/data/content";

type FormFieldName = "nome" | "email" | "empresa" | "desafio";

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

function isFormFieldName(name: string): name is FormFieldName {
  return (
    name === "nome" ||
    name === "email" ||
    name === "empresa" ||
    name === "desafio"
  );
}

function fieldLabel(campo: CampoFormulario): string {
  const labels: Record<string, string> = {
    nome: "Nome",
    email: "Email",
    empresa: "Empresa",
    desafio: "Principal dor ou desafio",
  };
  return `${labels[campo.nome] ?? campo.nome}${campo.obrigatorio ? " *" : ""}`;
}

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
        const assunto = "Leitura inicial — Portfólio Lucas Batista";
        const corpo = [
          `Nome: ${form.nome}`,
          `Email: ${form.email}`,
          `Empresa: ${form.empresa || "-"}`,
          "",
          "Principal dor/desafio:",
          form.desafio || "-",
        ].join("\n");
        window.location.href = `mailto:${pessoal.email}?subject=${encodeURIComponent(
          assunto,
        )}&body=${encodeURIComponent(corpo)}`;
      }

      setEnviado(true);
      setForm(initialForm);
    } catch {
      setErro(contato.mensagemErro);
    } finally {
      setEnviando(false);
    }
  }

  function updateField(name: string, value: string) {
    if (!isFormFieldName(name)) return;
    setForm((prev) => ({ ...prev, [name]: value }));
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
                {contato.tituloSucesso}
              </p>
              <p className="mt-2 text-muted-foreground">
                {contato.mensagemSucesso}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-xl border bg-card p-6 shadow-sm"
            >
              {contato.camposFormulario.map((campo) => (
                <div key={campo.nome} className="space-y-2">
                  <Label htmlFor={campo.nome}>{fieldLabel(campo)}</Label>
                  {campo.tipo === "textarea" ? (
                    <Textarea
                      id={campo.nome}
                      name={campo.nome}
                      rows={4}
                      required={campo.obrigatorio}
                      value={form.desafio}
                      placeholder={campo.placeholder}
                      onChange={(e) => updateField(campo.nome, e.target.value)}
                    />
                  ) : (
                    <Input
                      id={campo.nome}
                      name={campo.nome}
                      type={campo.tipo}
                      required={campo.obrigatorio}
                      value={
                        isFormFieldName(campo.nome) ? form[campo.nome] : ""
                      }
                      placeholder={campo.placeholder}
                      onChange={(e) => updateField(campo.nome, e.target.value)}
                    />
                  )}
                </div>
              ))}
              <Button
                type="submit"
                disabled={enviando}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {enviando ? contato.enviandoLabel : contato.ctaBotao}
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
