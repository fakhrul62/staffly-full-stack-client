import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  ShieldCheck,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const services = [
  {
    icon: LayoutDashboard,
    title: "Role-Based Dashboards",
    description:
      "Dedicated workspaces for Admins, HR Managers, and Employees—each with scoped permissions and live KPIs.",
    tag: "Admin · HR · Staff",
  },
  {
    icon: ShieldCheck,
    title: "HR Verification & Directory",
    description:
      "Verify new hires, manage bank account details, promote employees to HR, and control active access.",
    tag: "Onboarding",
  },
  {
    icon: ClipboardList,
    title: "Work Sheets & Progress",
    description:
      "Employees log daily tasks and hours worked while HR and Admins filter team productivity in real time.",
    tag: "Time Tracking",
  },
  {
    icon: CreditCard,
    title: "Payroll Request & Approval",
    description:
      "HR initiates monthly pay requests for verified staff; Admins approve payouts with full salary history charts.",
    tag: "Payroll Flow",
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
    >
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
        <Badge variant="default" className="mb-4">
          Platform Modules
        </Badge>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          What Staffly Actually Runs
        </h2>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          From day-one onboarding and daily task sheets to HR verification and
          monthly salary approvals—everything runs inside one connected system.
        </p>
      </div>

      {/* 4-Column Equal-Height Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card
              key={service.title}
              className="group h-full flex flex-col justify-between p-6 bg-white border-slate-200/80 hover:border-blue-300/90 hover:shadow-lg hover:shadow-blue-950/[0.04] hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50/80 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:scale-105">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors">
                    {service.tag}
                  </span>
                </div>

                <h3 className="font-display text-lg font-semibold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href="#platform"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors"
                >
                  See it in the dashboard
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </a>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
