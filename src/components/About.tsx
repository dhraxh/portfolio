import { portfolio } from "@/data/portfolio";
import Reveal from "./Reveal";
import { GraduationIcon } from "./icons";
import { Section, Tag, card } from "./ui";

export default function About() {
  return (
    <Section id="about" eyebrow="01 — About" title="Education & skills">
      <div className="grid gap-5 md:grid-cols-5">
        <Reveal className={`${card} p-6 sm:p-8 md:col-span-3`}>
          <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold tracking-wider text-zinc-400 uppercase">
            <GraduationIcon className="text-lg" /> Education
          </h3>
          <ol className="relative space-y-8 border-l border-white/10 pl-6">
            {portfolio.education.map((edu) => (
              <li key={edu.degree} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 -left-[29px] h-2.5 w-2.5 rounded-full ${edu.current ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" : "bg-zinc-600"}`}
                />
                <p className="font-mono text-xs text-zinc-500">
                  {edu.period}
                  {edu.current && <span className="ml-2 text-emerald-400">· Current</span>}
                </p>
                <p className="mt-1 text-lg font-semibold text-white">{edu.degree}</p>
                <p className="text-zinc-400">
                  {edu.institution}
                  {edu.location && `, ${edu.location}`}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.1} className={`${card} p-6 sm:p-8 md:col-span-2`}>
          <h3 className="mb-6 text-sm font-semibold tracking-wider text-zinc-400 uppercase">Skills</h3>
          <ul className="flex flex-wrap gap-2" aria-label="Skills">
            {portfolio.skills.map((skill) => (
              <li key={skill}>
                <Tag>{skill}</Tag>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
