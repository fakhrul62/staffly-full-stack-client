import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  ClipboardList,
  CreditCard,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Clock,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const roleViews = [
  {
    id: "admin",
    label: "Admin Console",
    badge: "Executive Control",
    icon: ShieldCheck,
    headline: "Full organizational oversight & payroll sign-off",
    description:
      "Admins get a bird's-eye view of total headcount, HR leads, pending payroll approvals, and company-wide work hours—with one-click role promotion and account deactivation.",
    bullets: [
      "Promote verified staff to HR or manage active/inactive status",
      "Approve HR-submitted monthly payroll requests with instant payment dates",
      "Inspect company-wide workforce analytics and logged hours",
    ],
    previewTitle: "Workspace / Admin Dashboard",
    kpis: [
      { label: "Total Staff", value: "148", icon: Users },
      { label: "Pending Payrolls", value: "4", icon: Clock },
      { label: "Monthly Disbursed", value: "$285,000", icon: DollarSign },
    ],
    rows: [
      { col1: "Sarah Lin", col2: "Brand Manager", col3: "$80,000", status: "Paid", tone: "success" },
      { col1: "Marcus Vance", col2: "SEO Specialist", col3: "$65,000", status: "Pending", tone: "warning" },
      { col1: "Elena Rostova", col2: "PPC Manager", col3: "$72,500", status: "Paid", tone: "success" },
    ],
    columns: ["Employee", "Designation", "Salary", "Status"],
  },
  {
    id: "hr",
    label: "HR Manager",
    badge: "People Operations",
    icon: Users,
    headline: "Verify employees, track progress & trigger payroll",
    description:
      "HR teams onboard and verify new hires, inspect individual salary history charts, filter daily employee work logs, and submit verified monthly pay requests to Admin.",
    bullets: [
      "One-click employee verification before enabling salary payouts",
      "Submit monthly payroll requests with duplicate-month protection",
      "Filter team work sheets by employee and inspect salary bar charts",
    ],
    previewTitle: "Workspace / HR Dashboard",
    kpis: [
      { label: "Verified Staff", value: "136", icon: CheckCircle2 },
      { label: "Hours Logged", value: "1,420h", icon: TrendingUp },
      { label: "Pay Requests", value: "12", icon: CreditCard },
    ],
    rows: [
      { col1: "David Park", col2: "Verified", col3: "AJ675HG978", status: "Ready", tone: "success" },
      { col1: "Maya Patel", col2: "Pending", col3: "BK892LM410", status: "Review", tone: "warning" },
      { col1: "Liam Chen", col2: "Verified", col3: "CN441QP902", status: "Ready", tone: "success" },
    ],
    columns: ["Employee", "Verification", "Bank A/C", "Payroll"],
  },
  {
    id: "employee",
    label: "Employee Portal",
    badge: "Self-Service",
    icon: ClipboardList,
    headline: "Log daily work sheets & track every paycheck",
    description:
      "Employees log tasks and hours worked in seconds, edit or update entries anytime, and view a transparent timeline of every pending and completed salary disbursement.",
    bullets: [
      "Fast daily task logging by category, hours worked, and date",
      "Edit or delete work-sheet entries with instant table updates",
      "Transparent monthly payment history with disbursement dates",
    ],
    previewTitle: "Workspace / Work Sheet",
    kpis: [
      { label: "Tasks Logged", value: "24", icon: ClipboardList },
      { label: "Hours This Month", value: "164h", icon: Clock },
      { label: "Total Received", value: "$67,500", icon: BarChart3 },
    ],
    rows: [
      { col1: "Development", col2: "6 hrs", col3: "Nov 21, 2026", status: "Logged", tone: "default" },
      { col1: "Design", col2: "4 hrs", col3: "Nov 20, 2026", status: "Logged", tone: "default" },
      { col1: "Research", col2: "3 hrs", col3: "Nov 19, 2026", status: "Logged", tone: "default" },
    ],
    columns: ["Category", "Hours", "Date", "State"],
  },
];

