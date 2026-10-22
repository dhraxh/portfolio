import { fullName, portfolio } from "@/data/portfolio";
import Reveal from "./Reveal";
import { ArrowRightIcon, DownloadIcon, GitHubIcon, MailIcon } from "./icons";
import { buttonPrimary, buttonSecondary, iconLink } from "./ui";

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center px-4 pt-32 pb-16 sm:px-6"
    >
      <Reveal immediate>
        <p className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-1.5 text-xs font-medium text-emerald-200 sm:text-sm">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {portfolio.status}
        </p>
      </Reveal>

      <Reveal immediate delay={0.08}>
        <h1 className="bg-linear-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text pb-2 text-[clamp(3rem,13vw,9.5rem)] leading-[0.9] font-black tracking-tighter text-transparent uppercase">
          {fullName}
        </h1>
      </Reveal>

      <Reveal immediate delay={0.16}>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs tracking-wider text-zinc-400 uppercase">
          <span className="text-emerald-400" aria-hidden="true">●</span>
          Role <span className="text-zinc-600" aria-hidden="true">|</span>
          <span className="text-white">{portfolio.role}</span>
        </p>
      </Reveal>

      <Reveal immediate delay={0.24} className="mt-10 max-w-2xl">
        <p className="text-2xl leading-tight font-bold tracking-tight text-white sm:text-4xl">{portfolio.tagline}</p>
        <p className="mt-4 text-base text-zinc-500 italic sm:text-lg">{portfolio.quote}</p>
        <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">{portfolio.bio}</p>
      </Reveal>

      <Reveal immediate delay={0.32} className="mt-10 flex flex-wrap items-center gap-3">
        <a href="#projects" className={buttonPrimary}>
          View Projects <ArrowRightIcon />
        </a>
        <a href={portfolio.resume} download className={buttonSecondary}>
          <DownloadIcon /> Download Resume
        </a>
        <a href={portfolio.links.github} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="GitHub profile (opens in new tab)">
          <GitHubIcon />
        </a>
        <a href={`mailto:${portfolio.links.email}`} className={iconLink} aria-label={`Email ${portfolio.links.email}`}>
          <MailIcon />
        </a>
      </Reveal>
    </section>
  );
}
