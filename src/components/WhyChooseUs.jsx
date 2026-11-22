import React from "react";
import { ShieldCheck, Workflow, BarChart3 } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const reasons = [
  {
    icon: ShieldCheck,
    metric: "RBAC + JWT",
    title: "Role-Scoped Security",
    description:
      "Every API route and dashboard screen is gated by role—keeping salary records, HR verifications, and admin approvals strictly separated.",
  },
  {
    icon: Workflow,
    metric: "HR → Admin",
    title: "Zero-Friction Payroll Flow",
    description:
      "Eliminate duplicate payouts with built-in month/year validation, HR verification checks, and one-click Admin disbursement tracking.",
  },
  {
    icon: BarChart3,
    metric: "Live Metrics",
    title: "Instant Workforce Visibility",
    description:
      "Track logged hours by task category, review employee salary history charts, and monitor team output from a single analytics console.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 pt-8 pb-20 md:pb-24">
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
        <Badge variant="default" className="mb-4">
          Why Staffly
        </Badge>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Built for Clarity, Governance &amp; Speed
        </h2>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Everything growing organizations need to run employee operations
          without spreadsheet chaos.
        </p>
      </div>

      {/* 3-Column Aligned Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {reasons.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="group relative h-full flex flex-col justify-between overflow-hidden p-7 bg-white border-slate-200/80 hover:border-blue-300/90 hover:shadow-lg hover:shadow-blue-950/[0.04] hover:-translate-y-1"
            >
              {/* Top Accent Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600/85 transition-all duration-300 group-hover:h-1.5 group-hover:bg-blue-600" />

              <div>
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50/80 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <Badge variant="secondary" className="tabular-nums">
                    {item.metric}
                  </Badge>
                </div>

                <h3 className="font-display text-xl font-semibold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUs;