const PlatformShowcase = () => {
  const [activeId, setActiveId] = useState("admin");
  const current = roleViews.find((r) => r.id === activeId) || roleViews[0];

  return (
    <section
      id="platform"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
    >
      {/* Header + Role Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <Badge variant="default" className="mb-4">
            Inside the Dashboard
          </Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            One Workspace, Three Purpose-Built Portals
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Every role signs into a dedicated dashboard tailored to their exact
            workflow—connecting daily task logging to HR verification and Admin
            payroll sign-off.
          </p>
        </div>

        {/* Interactive Role Tabs */}
        <div className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-xs self-start lg:self-end">
          {roleViews.map((role) => {
            const Icon = role.icon;
            const isActive = role.id === activeId;
            return (
              <Button
                key={role.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveId(role.id)}
                className="rounded-xl h-9 px-3.5"
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                {role.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Main Split Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Role Explanation Card */}
        <Card className="lg:col-span-5 p-7 sm:p-8 flex flex-col justify-between bg-white border-slate-200/80 shadow-sm">
          <div>
            <Badge variant="secondary" className="mb-4">
              {current.badge}
            </Badge>
            <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 leading-snug">
              {current.headline}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {current.description}
            </p>

            <ul className="mt-6 space-y-3.5">
              {current.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2.5 text-sm text-slate-700"
                >
                  <CheckCircle2
                    className="h-4 w-4 mt-0.5 shrink-0 text-blue-600"
                    strokeWidth={2}
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <Link to="/register">
              <Button className="group rounded-xl">
                Try {current.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="rounded-xl">
                Sign In
              </Button>
            </Link>
          </div>
        </Card>

        {/* Right: Live Interactive Dashboard Preview Frame */}
        <Card className="lg:col-span-7 overflow-hidden border-slate-200/90 bg-slate-950 p-3 sm:p-4 shadow-xl flex flex-col">
          {/* Browser Window Top Dots */}
          <div className="flex items-center justify-between px-2 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              app.staffly.io · {current.previewTitle}
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>

          {/* App Shell Preview */}
          <div className="flex-1 rounded-xl overflow-hidden bg-slate-50 border border-slate-800/60 flex min-h-[360px]">
            {/* Mini Dark Sidebar */}
            <div className="hidden sm:flex w-14 flex-col items-center justify-between bg-slate-950 py-4 border-r border-slate-800">
              <div className="space-y-2.5 flex flex-col items-center">
                <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  S
                </div>
                <div className="h-7 w-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <current.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                </div>
                <div className="h-7 w-7 rounded-lg text-slate-500 flex items-center justify-center">
                  <Users className="h-3.5 w-3.5" strokeWidth={1.75} />
                </div>
                <div className="h-7 w-7 rounded-lg text-slate-500 flex items-center justify-center">
                  <CreditCard className="h-3.5 w-3.5" strokeWidth={1.75} />
                </div>
                <div className="h-7 w-7 rounded-lg text-slate-500 flex items-center justify-center">
                  <BarChart3 className="h-3.5 w-3.5" strokeWidth={1.75} />
                </div>
              </div>
              <div className="h-7 w-7 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-semibold text-white flex items-center justify-center">
                FA
              </div>
            </div>

            {/* Preview Main Content */}
            <div className="flex-1 p-4 sm:p-5 space-y-4 overflow-hidden">
              {/* Top Breadcrumb */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                <span className="text-xs font-semibold text-slate-800">
                  {current.previewTitle}
                </span>
                <Badge variant="default" className="text-[10px] py-0 px-2">
                  Live Sync
                </Badge>
              </div>

              {/* Mini KPI Row */}
              <div className="grid grid-cols-3 gap-2.5">
                {current.kpis.map((kpi) => {
                  const Icon = kpi.icon;
                  return (
                    <div
                      key={kpi.label}
                      className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-medium text-slate-500 truncate">
                          {kpi.label}
                        </span>
                        <Icon
                          className="h-3.5 w-3.5 text-blue-600 shrink-0"
                          strokeWidth={1.75}
                        />
                      </div>
                      <p className="mt-1.5 font-display text-base sm:text-lg font-bold text-slate-900 tabular-nums">
                        {kpi.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Mini Table */}
              <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden">
                <div className="grid grid-cols-4 bg-slate-50/90 px-3.5 py-2 border-b border-slate-100 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  {current.columns.map((col, idx) => (
                    <span
                      key={col}
                      className={idx === 3 ? "text-right" : "text-left"}
                    >
                      {col}
                    </span>
                  ))}
                </div>
                <div className="divide-y divide-slate-100">
                  {current.rows.map((row) => (
                    <div
                      key={row.col1}
                      className="grid grid-cols-4 items-center px-3.5 py-2.5 text-xs hover:bg-slate-50/70 transition-colors"
                    >
                      <span className="font-semibold text-slate-900 truncate pr-2">
                        {row.col1}
                      </span>
                      <span className="text-slate-600 truncate pr-2">
                        {row.col2}
                      </span>
                      <span className="text-slate-600 tabular-nums truncate pr-2">
                        {row.col3}
                      </span>
                      <div className="text-right">
                        <Badge
                          variant={row.tone}
                          className="text-[10px] py-0 px-2"
                        >
                          {row.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default PlatformShowcase;
