"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { fullName, portfolio, sections } from "@/data/portfolio";
import Avatar from "./Avatar";
import CommandPalette from "./CommandPalette";
import { WARP_EVENT } from "./Starfield";
import { CloseIcon, GitHubIcon, MailIcon, MenuIcon, SearchIcon, SparklesIcon } from "./icons";

const iconButton =
  "grid h-9 w-9 place-items-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Ctrl/⌘ + K opens the command palette from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMenuOpen(false);
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock page scroll while an overlay is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen || paletteOpen ? "hidden" : "";
  }, [menuOpen, paletteOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav
          aria-label="Main"
          className="flex w-full max-w-xl items-center justify-between gap-2 rounded-full border border-white/10 bg-[#111]/70 py-1.5 pr-1.5 pl-2 shadow-lg shadow-black/40 backdrop-blur-md"
        >
          <a href="#home" className="flex items-center gap-2.5 rounded-full pr-2" aria-label={`${fullName} — back to top`}>
            <Avatar size={32} />
            <span className="text-sm font-semibold tracking-tight text-white">{portfolio.firstName}</span>
          </a>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className={`${iconButton} sm:w-auto sm:gap-2 sm:px-3`}
              aria-label="Open command menu (Ctrl+K)"
            >
              <SearchIcon />
              <kbd className="hidden font-sans text-[11px] text-zinc-500 sm:inline">Ctrl K</kbd>
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(WARP_EVENT))}
              className={iconButton}
              aria-label="Warp the starfield"
              title="Warp speed!"
            >
              <SparklesIcon />
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className={`${iconButton} bg-white/5`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && <MenuOverlay onClose={closeMenu} />}
      </AnimatePresence>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}

function MenuOverlay({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Keep Tab focus inside the overlay.
      if (e.key === "Tab" && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>("a, button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <m.div
      id="site-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-40 flex flex-col bg-[#0a0a0a]/95 px-6 pt-28 pb-10 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button type="button" onClick={onClose} className="sr-only focus:not-sr-only focus:self-end focus:text-sm focus:text-zinc-400">
        Close menu
      </button>
      <ul className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-2">
        {sections.map((s, i) => (
          <m.li
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.05 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={`#${s.id}`}
              onClick={onClose}
              className="group flex items-baseline gap-4 rounded-lg py-2 text-5xl font-bold tracking-tighter text-zinc-500 uppercase transition-colors hover:text-white focus-visible:text-white sm:text-6xl"
            >
              <span className="font-mono text-xs font-normal tracking-normal text-zinc-600">0{i + 1}</span>
              {s.label}
            </a>
          </m.li>
        ))}
      </ul>
      <div className="mx-auto flex w-full max-w-xl items-center gap-4 text-sm text-zinc-500">
        <a href={portfolio.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
          <GitHubIcon /> GitHub
        </a>
        <a href={`mailto:${portfolio.links.email}`} className="flex items-center gap-2 hover:text-white">
          <MailIcon /> Email
        </a>
      </div>
    </m.div>
  );
}
