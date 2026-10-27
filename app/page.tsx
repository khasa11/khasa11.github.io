"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShaderAnimation } from "@/components/ui/shader-animation";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Playground", href: "#playground" },
  { label: "Contact", href: "#contact" },
];

const stack = [
  {
    title: "Frontend",
    description: "My main focus",
    technologies: ["React", "Next.js", "JavaScript", "TypeScript"],
  },
  {
    title: "UI & styling",
    description: "Details that matter",
    technologies: [
      "Tailwind CSS",
      "shadcn/ui",
      "Responsive layouts",
    ],
  },
  {
    title: "Exploring",
    description: "Always curious",
    technologies: ["Expo", "New tools", "Better workflows"],
  },
];

const capabilities = [
  {
    number: "01",
    title: "Public website",
    description:
      "Public-facing pages that introduce the business and bring the platform together.",
  },
  {
    number: "02",
    title: "Employee workspace",
    description:
      "Employee accounts and reporting interfaces, with access based on permissions assigned by an administrator.",
  },
  {
    number: "03",
    title: "Administration",
    description:
      "Interfaces for managing employee access and working with the platform.",
  },
];

const demoTasks = [
  {
    id: "employee-workspace",
    title: "Employee workspace",
    category: "Dashboard",
    status: "In progress",
  },
  {
    id: "report-filters",
    title: "Report filters",
    category: "Interaction",
    status: "Ready",
  },
  {
    id: "mobile-navigation",
    title: "Mobile navigation",
    category: "Layout",
    status: "Ready",
  },
] as const;

const taskFilters = ["All", "Ready", "In progress"] as const;

type TaskFilter = (typeof taskFilters)[number];

