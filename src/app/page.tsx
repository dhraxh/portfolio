import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Starfield from "@/components/Starfield";
import { portfolio } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <Starfield />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Resume />
        <Projects />
        <Contact />
      </main>
      <footer className="border-t border-white/5 px-4 py-8 text-center text-sm text-zinc-500">
        © {portfolio.footer.year} {portfolio.firstName} · Built with {portfolio.footer.builtWith}
      </footer>
    </>
  );
}
