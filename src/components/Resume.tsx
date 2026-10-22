import { portfolio } from "@/data/portfolio";
import Reveal from "./Reveal";
import { ArrowUpRightIcon, DownloadIcon, FileIcon } from "./icons";
import { Section, buttonPrimary, buttonSecondary, card } from "./ui";

export default function Resume() {
  return (
    <Section id="resume" eyebrow="02 — Resume" title="My resume">
      <Reveal className={`${card} overflow-hidden`}>
        {/* Desktop: inline PDF preview. Mobile browsers can't render PDFs in iframes reliably. */}
        <iframe
          src={`${portfolio.resume}#view=FitH`}
          title="Resume preview"
          loading="lazy"
          className="hidden h-[80vh] max-h-[1000px] w-full bg-white md:block"
        />
        <div className="flex flex-col items-center gap-4 border-white/10 p-6 text-center sm:flex-row sm:justify-between sm:text-left md:border-t">
          <p className="flex items-center gap-2 text-sm text-zinc-400">
            <FileIcon className="text-lg" /> resume.pdf
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={portfolio.resume} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
              View Resume <ArrowUpRightIcon />
            </a>
            <a href={portfolio.resume} download className={buttonPrimary}>
              <DownloadIcon /> Download
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
