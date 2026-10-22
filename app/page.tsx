"use client";

import { Button } from "@/components/ui/button";
import { ShaderAnimation } from "@/components/ui/shader-animation";

const stack = [
  {
    title: "Interfaces",
    description: "Where I focus most",
    technologies: ["React", "Next.js", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Full-stack",
    description: "Beyond the interface",
    technologies: ["APIs", "Server-side logic", "Databases", "PHP"],
  },
  {
    title: "Exploring",
    description: "Always moving forward",
    technologies: ["Expo", "New tools", "Better workflows"],
  },
];

const capabilities = [
  {
    number: "01",
    title: "Public website",
    description: "A public-facing site that brings the platform together.",
  },
  {
    number: "02",
    title: "Employee workspace",
    description:
      "Personal accounts with access to reports, scoped by administrator permissions.",
  },
  {
    number: "03",
    title: "Administration",
    description: "An admin panel for managing employee access and the platform.",
  },
];

function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Шейдер, приведённый к синей палитре */}
      <div className="absolute inset-0 opacity-[0.6] mix-blend-screen [filter:saturate(2.5)_hue-rotate(180deg)_brightness(0.8)]">
        <ShaderAnimation />
      </div>

      {/* Виньетка, чтобы текст читался */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#000000_85%)]" />

      {/* Синие акценты */}
      <div className="hero-glow absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3b82f6]/[0.08] blur-[150px]" />
      <div className="hero-orb absolute left-[18%] top-[24%] h-72 w-72 rounded-full bg-[#2563eb]/[0.08] blur-[130px]" />
      <div className="hero-orb hero-orb-slow absolute right-[14%] bottom-[20%] h-80 w-80 rounded-full bg-[#1d4ed8]/[0.06] blur-[140px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#000000] to-transparent" />
    </div>
  );
}

