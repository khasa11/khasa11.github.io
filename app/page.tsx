"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Database,
  ExternalLink,
  FileText,
  KeyRound,
  Mail,
  MessageCircle,
  Pause,
  Play,
  Send,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import {
  SiCss,
  SiCaddy,
  SiDeepseek,
  SiDocker,
  SiExpo,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiMinio,
  SiPostgresql,
  SiPerplexity,
  SiPrisma,
  SiReact,
  SiReacthookform,
  SiShadcnui,
  SiTanstack,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiZod,
} from "react-icons/si";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import DotGrid from "@/components/ui/dot-grid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
} from "@/components/ui/message";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

const heroSections = [
  { number: "00", label: "Intro", href: "#main-content" },
  { number: "01", label: "Technologies", href: "#stack-overview-heading" },
  { number: "02", label: "About", href: "#about" },
  { number: "03", label: "UI Playground", href: "#playground" },
  { number: "04", label: "Contact", href: "#contact" },
];

type StackItem = {
  name: string;
  link: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

const stackCategories: Array<{ name: string; items: StackItem[] }> = [
  {
    name: "Frontend",
    items: [
      { name: "React", link: "https://reactjs.org", description: "Builds interactive user interfaces from reusable components.", icon: SiReact, color: "#61DAFB" },
      { name: "React Hook Form", link: "https://react-hook-form.com", description: "Manages form state and validation with minimal re-renders.", icon: SiReacthookform, color: "#EC5990" },
      { name: "TanStack Query", link: "https://tanstack.com/query", description: "Fetches, caches, and updates server data in the UI.", icon: SiTanstack, color: "#FF4154" },
      { name: "Next.js", link: "https://nextjs.org", description: "A React framework for routing, rendering, and full-stack web apps.", icon: SiNextdotjs, color: "#F5F5F5" },
      { name: "Tailwind CSS", link: "https://tailwindcss.com", description: "Styles interfaces with composable utility classes.", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "shadcn/ui", link: "https://ui.shadcn.com", description: "A collection of accessible, customizable interface components.", icon: SiShadcnui, color: "#F5F5F5" },
      { name: "@react-pdf/renderer", link: "https://react-pdf.org", description: "Creates PDF documents using React components.", icon: FileText, color: "#FF5757" },
      { name: "HTML", link: "https://developer.mozilla.org/en-US/docs/Web/HTML", description: "Structures content on the web.", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", link: "https://developer.mozilla.org/en-US/docs/Web/CSS", description: "Controls the layout and visual styling of web pages.", icon: SiCss, color: "#1572B6" },
    ],
  },
  {
    name: "Languages",
    items: [
      { name: "TypeScript", link: "https://typescriptlang.org", description: "Adds static types to JavaScript for safer development.", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", description: "Powers interactive behavior across web applications.", icon: SiJavascript, color: "#F0DB4F" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", link: "https://nodejs.org", description: "Runs JavaScript outside the browser, including on servers.", icon: SiNodedotjs, color: "#539E43" },
      { name: "NextAuth.js", link: "https://authjs.dev", description: "Adds authentication and session management to web apps.", icon: KeyRound, color: "#E8E8E8" },
      { name: "Zod", link: "https://zod.dev", description: "Validates data with schemas and infers TypeScript types.", icon: SiZod, color: "#3E67B1" },
      { name: "Nodemailer", link: "https://nodemailer.com", description: "Sends email from Node.js applications.", icon: Mail, color: "#22A6B3" },
    ],
  },
  {
    name: "Databases",
    items: [
      { name: "PostgreSQL", link: "https://www.postgresql.org", description: "Stores and queries relational application data.", icon: SiPostgresql, color: "#4169E1" },
      { name: "Oracle", link: "https://www.oracle.com/database/", description: "An enterprise relational database for storing and querying data.", icon: Database, color: "#F80000" },
      { name: "Prisma", link: "https://www.prisma.io", description: "Provides a type-safe ORM for working with databases.", icon: SiPrisma, color: "#7D9BF5" },
    ],
  },
  {
    name: "Mobile & 3D",
    items: [
      { name: "Expo", link: "https://expo.dev", description: "Builds and ships React Native apps across platforms.", icon: SiExpo, color: "#F5F5F5" },
      { name: "Three.js", link: "https://threejs.org", description: "Creates and renders 3D graphics in the browser.", icon: SiThreedotjs, color: "#F5F5F5" },
    ],
  },
  {
    name: "Infrastructure & Storage",
    items: [
      { name: "Docker", link: "https://www.docker.com", description: "Packages applications and dependencies into containers.", icon: SiDocker, color: "#2496ED" },
      { name: "Caddy", link: "https://caddyserver.com", description: "Serves websites and manages HTTPS automatically.", icon: SiCaddy, color: "#1F88C0" },
      { name: "MinIO", link: "https://min.io", description: "Provides S3-compatible object storage.", icon: SiMinio, color: "#C72C48" },
      { name: "@aws-sdk/client-s3", link: "https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/", description: "Connects applications to Amazon S3 for object storage.", icon: Cloud, color: "#FF9900" },
    ],
  },
  {
    name: "Tools & AI",
    items: [
      { name: "Git", link: "https://git-scm.com", description: "Tracks code changes and supports collaborative workflows.", icon: SiGit, color: "#F05032" },
      { name: "GitHub", link: "https://github.com", description: "Hosts Git repositories and tools for code collaboration.", icon: SiGithub, color: "#F0F6FC" },
      { name: "Figma", link: "https://figma.com", description: "Designs and prototypes interfaces collaboratively.", icon: SiFigma, color: "#F24E1E" },
      { name: "DeepSeek", link: "https://www.deepseek.com", description: "AI assistant for research, reasoning, and coding tasks.", icon: SiDeepseek, color: "#4D6BFE" },
      { name: "ChatGPT", link: "https://chatgpt.com", description: "AI assistant for writing, analysis, and problem-solving.", icon: MessageCircle, color: "#74AA9C" },
      { name: "Perplexity", link: "https://www.perplexity.ai", description: "AI-powered search that answers questions with sources.", icon: SiPerplexity, color: "#20B8CD" },
    ],
  },
];

const leadershipSignals = [
  {
    title: "Product thinking",
    description:
      "Turn business constraints into clear flows, useful UI decisions, and measurable outcomes.",
  },
  {
    title: "Design systems",
    description:
      "Build reusable patterns that keep the product consistent and scale with the team.",
  },
  {
    title: "Delivery quality",
    description:
      "Ship robust interfaces quickly without sacrificing usability, clarity, or polish.",
  },
];

function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const characters = " .:-=+*#%@";
    const cellWidth = 12;
    const cellHeight = 19;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let lastFrame = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (time: number) => {
      if (time - lastFrame < 42) {
        animationFrame = window.requestAnimationFrame(draw);
        return;
      }

      lastFrame = time;
      context.clearRect(0, 0, width, height);
      context.font = "12px monospace";
      context.textBaseline = "top";

      const columns = Math.ceil(width / cellWidth);
      const rows = Math.ceil(height / cellHeight);
      const phase = time * 0.00035;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const wave =
            (Math.sin(column * 0.12 + row * 0.19 - phase) +
              Math.cos(column * 0.07 - row * 0.14 + phase * 1.3) +
              2) /
            4;
          const fadeX = Math.max(0, Math.min(1, (column / columns - 0.12) * 2.2));
          const fadeY = 1 - (row / rows) * 0.35;
          const intensity = wave * fadeX * fadeY;

          if (intensity < 0.3) continue;

          const characterIndex = Math.min(
            characters.length - 1,
            Math.floor(intensity * characters.length),
          );
          context.fillStyle = `rgba(220, 220, 214, ${0.04 + intensity * 0.15})`;
          context.fillText(
            characters[characterIndex],
            column * cellWidth,
            row * cellHeight,
          );
        }
      }

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });

    resize();
    resizeObserver.observe(canvas);
    draw(reducedMotion ? 0 : performance.now());

    if (!reducedMotion) {
      animationFrame = window.requestAnimationFrame(draw);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="ascii-field pointer-events-none absolute inset-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="ascii-canvas absolute inset-0 size-full" />
    </div>
  );
}

