import type { ReactNode } from "react";
import Reveal from "./Reveal";

export const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 hover:shadow-[0_0_24px_rgba(255,255,255,0.25)]";

export const buttonSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10";

export const iconLink =
  "grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-lg text-zinc-300 transition hover:border-white/30 hover:bg-white/10 hover:text-white";

export const card =
  "rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition duration-300 hover:border-white/20 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.15)]";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">{children}</span>
  );
}

export function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
      <Reveal>
        <p className="mb-3 font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">{eyebrow}</p>
        <h2 id={`${id}-title`} className="mb-10 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
