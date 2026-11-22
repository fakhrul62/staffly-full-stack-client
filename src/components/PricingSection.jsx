import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ShieldCheck,
  Lock,
  Activity,
  FileCheck2,
  ArrowRight,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const trustPillars = [
  { icon: ShieldCheck, label: "Role-Based Access (RBAC)" },
  { icon: Lock, label: "JWT + Firebase Security" },
  { icon: FileCheck2, label: "Audit-Ready Payroll Trail" },
  { icon: Activity, label: "99.9% Uptime Architecture" },
];

const plans = [
  {
    name: "Growth",
    price: "$6",
    unit: "/ employee / mo",
    description:
      "Ideal for startups centralizing employee directories, daily work sheets, and monthly payroll.",
    featured: false,
    cta: "Start Free Trial",
    to: "/register",
    features: [
      "Up to 50 active employees",
      "Admin, HR & Employee portals",
      "Daily work-sheet & hour logging",
      "Printable PDF payslips & CSV export",
    ],
  },
  {
    name: "Scale",
    price: "$12",
    unit: "/ employee / mo",
    description:
      "Built for fast-growing teams needing HR verification workflows, leave approvals, and live analytics.",
    featured: true,
    cta: "Get Started with Scale",
    to: "/register",
    features: [
      "Unlimited employees & HR managers",
      "Leave / PTO request & approval workflow",
      "Workforce analytics & salary charts",
      "Immutable audit logs & compliance trail",
      "Priority onboarding support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "annual SLA",
    description:
      "Tailored multi-entity governance, dedicated infrastructure, and custom ERP/SSO integrations.",
    featured: false,
    cta: "Contact Sales",
    to: "/contact",
    features: [
      "Multi-department & multi-company workspaces",
      "Custom SSO (SAML / OIDC) & IP allowlists",
      "Dedicated account & security engineer",
      "Custom payroll & accounting webhooks",
    ],
  },
];

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="w-full px-4 sm:px-6 lg:px-10 py-16 md:py-24"
    >
      {/* Enterprise Compliance Trust Strip */}
      <div className="mb-16 rounded-2xl border border-slate-200/80 bg-white px-6 py-5 shadow-2xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.label}
                className="flex items-center justify-center sm:justify-start gap-2.5 text-sm font-medium text-slate-700"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <span>{pillar.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
        <Badge variant="default" className="mb-4">
          Transparent Pricing
        </Badge>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Plans Built to Scale With Your Team
        </h2>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Start with your core team today and upgrade seamlessly as your HR,
          payroll, and compliance needs grow.
        </p>
      </div>

      {/* 3-Column Pricing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative h-full flex flex-col justify-between p-7 transition-all duration-300 hover:-translate-y-1 ${
              plan.featured
                ? "border-blue-600 bg-slate-950 text-white shadow-xl shadow-blue-950/15"
                : "border-slate-200/80 bg-white text-slate-900 hover:border-blue-300 hover:shadow-lg"
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3
                  className={`font-display text-xl font-bold ${
                    plan.featured ? "text-white" : "text-slate-900"
                  }`}
                >
                  {plan.name}
                </h3>
                {plan.featured && (
                  <Badge variant="dark" className="bg-blue-600 border-blue-500">
                    Most Popular
                  </Badge>
                )}
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-bold tracking-tight tabular-nums">
                  {plan.price}
                </span>
                <span
                  className={`text-xs font-medium ${
                    plan.featured ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {plan.unit}
                </span>
              </div>

              <p
                className={`mt-3 text-sm leading-relaxed ${
                  plan.featured ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {plan.description}
              </p>

              <ul className="mt-6 pt-6 border-t border-slate-200/20 space-y-3">
                {plan.features.map((feat) => (
                  <li
                    key={feat}
                    className={`flex items-start gap-2.5 text-sm ${
                      plan.featured ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    <CheckCircle2
                      className={`h-4 w-4 mt-0.5 shrink-0 ${
                        plan.featured ? "text-emerald-400" : "text-blue-600"
                      }`}
                      strokeWidth={2}
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Link to={plan.to}>
                <Button
                  variant={plan.featured ? "default" : "outline"}
                  size="xl"
                  className={`w-full rounded-xl group ${
                    plan.featured
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : ""
                  }`}
                >
                  {plan.cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