function UIPlayground() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { from: "assistant", text: "Hi! What are you working on today?" },
    { from: "you", text: "Refining a component library for a new project." },
    { from: "assistant", text: "Nice. Want to start with the calendar or navigation?" },
  ]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!carouselApi) return;

    const updateActiveSlide = () => {
      setActiveSlide(carouselApi.selectedScrollSnap());
    };

    updateActiveSlide();
    carouselApi.on("select", updateActiveSlide);

    return () => {
      carouselApi.off("select", updateActiveSlide);
    };
  }, [carouselApi]);

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }

  function sendChatMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = chatMessage.trim();
    if (!text) return;

    setChatMessages((messages) => [...messages, { from: "you", text }]);
    setChatMessage("");
  }

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  return (
    <section
      id="playground"
      data-nav-section="#playground"
      aria-labelledby="playground-heading"
      className="relative left-1/2 isolate w-screen -translate-x-1/2 scroll-mt-8 border-y border-border py-24 lg:py-32"
    >
      <DotGrid theme="dark" spacing={22} />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="section-label">03 / UI playground</p>
            <h2 id="playground-heading" className="section-heading mt-4">
              A few things to play with.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-2 text-xs tabular-nums text-muted-foreground">
              {String(activeSlide + 1).padStart(2, "0")} / 03
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous demo"
              onClick={() => carouselApi?.scrollPrev()}
              className="rounded-full border-border bg-card"
            >
              <ChevronLeft />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Next demo"
              onClick={() => carouselApi?.scrollNext()}
              className="rounded-full border-border bg-card"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        <Carousel
          setApi={setCarouselApi}
          opts={{ align: "start", loop: true }}
          aria-label="Interactive component demos"
          className="mt-8"
        >
          <CarouselContent className="-ml-5">
            <CarouselItem className="basis-full pl-5 md:basis-[70%] xl:basis-1/2">
              <Card className="h-full min-h-127.5 overflow-hidden border-border bg-card shadow-none">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-ring">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.18em]">Date picker</span>
                  </div>
                  <CardTitle className="mt-1">Calendar</CardTitle>
                  <CardDescription>Choose a day to schedule a meeting.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="mx-auto"
                  />
                  <div className="mt-2 flex w-full max-w-sm items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
                    <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-ring">
                      <CalendarDays className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">Selected date</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {selectedDate?.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }) ?? "Pick a date"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="basis-full pl-5 md:basis-[70%] xl:basis-1/2">
              <Card className="h-full min-h-127.5 overflow-hidden border-border bg-card shadow-none">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-ring">
                    <Volume2 className="size-4" aria-hidden="true" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.18em]">Now playing</span>
                  </div>
                  <CardTitle className="mt-1">Music player</CardTitle>
                  <CardDescription>A focused playback control with real audio.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-hidden rounded-xl border border-border bg-muted/30">
                    <div
                      role="img"
                      aria-label="Singer performing on stage"
                      className="relative aspect-2/1 overflow-hidden bg-[#18201d] bg-cover bg-center opacity-90"
                      style={{
                        backgroundImage:
                          "url(https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=85)",
                      }}
                    >
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                      <p className="absolute bottom-4 left-4 text-xs font-medium uppercase tracking-[0.2em] text-white/80">Studio sessions · Vol. 01</p>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium">SoundHelix sample</p>
                          <p className="mt-1 text-sm text-muted-foreground">Instrumental demo track</p>
                        </div>
                        <Badge variant="outline">Ambient</Badge>
                      </div>

                      <audio
                        ref={audioRef}
                        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                        preload="none"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
                      />

                      <input
                        aria-label="Track progress"
                        type="range"
                        min={0}
                        max={duration || 1}
                        step={1}
                        value={currentTime}
                        onChange={(event) => {
                          const time = Number(event.target.value);
                          if (audioRef.current) audioRef.current.currentTime = time;
                          setCurrentTime(time);
                        }}
                        className="mt-5 h-1 w-full cursor-pointer accent-primary"
                      />
                      <div className="mt-1 flex justify-between text-[10px] tabular-nums text-muted-foreground">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>

                      <div className="mt-4 flex items-center justify-center gap-5">
                        <Button variant="ghost" size="icon" aria-label="Restart track" onClick={() => {
                          if (audioRef.current) audioRef.current.currentTime = 0;
                          setCurrentTime(0);
                        }}>
                          <SkipBack />
                        </Button>
                        <Button size="icon-lg" aria-label={isPlaying ? "Pause track" : "Play track"} onClick={togglePlayback}>
                          {isPlaying ? <Pause /> : <Play />}
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="Skip to end" onClick={() => {
                          if (audioRef.current && duration) audioRef.current.currentTime = duration;
                        }}>
                          <SkipForward />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>

            <CarouselItem className="basis-full pl-5 md:basis-[70%] xl:basis-1/2">
              <Card className="h-full min-h-127.5 border-border bg-card shadow-none">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-ring">
                    <MessageCircle className="size-4" aria-hidden="true" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.18em]">Conversation</span>
                  </div>
                  <CardTitle className="mt-1">Support chat</CardTitle>
                  <CardDescription>Send a message to try the chat interaction.</CardDescription>
                </CardHeader>
                <CardContent className="flex h-97.5 flex-col">
                  <MessageGroup className="min-h-0 flex-1 overflow-y-auto pr-2">
                    {chatMessages.map((item, index) => (
                      <Message key={`${item.from}-${index}`} align={item.from === "you" ? "end" : "start"}>
                        <MessageAvatar className="size-7 self-start bg-muted text-[10px] font-medium">
                          {item.from === "you" ? "RK" : "UI"}
                        </MessageAvatar>
                        <MessageContent className="max-w-[82%]">
                          <div className={`rounded-xl px-3 py-2.5 text-sm leading-5 ${item.from === "you" ? "bg-primary text-primary-foreground" : "bg-muted/70 text-foreground"}`}>
                            {item.text}
                          </div>
                        </MessageContent>
                      </Message>
                    ))}
                  </MessageGroup>

                  <form onSubmit={sendChatMessage} className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                    <Input
                      aria-label="Write a chat message"
                      value={chatMessage}
                      onChange={(event) => setChatMessage(event.target.value)}
                      placeholder="Write a message…"
                      className="bg-background"
                    />
                    <Button type="submit" size="icon" aria-label="Send message" disabled={!chatMessage.trim()}>
                      <Send />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <div className="mt-5 flex justify-center gap-2" aria-label="Choose a demo slide">
          {[0, 1, 2].map((slide) => (
            <button
              key={slide}
              type="button"
              aria-label={`Go to demo ${slide + 1}`}
              aria-current={activeSlide === slide ? "true" : undefined}
              onClick={() => carouselApi?.scrollTo(slide)}
              className={`h-1.5 rounded-full transition-all ${activeSlide === slide ? "w-7 bg-foreground" : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sectionTargets = heroSections.flatMap(({ href }) => {
      const anchor = document.getElementById(href.slice(1));
      const element = anchor?.closest("section") ?? anchor;
      return element ? [{ href, element }] : [];
    });

    let animationFrame = 0;
    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.4;
      let currentSection: string | null = null;

      for (const { href, element } of sectionTargets) {
        if (element.getBoundingClientRect().top > activationLine) break;
        currentSection = href;
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1
      ) {
        currentSection = heroSections[heroSections.length - 1].href;
      }

      setActiveSection(currentSection);
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main
      id="top"
      className="portfolio-page min-h-screen overflow-x-hidden bg-background text-foreground"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const target = event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-nav-section]")
          : null;
        const section = target?.dataset.navSection;
        if (section) setActiveSection(section);
      }}
    >
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header className="site-header relative z-20 border-b border-border">
        <div className="masthead mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-5 sm:px-8">
          <a
            href="#top"
            aria-label="Khasa Studio — home"
            className="masthead-brand text-base font-semibold"
          >
            [KHASA STUDIO]
          </a>

          <nav aria-label="Primary actions" className="flex items-center gap-2">
            <a
              href="https://github.com/khasa11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center gap-2 border border-border px-4 text-xs font-medium text-secondary-foreground transition-colors hover:border-ring/40 hover:bg-muted hover:text-foreground"
            >
              GitHub
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-10 items-center justify-center bg-primary px-4 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <nav
        aria-label="Page sections"
        className="hero-reveal fixed left-16 top-1/2 z-50 hidden w-auto -translate-y-1/2 2xl:block"
      >
        <p className="hero-kicker text-[10px] font-medium uppercase text-muted-foreground">
          Navigation
        </p>
        <ol className="mt-3 flex flex-col gap-3">
          {heroSections.map((item) => {
            const isActive = activeSection === item.href;

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`group flex items-center gap-2 text-xs transition-colors ${isActive ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <span
                    className={`font-mono text-[10px] transition-colors ${isActive ? "text-foreground" : "text-muted-foreground/60 group-hover:text-foreground"}`}
                  >
                    {item.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-px w-3 transition-colors ${isActive ? "bg-foreground" : "bg-transparent group-hover:bg-muted-foreground"}`}
                  />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <section
        id="main-content"
        data-nav-section="#main-content"
        aria-labelledby="hero-heading"
        tabIndex={-1}
        className="hero-section relative isolate flex min-h-[78svh] w-full flex-col justify-end pb-12 pt-28 sm:pb-16"
      >
        <HeroBackground />

        <div className="hero-copy relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start px-5 sm:px-8">
          <div>
            <p className="hero-reveal hero-kicker mb-6 text-[11px] font-medium uppercase text-muted-foreground">
              Frontend developer / Portfolio 2026
            </p>

            <h1
              id="hero-heading"
              className="hero-reveal hero-reveal-1 hero-title text-5xl font-semibold leading-[0.98] sm:text-7xl lg:text-8xl"
            >
              Frontend
              <br />
              <span>with intent.</span>
            </h1>

            <p className="hero-reveal hero-reveal-2 mt-7 max-w-lg text-[15px] leading-7 text-muted-foreground">
              I&apos;m Rishat Khasanov, a frontend developer focused on React and
              Next.js. I build responsive interfaces and work across the wider
              stack to bring products from design to delivery.
            </p>

            <div className="hero-reveal hero-reveal-3 mt-8 flex flex-wrap items-center gap-3">
              <a href="#work" className="pill-link pill-link-primary">
                View work
                <span aria-hidden="true">↗</span>
              </a>

              <a href="#contact" className="pill-link pill-link-secondary">
                Get in touch
              </a>
            </div>
          </div>

          <div className="hero-meta mt-12 grid w-full grid-cols-2 gap-4 border-t border-border pt-4 text-[10px] uppercase text-muted-foreground sm:grid-cols-4">
            <span>Based in Russia</span>
            <span>Available for select projects</span>
            <span>Frontend / UI engineering</span>
            <span className="sm:text-right">№ 001 — 2026</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <section
          data-nav-section="#stack-overview-heading"
          aria-labelledby="stack-overview-heading"
            className="border-b border-border py-20 md:py-24"
        >
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label">01 / Technologies I use</p>

              <h2
                id="stack-overview-heading"
                className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl"
              >
                Frontend is my focus. This is the wider toolkit I apply across projects.
              </h2>
            </div>
          </div>

          <div className="space-y-8">
            {stackCategories.map(({ name: category, items }) => (
              <div key={category}>
                <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {category}
                </h3>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {items.map(({ name, link, description, icon: Icon, color }) => (
                    <Tooltip key={name}>
                      <TooltipTrigger>
                        <div
                          className="flex items-center gap-3 rounded-2xl border border-border bg-card/80 p-4 transition-colors hover:border-ring/40"
                        >
                          <span
                            className="flex h-10 w-10 items-center justify-center rounded-xl"
                            style={{
                              color,
                              backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
                            }}
                          >
                            <Icon className="h-5 w-5" />
                          </span>

                          <span className="text-sm font-medium text-secondary-foreground">
                            {name}
                          </span>

                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${name} website`}
                            title={`Open ${name} website`}
                            className="ml-auto inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-border text-secondary-foreground transition-colors hover:border-ring/40 hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                          >
                            <ExternalLink className="size-4" aria-hidden="true" />
                          </a>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{description}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </section>

        <div id="about" className="scroll-mt-8">
          <section
            id="work"
            data-nav-section="#about"
            aria-labelledby="about-heading"
            className="border-t border-border py-20 md:py-24"
          >
          <p className="section-label">02 / About</p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h2
                id="about-heading"
                className="section-heading"
              >
                Frontend engineering
                <br />
                with a product mindset.
              </h2>

              <div className="body-copy mt-6 space-y-5">
                <p>
                  I focus on frontend engineering that makes complex
                  product flows easier to understand, easier to use,
                  and easier to trust.
                </p>

                <p>
                  My work sits at the intersection of design systems,
                  product thinking, and implementation — from reusable
                  components to the everyday interfaces people depend on.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="border-border bg-card text-card-foreground shadow-none">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <CardTitle>Current focus</CardTitle>

                    <Badge
                      variant="outline"
                      className="rounded-full border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-normal uppercase tracking-wider text-ring"
                    >
                      In development
                    </Badge>
                  </div>

                  <CardDescription>
                    Manufacturing platform with public and internal experiences.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {leadershipSignals.map((item) => (
                    <div key={item.title} className="rounded-xl border border-border bg-muted/30 p-4">
                      <h3 className="text-[15px] font-medium">{item.title}</h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { label: "Public website", value: "Brand + UX" },
                  { label: "Employee workspace", value: "Operations" },
                  { label: "Admin tools", value: "Controls" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {item.label}
                    </p>

                    <p className="mt-3 text-sm font-medium text-secondary-foreground">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </section>
        </div>

        <UIPlayground />

        <section
          id="contact"
          data-nav-section="#contact"
          aria-labelledby="contact-heading"
          className="scroll-mt-8 border-border py-20 md:py-24"
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