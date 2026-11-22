import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const highlights = [
  "Role-Based Access (Admin / HR / Staff)",
  "Verified Employee Onboarding",
  "Automated Payroll Request Queue",
  "Real-Time Work Sheet Tracking",
  "JWT & Firebase Auth Protection",
  "Live Payout & Hours Analytics",
];

const AboutUs = () => {
  return (
    <section
      id="about"
      className="w-full px-4 sm:px-6 lg:px-10 py-8 md:py-12"
    >
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800/80 px-6 py-12 sm:px-10 md:p-14 lg:p-16 shadow-xl">
        {/* Subtle ambient edge highlight */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div>
              <Badge variant="dark" className="mb-5">
                Platform Architecture
              </Badge>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.12] tracking-tight text-white">
              Every Role. One Source of Truth.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-slate-300 max-w-xl">
              Staffly replaces scattered spreadsheets and disconnected payroll
              emails with a single structured workflow. Employees log hours, HR
              verifies records and submits pay cycles, and Admins approve
              disbursements with complete visibility.
            </p>

            {/* 2-Column Aligned Checklist */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-sm font-medium text-slate-200 group"
                >
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-emerald-400 transition-transform duration-200 group-hover:scale-110"
                    strokeWidth={1.75}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/register">
                <Button
                  variant="light"
                  size="xl"
                  className="group/cta rounded-xl font-semibold"
                >
                  Create Workspace
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1"
                    strokeWidth={2}
                  />
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="ghost"
                  size="xl"
                  className="rounded-xl text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="https://i.ibb.co.com/KmgDhk0/pexels-mikhail-nilov-7731366.jpg"
                alt="Staffly HR operations team"
                className="h-[360px] sm:h-[440px] lg:h-[480px] w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

              {/* Bottom-left Floating Trust Pill */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto flex items-center gap-3 rounded-xl border border-white/15 bg-slate-950/75 px-4 py-3 backdrop-blur-md">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                  <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">
                    End-to-End Payroll Governance
                  </p>
                  <p className="text-[11px] text-slate-300">
                    HR verification → Admin approval → Employee receipt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
