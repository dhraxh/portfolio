import { portfolio } from "@/data/portfolio";
import Reveal from "./Reveal";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import { buttonPrimary, card, iconLink } from "./ui";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28">
      <Reveal className={`${card} relative overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20`}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
        />
        <p className="mb-3 font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">04 — Contact</p>
        <h2 id="contact-title" className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
          {portfolio.contact.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">{portfolio.contact.blurb}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={`mailto:${portfolio.links.email}`} className={`${buttonPrimary} max-w-full break-all`}>
            <MailIcon /> {portfolio.links.email}
          </a>
          <a href={portfolio.links.github} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="GitHub profile (opens in new tab)">
            <GitHubIcon />
          </a>
          {portfolio.links.linkedin && (
            <a href={portfolio.links.linkedin} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="LinkedIn profile (opens in new tab)">
              <LinkedInIcon />
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}
