import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Activity,
  Users,
} from "lucide-react";
import heroAnimation from "../assets/lottie/hero-img.json";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

const slides = [
  {
    eyebrow: "Employee Management & Payroll Platform",
    title: "One Workspace for Staff, Work Sheets & Payroll",
    description:
      "Connect daily employee task tracking, HR verification, and Admin payroll approvals in one role-based platform built for growing teams.",
    image: "https://i.ibb.co.com/6tJR67L/hero02-img01.jpg",
    ctaLabel: "Tour the Dashboard",
    ctaHref: "#platform",
  },
  {
    eyebrow: "Admin · HR · Employee Portals",
    title: "Role-Based Dashboards Built for Operational Clarity",
    description:
      "Give every team member the exact tools they need—from daily hour logs and verification workflows to live workforce analytics and payout history.",
    image: "https://i.ibb.co.com/wyfxL94/hero02-img02.jpg",
    ctaLabel: "Create Workspace",
    ctaHref: "/register",
  },
];

const teamAvatars = [
  { initials: "JD", bg: "bg-blue-600 text-white" },
  { initials: "SL", bg: "bg-slate-800 text-white" },
  { initials: "MT", bg: "bg-emerald-600 text-white" },
  { initials: "LR", bg: "bg-sky-600 text-white" },
  { initials: "DP", bg: "bg-indigo-600 text-white" },
];

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Main Hero Carousel (8 columns) */}
        <div
          className="lg:col-span-8 relative h-[480px] sm:h-[520px] lg:h-[560px] rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-950 shadow-sm group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {slides.map((slide, index) => {
            const isActive = index === activeSlide;
            return (
              <div
                key={slide.title}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  isActive
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out scale-[1.02] group-hover:scale-105"
                />
                {/* Scrim for crisp contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/25" />

                {/* Slide Content */}
                <div className="relative z-10 flex h-full flex-col justify-center px-7 sm:px-12 lg:px-14 pb-10 max-w-2xl">
                  <div className="mb-5">
                    <Badge variant="dark" className="py-1.5 pl-1.5 pr-3.5">
                      <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-slate-900">
                        Staffly
                      </span>
                      <span className="text-[11px] font-medium uppercase tracking-wider text-slate-100">
                        {slide.eyebrow}
                      </span>
                    </Badge>
                  </div>

                  <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.08] tracking-tight text-white">
                    {slide.title}
                  </h1>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-200/90 max-w-xl">
                    {slide.description}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {slide.ctaHref.startsWith("#") ? (
                      <a href={slide.ctaHref}>
                        <Button
                          size="xl"
                          className="group/btn rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
                        >
                          {slide.ctaLabel}
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                            strokeWidth={2}
                          />
                        </Button>
                      </a>
                    ) : (
                      <Link to={slide.ctaHref}>
                        <Button
                          size="xl"
                          className="group/btn rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
                        >
                          {slide.ctaLabel}
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                            strokeWidth={2}
                          />
                        </Button>
                      </Link>
                    )}

                    <Link to="/contact">
                      <Button
                        variant="ghost"
                        size="xl"
                        className="rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                      >
                        Contact Sales
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom Controls Bar */}
          <div className="absolute bottom-5 left-7 right-7 sm:left-12 sm:right-12 lg:left-14 lg:right-14 z-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeSlide
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Previous slide"
                onClick={handlePrev}
                className="h-9 w-9 rounded-full border border-white/20 bg-slate-950/40 text-white backdrop-blur-md hover:bg-white hover:text-slate-900"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Next slide"
                onClick={handleNext}
                className="h-9 w-9 rounded-full border border-white/20 bg-slate-950/40 text-white backdrop-blur-md hover:bg-white hover:text-slate-900"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={2} />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Asymmetric Stack (4 columns, height-matched to 560px on lg) */}
        <div className="lg:col-span-4 flex flex-col gap-5 lg:h-[560px]">
          {/* Growth & Team Card */}
          <Card className="p-6 flex flex-col justify-between bg-gradient-to-br from-blue-50/90 via-white to-white border-blue-100/90 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <TrendingUp className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <Badge variant="success" className="tabular-nums">
                +34% YoY
              </Badge>
            </div>

            <div className="mt-5">
              <h2 className="font-display text-lg font-semibold leading-snug tracking-tight text-slate-900">
                Business Growth &amp; Workforce Insights
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                Track hiring velocity, retention, and team output in real time.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex -space-x-2.5">
                {teamAvatars.map((avatar) => (
                  <Avatar
                    key={avatar.initials}
                    className="h-8 w-8 ring-2 ring-white transition-transform duration-200 hover:-translate-y-0.5 hover:z-10"
                  >
                    <AvatarFallback className={avatar.bg}>
                      {avatar.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                <Users className="h-3.5 w-3.5 text-blue-600" strokeWidth={1.75} />
                <span className="tabular-nums">2,400+ teams</span>
              </div>
            </div>
          </Card>

          {/* Animated Operations Visual Card */}
          <Card className="flex-1 min-h-[240px] p-5 flex flex-col justify-between overflow-hidden bg-white hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 relative">
            <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Live HR Operations
                </span>
              </div>
              <Activity className="h-4 w-4 text-slate-400" strokeWidth={1.75} />
            </div>

            <div className="relative z-10 flex-1 flex items-center justify-center py-2">
              <Lottie
                animationData={heroAnimation}
                loop={true}
                className="w-full max-w-[220px] max-h-[195px]"
              />
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>Automated sync enabled</span>
              <span className="font-medium text-slate-700 tabular-nums">
                99.9% uptime
              </span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Banner;
