"use client";

import { AnimatePresence, m } from "framer-motion";
import { useMemo, useState, type ReactNode } from "react";
import { portfolio, sections } from "@/data/portfolio";
import { ArrowRightIcon, CopyIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, SearchIcon } from "./icons";

type Command = { id: string; label: string; group: string; icon: ReactNode; run: () => void };

type Props = { open: boolean; onClose: () => void };

export default function CommandPalette({ open, onClose }: Props) {
  return <AnimatePresence>{open && <Palette onClose={onClose} />}</AnimatePresence>;
}

function Palette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const commands = useMemo<Command[]>(() => {
    const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    const open = (url: string) => () => window.open(url, "_blank", "noopener,noreferrer");
    const list: Command[] = [
      ...sections.map((s) => ({ id: s.id, label: s.label, group: "Go to", icon: <ArrowRightIcon />, run: go(s.id) })),
      {
        id: "resume-dl",
        label: "Download resume",
        group: "Actions",
        icon: <DownloadIcon />,
        run: () => {
          const a = document.createElement("a");
          a.href = portfolio.resume;
          a.download = "";
          a.click();
        },
      },
      {
        id: "copy-email",
        label: copied ? "Email copied!" : "Copy email address",
        group: "Actions",
        icon: <CopyIcon />,
        run: () => {
          navigator.clipboard?.writeText(portfolio.links.email).then(() => setCopied(true));
        },
      },
      { id: "email", label: "Send an email", group: "Links", icon: <MailIcon />, run: () => (window.location.href = `mailto:${portfolio.links.email}`) },
      { id: "github", label: "GitHub", group: "Links", icon: <GitHubIcon />, run: open(portfolio.links.github) },
    ];
    if (portfolio.links.linkedin) {
      list.push({ id: "linkedin", label: "LinkedIn", group: "Links", icon: <LinkedInIcon />, run: open(portfolio.links.linkedin) });
    }
    return list;
  }, [copied]);

  const results = commands.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()));

  const execute = (cmd: Command | undefined) => {
    if (!cmd) return;
    cmd.run();
    if (cmd.id !== "copy-email") onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      execute(results[active]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  let lastGroup = "";

  return (
        <m.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#111]/95 shadow-2xl shadow-black"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <SearchIcon className="text-zinc-500" />
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search sections and actions…"
                aria-label="Search sections and actions"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-list"
                aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
                className="h-14 w-full bg-transparent text-base text-white placeholder:text-zinc-500 focus:outline-none"
              />
              <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-zinc-500 sm:block">ESC</kbd>
            </div>
            <ul id="command-list" role="listbox" aria-label="Results" className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-zinc-500">No results.</li>}
              {results.map((cmd, i) => {
                const header = cmd.group !== lastGroup ? cmd.group : null;
                lastGroup = cmd.group;
                return (
                  <li key={cmd.id} role="presentation">
                    {header && (
                      <div role="presentation" className="px-3 pt-3 pb-1 text-[11px] font-medium tracking-wider text-zinc-500 uppercase">
                        {header}
                      </div>
                    )}
                    <div
                      id={`cmd-${cmd.id}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => execute(cmd)}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        i === active ? "bg-white/10 text-white" : "text-zinc-400"
                      }`}
                    >
                      <span className="text-base">{cmd.icon}</span>
                      {cmd.label}
                    </div>
                  </li>
                );
              })}
            </ul>
          </m.div>
        </m.div>
  );
}
