"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
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
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import AnimatedGradient from "@/components/ui/animated-gradient";
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

const navigation = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Playground", href: "#playground" },
  { label: "Contact", href: "#contact" },
];

const primaryStack: Array<{ name: string; link: string; icon: React.ComponentType<{ className?: string }> }> = [
  { name: "Node.js", link: "https://nodejs.org", icon: SiNodedotjs },
  { name: "React", link: "https://reactjs.org", icon: SiReact },
  { name: "Next.js", link: "https://nextjs.org", icon: SiNextdotjs },
  { name: "TypeScript", link: "https://typescriptlang.org", icon: SiTypescript },
  { name: "JavaScript", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: SiJavascript },
  { name: "Tailwind CSS", link: "https://tailwindcss.com", icon: SiTailwindcss },
  { name: "shadcn/ui", link: "https://ui.shadcn.com", icon: SiShadcnui },
  { name: "HTML", link: "https://developer.mozilla.org/en-US/docs/Web/HTML", icon: SiHtml5 },
  { name: "CSS", link: "https://developer.mozilla.org/en-US/docs/Web/CSS", icon: SiCss },
  { name: "Git", link: "https://git-scm.com", icon: SiGit },
  { name: "GitHub", link: "https://github.com", icon: SiGithub },
  { name: "Figma", link: "https://figma.com", icon: SiFigma },
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
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <AnimatedGradient
        config={{ preset: "Prism", speed: 30 }}
        noise={{ opacity: 0.18, scale: 1.2 }}
        style={{
          filter: "saturate(1.35) contrast(1.1) brightness(1.05)",
        }}
      />

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
              <Card className="h-full min-h-[510px] overflow-hidden border-border bg-card shadow-none">
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
              <Card className="h-full min-h-[510px] overflow-hidden border-border bg-card shadow-none">
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
                      className="relative aspect-[2/1] overflow-hidden bg-[#18201d] bg-cover bg-center opacity-90"
                      style={{
                        backgroundImage:
                          "url(https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=85)",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
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
              <Card className="h-full min-h-[510px] border-border bg-card shadow-none">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-ring">
                    <MessageCircle className="size-4" aria-hidden="true" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.18em]">Conversation</span>
                  </div>
                  <CardTitle className="mt-1">Support chat</CardTitle>
                  <CardDescription>Send a message to try the chat interaction.</CardDescription>
                </CardHeader>
                <CardContent className="flex h-[390px] flex-col">
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

      <header className="absolute inset-x-0 top-0 z-20 border-b border-border bg-background/35 backdrop-blur-md">
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
        className="relative isolate flex min-h-svh w-full flex-col items-center justify-center px-5 py-24 text-center sm:px-8"
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
        <section
          aria-labelledby="stack-overview-heading"
          className="border-y border-border py-12 md:py-16"
        >
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label">01 / My stack</p>

              <h2
                id="stack-overview-heading"
                className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl"
              >
                Core stack I use to build interfaces.
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {primaryStack.map(({ name, link, icon: Icon }) => (
              <div
                key={name}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card/80 p-4 transition-colors hover:border-ring/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-ring">
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
            ))}
          </div>

          <div className="mt-8">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Additional
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Expo",
                "Three.js",
                "UX/UI",
                "API",
                "DeepSeek",
                "ChatGPT",
                "Perplexity",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-sm text-secondary-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div id="about" className="scroll-mt-8">
          <section
            id="work"
            aria-labelledby="about-heading"
            className="border-t border-border py-24 lg:py-32"
          >
          <p className="section-label">02 / About</p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h2
                id="about-heading"
                className="section-heading"
              >
                I build interfaces
                <br />
                for teams that need clarity.
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