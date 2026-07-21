"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import type { DemoModalCopy } from "@/data/content";
import { cn } from "@/lib/utils";

type FrameStatus = "loading" | "ready" | "timeout" | "error";
type Viewport = "mobile" | "desktop" | null;

const DEMO_TIMEOUT_MS = 22_000;

interface StreamlitDemoFrameProps {
  demoUrl: string;
  openUrl: string;
  title: string;
  thumbnail?: string;
  thumbnailAlt: string;
  copy: DemoModalCopy;
}

function LoadingPreview({
  status,
  openUrl,
  thumbnail,
  thumbnailAlt,
  copy,
}: Pick<StreamlitDemoFrameProps, "openUrl" | "thumbnail" | "thumbnailAlt" | "copy"> & {
  status: FrameStatus;
}) {
  const message =
    status === "error"
      ? copy.errorLabel
      : status === "timeout"
        ? copy.timeoutLabel
        : copy.initializingLabel;

  return (
    <div className="absolute inset-0 z-10 flex flex-col bg-editorial" aria-live="polite">
      <div className="relative flex-1 overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={thumbnailAlt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-surface-dark/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="max-w-md text-sm font-semibold text-white">{message}</p>
          {status === "loading" || status === "timeout" ? (
            <div
              className="size-8 rounded-full border-2 border-white/30 border-t-accent motion-safe:animate-spin motion-reduce:animate-none"
              aria-hidden
            />
          ) : null}
          {status === "timeout" || status === "error" ? (
            <a
              href={openUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "min-h-11 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white",
              )}
            >
              <ExternalLink className="size-4" aria-hidden />
              {copy.openExternalLabel}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function StreamlitDemoFrame({
  demoUrl,
  openUrl,
  title,
  thumbnail,
  thumbnailAlt,
  copy,
}: StreamlitDemoFrameProps) {
  const [viewport, setViewport] = useState<Viewport>(null);
  const [loadInline, setLoadInline] = useState(false);
  const [status, setStatus] = useState<FrameStatus>("loading");
  const embedUrl = `${demoUrl}${demoUrl.includes("?") ? "&" : "?"}embed=true`;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setViewport(media.matches ? "mobile" : "desktop");
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const shouldMount = viewport === "desktop" || loadInline;

  useEffect(() => {
    if (!shouldMount || status !== "loading") return;
    const timer = window.setTimeout(() => setStatus("timeout"), DEMO_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [shouldMount, status]);

  if (viewport === "mobile" && !loadInline) {
    return (
      <div className="flex flex-col items-center gap-4 px-5 py-6 text-center">
        {thumbnail ? (
          <div className="relative aspect-video w-full max-w-lg overflow-hidden rounded-xl border border-border">
            <Image
              src={thumbnail}
              alt={thumbnailAlt}
              fill
              className="object-cover object-top"
              sizes="100vw"
            />
          </div>
        ) : null}
        <p className="max-w-sm text-sm text-muted-foreground">{copy.mobileHint}</p>
        <div className="grid w-full gap-2 sm:max-w-md sm:grid-cols-2">
          <a
            href={openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "default" }), "min-h-11")}
          >
            <ExternalLink className="size-4" aria-hidden />
            {copy.fullscreenLabel}
          </a>
          <button
            type="button"
            onClick={() => setLoadInline(true)}
            className={cn(buttonVariants({ variant: "outline" }), "min-h-11")}
          >
            {copy.loadInlineLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[300px] flex-1 lg:min-h-[420px]">
      {status !== "ready" ? (
        <LoadingPreview
          status={status}
          openUrl={openUrl}
          thumbnail={thumbnail}
          thumbnailAlt={thumbnailAlt}
          copy={copy}
        />
      ) : null}
      {shouldMount ? (
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="clipboard-write"
          onLoad={() => setStatus("ready")}
          onError={() => setStatus("error")}
          className={cn(
            "h-[60vh] min-h-[300px] max-h-[500px] w-full border-0 lg:h-[min(640px,calc(92vh-11rem))] lg:min-h-[420px] lg:max-h-none",
            "motion-safe:transition-opacity motion-safe:duration-normal motion-safe:ease-editorial",
            status === "ready" ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}
    </div>
  );
}
