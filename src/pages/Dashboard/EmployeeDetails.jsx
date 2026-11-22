import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft, Mail, Briefcase, DollarSign, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";

const EmployeeDetails = () => {
  const item = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const getMonthName = (month) => {
    return new Date(2026, month - 1).toLocaleString("en-US", { month: "short" });
  };

  const { data: myPay = [] } = useQuery({
    queryKey: ["myPay", item?.email, "paid"],
    enabled: !!item?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payrolls/${item.email}?status=paid`);
      return res.data;
    },
  });

  const transformedData = myPay.map((entry) => ({
    month: `${getMonthName(entry.month)} ${entry.year}`,
    salary: Number(entry.employee?.salary || 0),
  }));

  return (
    <div className="space-y-6">
      <div>
        <Link to="/dashboard/hr-home">
          <Button variant="ghost" size="sm" className="-ml-2 text-slate-600">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            Back to Employees
          </Button>
        </Link>
      </div>

      {/* Employee Profile Summary Card */}
      <Card className="p-6 bg-white border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-blue-100">
              <AvatarImage src={item?.photoURL} alt={item?.name} />
              <AvatarFallback className="text-lg font-bold">
                {(item?.name || "E").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">
                  {item?.name}
                </h1>
                <Badge variant={item?.isVerified ? "success" : "warning"}>
                  {item?.isVerified ? "Verified" : "Pending"}
                </Badge>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-slate-400" strokeWidth={1.75} />
                  {item?.designation || "Employee"}
                </span>
                {item?.email && (
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-slate-400" strokeWidth={1.75} />
                    {item.email}
                  </span>
                )}
              </div>
            </div>
          </div>

          {item?.salary && (
            <div className="rounded-xl bg-blue-50/80 border border-blue-100 px-4 py-3 text-left sm:text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                Monthly Salary
              </p>
              <p className="mt-0.5 font-display text-xl font-bold text-slate-900 tabular-nums inline-flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-blue-600" strokeWidth={2} />
                {Number(item.salary).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Salary History Chart Card */}
      <Card className="p-6 bg-white border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-lg font-semibold text-slate-900">
              Salary Payout History
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Completed monthly disbursements for {item?.name}
            </p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <BarChart3 className="h-4 w-4" strokeWidth={1.75} />
          </div>
        </div>

        {transformedData.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <BarChart3 className="h-8 w-8 mx-auto mb-2" strokeWidth={1.5} />
            <p className="text-sm font-medium text-slate-600">
              No paid salary records available yet
            </p>
          </div>
        ) : (
          <div className="h-[360px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={transformedData}
                margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v.toLocaleString()}`}
                />
                <Tooltip
                  cursor={{ fill: "#f1f5f9" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
                  }}
                  formatter={(value) => [
                    `$${Number(value).toLocaleString()}`,
                    "Salary",
                  ]}
                />
                <Bar
                  dataKey="salary"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={56}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EmployeeDetails;