export default function Home() {
  function navigateTo(target: string) {
    window.location.href = target;
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white antialiased selection:bg-blue-500 selection:text-white">
      <style jsx global>{`
        @keyframes hero-float {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -20px, 0); }
        }
        @keyframes hero-fade {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.85; }
        }

        .hero-orb { animation: hero-float 22s ease-in-out infinite; }
        .hero-orb-slow { animation-delay: -8s; animation-duration: 30s; }
        .hero-glow { animation: hero-glow 12s ease-in-out infinite; }
        .hero-reveal { animation: hero-fade 1s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .hero-reveal-1 { animation-delay: 0.08s; }
        .hero-reveal-2 { animation-delay: 0.2s; }
        .hero-reveal-3 { animation-delay: 0.32s; }

        @media (prefers-reduced-motion: reduce) {
          .hero-orb, .hero-orb-slow, .hero-glow, .hero-reveal {
            animation: none !important;
          }
        }
      `}</style>

      {/* Navigation */}
      <header className="relative z-20 border-b border-white/[0.07]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-8 py-6">
          <a
            href="#"
            aria-label="Khasa — home"
            className="text-base font-medium tracking-tight"
          >
            khasa<span className="text-blue-500">.</span>
          </a>

          <nav
            aria-label="Main navigation"
            className="flex gap-6 text-[13px] text-zinc-400 sm:gap-10"
          >
            {["About", "Work", "Contact"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="transition-colors hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero — на всю ширину экрана */}
      <section className="relative flex min-h-[calc(100svh-5.25rem)] w-full flex-col items-center justify-center px-8 py-24 text-center">
        <HeroBackground />

        <div className="relative z-10 flex max-w-2xl flex-col items-center">
          <p className="hero-reveal mb-8 text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
            Full-stack developer
          </p>

          <h1 className="hero-reveal hero-reveal-1 text-[2.75rem] font-medium leading-[1.06] tracking-[-0.045em] sm:text-6xl lg:text-[5.25rem]">
            Thoughtful projects,
            <br />
            <span className="text-blue-500">end to end.</span>
          </h1>

          <p className="hero-reveal hero-reveal-2 mt-8 max-w-md text-[15px] leading-[1.75] text-zinc-400">
            I&apos;m Rishat Khasanov. I build complete web applications with a
            particular attention to clean interfaces and the details
            that make them feel right.
          </p>

          <div className="hero-reveal hero-reveal-3 mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={() => navigateTo("#work")}
              className="h-11 rounded-full bg-white px-7 text-[13px] font-medium text-black hover:bg-zinc-200"
            >
              View work
              <span aria-hidden="true" className="ml-2 opacity-60">
                ↗
              </span>
            </Button>

            <Button
              size="lg"
              variant="ghost"
              onClick={() => navigateTo("#contact")}
              className="h-11 rounded-full px-7 text-[13px] font-medium text-zinc-300 hover:bg-white/[0.06] hover:text-white"
            >
              Get in touch
            </Button>
          </div>
        </div>
      </section>

      {/* Остальной контент — в ограниченном контейнере */}
      <div className="mx-auto max-w-6xl px-8">
        {/* Technology strip */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3 border-y border-white/[0.07] py-6 text-[13px] text-zinc-400">
          <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Everyday tools
          </span>
          {["React", "Next.js", "Tailwind CSS", "shadcn/ui"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        {/* About */}
        <section
          id="about"
          className="scroll-mt-8 grid gap-12 py-24 lg:grid-cols-[0.5fr_1fr] lg:gap-20 lg:py-32"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-blue-500">
              01 / About
            </p>
            <h2 className="mt-6 text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              The whole picture.
              <br />
              An eye for detail.
            </h2>
          </div>

          <div className="max-w-xl space-y-5 text-[15px] leading-[1.8] text-zinc-400">
            <p>
              I develop websites end to end: the interface people interact
              with, the backend behind it, and the databases that bring
              everything together.
            </p>
            <p>
              My favourite part is frontend development and design — turning
              complex tasks into clear, useful interfaces with React and
              Next.js.
            </p>
            <p>
              I&apos;m always happy to learn a new technology when it makes
              the work simpler. Away from the screen, you&apos;ll find me on
              a trail.
            </p>
          </div>
        </section>

        {/* Stack */}
        <section aria-labelledby="stack-title" className="pb-24 lg:pb-32">
          <div className="mb-10 flex items-end justify-between gap-4 border-b border-white/[0.07] pb-6">
            <h2 id="stack-title" className="text-xl font-medium tracking-tight">
              Tools & perspective
            </h2>
            <span className="hidden text-[13px] text-zinc-500 sm:block">
              Practical tools. Thoughtful choices.
            </span>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-3">
            {stack.map((group) => (
              <div key={group.title} className="bg-black p-8">
                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                  {group.description}
                </p>
                <h3 className="mt-4 text-lg font-medium">{group.title}</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/[0.09] px-3 py-1 text-[12px] text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Work */}
        <section
          id="work"
          className="scroll-mt-8 border-t border-white/[0.07] py-24 lg:py-32"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-blue-500">
            02 / Current work
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <h2 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              One platform.
              <br />
              Multiple ways to work.
            </h2>

            <p className="max-w-md text-[15px] leading-[1.8] text-zinc-400">
              I&apos;m currently developing a web platform for a manufacturing
              business, covering the public website, employee workspace, and
              administration tools.
            </p>
          </div>

          <div className="mt-12 rounded-xl border border-white/[0.07] bg-zinc-950 p-8 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-6">
              <span className="text-[13px] text-zinc-300">
                Manufacturing web platform
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/[0.08] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-blue-400">
                In development
              </span>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {capabilities.map((item) => (
                <div key={item.number}>
                  <span className="font-mono text-[11px] text-zinc-500">
                    {item.number}
                  </span>
                  <h3 className="mt-4 text-[15px] font-medium">{item.title}</h3>
                  <p className="mt-3 text-[13px] leading-7 text-zinc-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-12 border-t border-white/[0.07] pt-6 text-[12px] leading-6 text-zinc-500">
              My role: full-stack development, interface design, and database
              work. Source code and internal visuals are confidential.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="scroll-mt-8 border-t border-white/[0.07] py-24 lg:py-32"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-blue-500">
            03 / Contact
          </p>

          <h2 className="mt-8 max-w-2xl text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
            Good things start
            <br />
            with a conversation.
          </h2>

          <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-zinc-400">
            Have something interesting in mind? Let&apos;s talk about
            development, interfaces, or your favourite trail.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button
              size="lg"
              onClick={() => navigateTo("https://t.me/khasa_88")}
              className="h-11 rounded-full bg-white px-7 text-[13px] font-medium text-black hover:bg-zinc-200"
            >
              Message on Telegram
              <span aria-hidden="true" className="ml-2 opacity-60">
                ↗
              </span>
            </Button>

            <a
              href="mailto:khasa1278@gmail.com"
              className="text-[13px] text-zinc-400 underline decoration-white/15 underline-offset-4 transition-colors hover:text-white"
            >
              khasa1278@gmail.com
            </a>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] py-8 text-[12px] text-zinc-500">
          <p>© {new Date().getFullYear()} Khasa</p>
          <p>Built with Next.js & shadcn/ui</p>
          <a
            href="https://github.com/khasa11"
            className="transition-colors hover:text-white"
          >
            GitHub ↗
          </a>
        </footer>
      </div>
    </main>
  );
}