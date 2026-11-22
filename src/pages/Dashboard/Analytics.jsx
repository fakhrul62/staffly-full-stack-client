import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart3,
  Clock,
  DollarSign,
  Users,
  CheckCircle2,
  Briefcase,
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const getShortMonth = (month) => {
  const num = Number(month);
  if (!num || num < 1 || num > 12) return String(month);
  return new Date(2026, num - 1).toLocaleString("en-US", { month: "short" });
};

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allUsers = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  const { data: payrolls = [] } = useQuery({
    queryKey: ["payrolls"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payrolls");
      return res.data;
    },
  });

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tasks");
      return res.data;
    },
  });

  // Aggregate payroll by period
  const payrollByPeriodMap = {};
  payrolls.forEach((p) => {
    const key = `${getShortMonth(p.month)} ${p.year}`;
    payrollByPeriodMap[key] =
      (payrollByPeriodMap[key] || 0) + Number(p.employee?.salary || 0);
  });
  const payrollChartData = Object.entries(payrollByPeriodMap).map(
    ([period, amount]) => ({ period, amount })
  );

  // Aggregate hours by task category
  const hoursByCategoryMap = {};
  tasks.forEach((t) => {
    const cat = t.task || "Other";
    hoursByCategoryMap[cat] =
      (hoursByCategoryMap[cat] || 0) + Number(t.hour || 0);
  });
  const hoursChartData = Object.entries(hoursByCategoryMap)
    .map(([category, hours]) => ({ category, hours }))
    .sort((a, b) => b.hours - a.hours);

  const totalHours = tasks.reduce((s, t) => s + Number(t.hour || 0), 0);
  const totalPayroll = payrolls.reduce(
    (s, p) => s + Number(p.employee?.salary || 0),
    0
  );
  const verifiedUsers = allUsers.filter((u) => u.isVerified).length;
  const activeUsers = allUsers.filter((u) => u.workStatus !== "inactive").length;
  const verifiedRate = allUsers.length
    ? Math.round((verifiedUsers / allUsers.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Badge variant="default" className="mb-3">
          Insights
        </Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Workforce Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Live breakdown of payroll spend, logged task hours, and workforce
          verification metrics.
        </p>
      </div>

      {/* Top KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-white border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Payroll Volume
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <DollarSign className="h-4 w-4" strokeWidth={1.75} />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-slate-900 tabular-nums">
            ${totalPayroll.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Across {payrolls.length} payroll records
          </p>
        </Card>

        <Card className="p-5 bg-white border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Hours Logged
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock className="h-4 w-4" strokeWidth={1.75} />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {totalHours} hrs
          </p>
          <p className="mt-1 text-xs text-slate-500">
            From {tasks.length} work sheet entries
          </p>
        </Card>

        <Card className="p-5 bg-white border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Verification Rate
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {verifiedRate}%
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {verifiedUsers} of {allUsers.length} staff verified
          </p>
        </Card>

        <Card className="p-5 bg-white border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active Headcount
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users className="h-4 w-4" strokeWidth={1.75} />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {activeUsers}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {allUsers.length - activeUsers} inactive / offboarded
          </p>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payroll by Period */}
        <Card className="p-6 bg-white border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-slate-900">
                Payroll Volume by Period
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Monthly salary totals across all requested periods
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BarChart3 className="h-4 w-4" strokeWidth={1.75} />
            </div>
          </div>

          {payrollChartData.length === 0 ? (
            <div className="h-[280px] flex items-center justify-center text-sm text-slate-400">
              No payroll data available yet
            </div>
          ) : (
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={payrollChartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    cursor={{ fill: "#f1f5f9" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                    formatter={(v) => [`$${Number(v).toLocaleString()}`, "Payroll"]}
                  />
                  <Bar
                    dataKey="amount"
                    fill="#2563eb"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        {/* Hours by Category */}
        <Card className="p-6 bg-white border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-slate-900">
                Hours by Task Category
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Distribution of logged employee work hours
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Briefcase className="h-4 w-4" strokeWidth={1.75} />
            </div>
          </div>

          {hoursChartData.length === 0 ? (
            <div className="h-[280px] flex items-center justify-center text-sm text-slate-400">
              No work logs recorded yet
            </div>
          ) : (
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hoursChartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="category"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "#f1f5f9" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                    formatter={(v) => [`${v} hrs`, "Logged"]}
                  />
                  <Bar
                    dataKey="hours"
                    fill="#0f172a"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