function HeroBackground() {
  const [showShader, setShowShader] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    function updateMotionPreference() {
      setShowShader(!mediaQuery.matches);
    }

    updateMotionPreference();

    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {showShader && (
        <div className="hero-shader absolute inset-0 opacity-60 mix-blend-screen">
          <ShaderAnimation />
        </div>
      )}

      <div className="hero-vignette absolute inset-0" />

      <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2">
        <div className="hero-glow h-full w-full rounded-full bg-ring/10 blur-[150px]" />
      </div>

      <div className="hero-orb absolute left-[18%] top-[24%] h-72 w-72 rounded-full bg-primary/10 blur-[130px]" />

      <div className="hero-orb hero-orb-slow absolute bottom-[20%] right-[14%] h-80 w-80 rounded-full bg-primary/5 blur-[140px]" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

function UIPlayground() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("All");

  const normalizedQuery = query.trim().toLowerCase();

  const visibleTasks = demoTasks.filter((task) => {
    const matchesStatus =
      filter === "All" || task.status === filter;

    const matchesQuery =
      `${task.title} ${task.category}`
        .toLowerCase()
        .includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });

  const hasActiveFilters = query.length > 0 || filter !== "All";

  function resetFilters() {
    setQuery("");
    setFilter("All");
  }

  return (
    <section
      id="playground"
      aria-labelledby="playground-heading"
      className="scroll-mt-8 border-t border-border py-24 lg:py-32"
    >
      <p className="section-label">03 / UI playground</p>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2
            id="playground-heading"
            className="section-heading"
          >
            Small components.
            <br />
            Real interactions.
          </h2>

          <p className="body-copy mt-6">
            A small, working example built with shadcn/ui.
            Search the list, filter by status, or reset the view.
          </p>

          <p className="mt-4 text-xs leading-6 text-muted-foreground">
            Illustrative data only. This is not a screenshot or a
            reproduction of the internal platform.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Button", "Card", "Badge", "Input"].map((component) => (
              <Badge
                key={component}
                variant="outline"
                className="font-normal"
              >
                {component}
              </Badge>
            ))}
          </div>
        </div>

        <Card className="min-w-0 border-border bg-card text-card-foreground shadow-none">
          <CardHeader>
            <CardTitle>Interface tasks</CardTitle>

            <CardDescription>
              A little interaction, not just a static preview.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="task-search"
                className="text-sm font-medium"
              >
                Search tasks
              </label>

              <Input
                id="task-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try ‘report’ or ‘layout’…"
                className="bg-background"
              />
            </div>

            <div
              role="group"
              aria-label="Filter tasks by status"
              className="flex flex-wrap gap-2"
            >
              {taskFilters.map((status) => (
                <Button
                  key={status}
                  type="button"
                  size="sm"
                  variant={filter === status ? "default" : "outline"}
                  aria-pressed={filter === status}
                  onClick={() => setFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>

            <p
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="text-xs text-muted-foreground"
            >
              {visibleTasks.length}{" "}
              {visibleTasks.length === 1 ? "task" : "tasks"} found
            </p>

            <ul
              aria-label="Matching tasks"
              className="divide-y divide-border rounded-lg border border-border"
            >
              {visibleTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex flex-wrap items-center justify-between gap-3 p-4"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {task.title}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {task.category}
                    </p>
                  </div>

                  <Badge
                    variant="outline"
                    className={
                      task.status === "Ready"
                        ? "border-primary/30 bg-primary/10 text-ring"
                        : "text-muted-foreground"
                    }
                  >
                    {task.status}
                  </Badge>
                </li>
              ))}

              {visibleTasks.length === 0 && (
                <li className="p-6">
                  <p className="text-sm font-medium">
                    No matching tasks
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Try another search or reset the filters.
                  </p>
                </li>
              )}
            </ul>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={!hasActiveFilters}
              onClick={resetFilters}
            >
              Reset filters
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main
      id="top"
      className="min-h-screen overflow-x-hidden bg-background text-foreground"
    >
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header className="relative z-20 border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-6 sm:px-8">
          <a
            href="#top"
            aria-label="Khasa — home"
            className="text-base font-medium tracking-tight"
          >
            khasa<span className="text-ring">.</span>
          </a>

          <nav
            aria-label="Main navigation"
            className="flex flex-wrap gap-4 text-xs text-muted-foreground sm:gap-8 sm:text-[13px]"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section
        id="main-content"
        aria-labelledby="hero-heading"
        tabIndex={-1}
        className="relative isolate flex min-h-[calc(100svh-5.25rem)] w-full flex-col items-center justify-center px-5 py-24 text-center sm:px-8"
      >
        <HeroBackground />

        <div className="relative z-10 flex max-w-3xl flex-col items-center">
          <p className="hero-reveal mb-8 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Frontend Engineer
          </p>

          <h1
            id="hero-heading"
            className="hero-reveal hero-reveal-1 text-[2.75rem] font-medium leading-[1.06] tracking-[-0.045em] sm:text-6xl lg:text-[5.25rem]"
          >
            Clean interfaces.
            <br />
            <span className="text-ring">
              Thoughtful details.
            </span>
          </h1>

          <p className="hero-reveal hero-reveal-2 mt-8 max-w-lg text-[15px] leading-7 text-muted-foreground">
            I&apos;m Rishat Khasanov. I build web interfaces with
            React and Next.js, combining frontend development with
            an eye for design and user experience.
          </p>

          <div className="hero-reveal hero-reveal-3 mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#work"
              className="pill-link pill-link-primary"
            >
              View work
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href="#contact"
              className="pill-link pill-link-secondary"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3 border-y border-border py-6 text-[13px] text-muted-foreground">
          <span className="text-[11px] uppercase tracking-[0.22em]">
            Everyday tools
          </span>

          {["React", "Next.js", "Tailwind CSS", "shadcn/ui"].map(
            (technology) => (
              <span key={technology}>{technology}</span>
            ),
          )}
        </div>

        <section
          id="about"
          aria-labelledby="about-heading"
          className="scroll-mt-8 grid gap-12 py-24 lg:grid-cols-[0.5fr_1fr] lg:gap-20 lg:py-32"
        >
          <div>
            <p className="section-label">01 / About</p>

            <h2
              id="about-heading"
              className="mt-6 text-2xl font-medium leading-snug tracking-tight sm:text-3xl"
            >
              Frontend by choice.
              <br />
              An eye for detail.
            </h2>
          </div>

          <div className="body-copy max-w-xl space-y-5">
            <p>
              I focus on building clear, useful web interfaces —
              from page layouts and reusable components to the
              interactions that bring them to life.
            </p>

            <p>
              My background in end-to-end web development helps
              me understand how interfaces connect to the systems
              behind them. Today, my focus is frontend development,
              interface design, and user experience.
            </p>

            <p>
              I enjoy learning new tools when they genuinely make
              the work simpler. Away from the screen, you&apos;ll
              find me on a trail.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="stack-heading"
          className="pb-24 lg:pb-32"
        >
          <div className="mb-10 flex items-end justify-between gap-4 border-b border-border pb-6">
            <h2
              id="stack-heading"
              className="text-xl font-medium tracking-tight"
            >
              Tools & perspective
            </h2>

            <p className="hidden text-[13px] text-muted-foreground sm:block">
              Practical tools. Thoughtful choices.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {stack.map((group) => (
              <Card
                key={group.title}
                className="border-border bg-card text-card-foreground shadow-none"
              >
                <CardHeader>
                  <CardDescription className="text-[11px] uppercase tracking-[0.18em]">
                    {group.description}
                  </CardDescription>

                  <CardTitle>
                    <h3 className="text-lg font-medium">
                      {group.title}
                    </h3>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {group.technologies.map((technology) => (
                      <Badge
                        key={technology}
                        variant="outline"
                        className="rounded-full px-3 py-1 font-normal text-secondary-foreground"
                      >
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section
          id="work"
          aria-labelledby="work-heading"
          className="scroll-mt-8 border-t border-border py-24 lg:py-32"
        >
          <p className="section-label">02 / Current work</p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <h2
              id="work-heading"
              className="section-heading"
            >
              Interfaces for
              <br />
              real working days.
            </h2>

            <p className="body-copy max-w-md">
              I&apos;m building interfaces for a manufacturing
              platform: a public website, employee dashboards,
              reporting screens, and administration tools.
            </p>
          </div>

          <Card className="mt-12 border-border bg-card text-card-foreground shadow-none">
            <CardContent className="p-6 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
                <h3 className="text-sm font-medium">
                  Manufacturing web platform
                </h3>

                <Badge
                  variant="outline"
                  className="rounded-full border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-normal uppercase tracking-wider text-ring"
                >
                  In development
                </Badge>
              </div>

              <div className="mt-10 grid gap-10 md:grid-cols-3">
                {capabilities.map((item) => (
                  <div key={item.number}>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {item.number}
                    </span>

                    <h4 className="mt-4 text-[15px] font-medium">
                      {item.title}
                    </h4>

                    <p className="mt-3 text-[13px] leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-12 border-t border-border pt-6 text-xs leading-6 text-muted-foreground">
                Frontend focus: interface design, reusable
                components, and user flows across public and
                internal areas. Source code and internal visuals
                are confidential.
              </p>
            </CardContent>
          </Card>
        </section>

        <UIPlayground />

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="scroll-mt-8 border-t border-border py-24 lg:py-32"
        >
          <p className="section-label">04 / Contact</p>

          <h2
            id="contact-heading"
            className="mt-8 max-w-2xl text-3xl font-medium leading-tight tracking-tight sm:text-5xl"
          >
            Good things start
            <br />
            with a conversation.
          </h2>

          <p className="body-copy mt-6 max-w-md">
            Have something interesting in mind? Let&apos;s talk
            about frontend, interfaces, or your favourite trail.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="https://t.me/khasa_88"
              className="pill-link pill-link-primary"
            >
              Message on Telegram
              <span aria-hidden="true">↗</span>
            </a>

            <a
              href="mailto:khasa1278@gmail.com"
              className="break-all text-[13px] text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground"
            >
              khasa1278@gmail.com
            </a>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-8 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Rishat Khasanov</p>

          <p>Built with Next.js & shadcn/ui</p>

          <a
            href="https://github.com/khasa11"
            className="transition-colors hover:text-foreground"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
    </main>
  );
}