"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Project } from "@/data/portfolio";
import { ArrowUpRightIcon, GitHubIcon } from "./icons";
import { Tag, buttonPrimary, buttonSecondary, card } from "./ui";

/** Only devices with a real mouse and a wide screen get the live iframe preview. */
const canPreview = () => window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches;

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [preview, setPreview] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const onEnter = () => {
    if (!project.livePreview || !canPreview()) return;
    // Small delay so quickly moving the mouse across cards doesn't load every site.
    timer.current = setTimeout(() => setPreview(true), 350);
  };
  const onLeave = () => clearTimeout(timer.current);

  return (
    <article className={`${card} group flex w-full flex-col overflow-hidden`} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-zinc-900">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          unoptimized={project.image.endsWith(".svg")}
        />
        {preview && (
          // Rendered at desktop size and scaled down so the site shows its real layout.
          <iframe
            src={project.liveUrl}
            title={`Live preview of ${project.title}`}
            aria-hidden="true"
            tabIndex={-1}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            onLoad={() => setLoaded(true)}
            className={`pointer-events-none absolute top-0 left-0 h-[400%] w-[400%] origin-top-left scale-25 border-0 bg-white transition-opacity duration-500 ${
              loaded ? "opacity-0 group-hover:opacity-100" : "opacity-0"
            }`}
          />
        )}
        <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[11px] text-zinc-300 backdrop-blur">
          0{index + 1}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold tracking-tight text-white">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
          {project.tech.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonPrimary} px-4 py-2`}
            aria-label={`${project.title} live demo (opens in new tab)`}
          >
            Live Demo <ArrowUpRightIcon />
          </a>
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonSecondary} px-4 py-2`}
            aria-label={`${project.title} source code on GitHub (opens in new tab)`}
          >
            <GitHubIcon /> GitHub
          </a>
        </div>
      </div>
    </article>
  );
}
