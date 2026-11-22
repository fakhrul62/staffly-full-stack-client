import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  ShieldCheck,
  Clock,
  DollarSign,
  ArrowUpRight,
  CreditCard,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";

const getMonthName = (month) => {
  const num = Number(month);
  if (!num || num < 1 || num > 12) return month;
  return new Date(2026, num - 1).toLocaleString("en-US", { month: "short" });
};

const AdminHome = () => {
  const { user } = useAuth();
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

  const activeUsers = allUsers.filter((u) => u.workStatus !== "inactive");
  const hrCount = allUsers.filter((u) => u.role === "hr").length;
  const pendingPayrolls = payrolls.filter(
    (p) => p.payment_status === "pending"
  );
  const totalPaid = payrolls
    .filter((p) => p.payment_status === "paid")
    .reduce((sum, p) => sum + Number(p.employee?.salary || 0), 0);

  const recentPayrolls = [...payrolls].reverse().slice(0, 5);

  const stats = [
    {
      label: "Total Staff",
      value: allUsers.length,
      sub: `${activeUsers.length} active accounts`,
      icon: Users,
    },
    {
      label: "HR Managers",
      value: hrCount,
      sub: "Verified HR leads",
      icon: ShieldCheck,
    },
    {
      label: "Pending Payrolls",
      value: pendingPayrolls.length,
      sub: "Awaiting approval",
      icon: Clock,
    },
    {
      label: "Total Disbursed",
      value: `$${totalPaid.toLocaleString()}`,
      sub: "Completed payouts",
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Badge variant="default" className="mb-3">
            Admin Overview
          </Badge>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, {user?.displayName || "Admin"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor workforce status, manage roles, and approve monthly payroll.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link to="/dashboard/analytics">
            <Button variant="outline" size="sm" className="h-9 px-3.5">
              <BarChart3 className="h-4 w-4" strokeWidth={1.75} />
              Analytics
            </Button>
          </Link>
          <Link to="/dashboard/payroll">
            <Button size="sm" className="h-9 px-3.5">
              <CreditCard className="h-4 w-4" strokeWidth={1.75} />
              Review Payroll
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="p-5 bg-white border-slate-200/80 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </p>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
              </div>
              <p className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{stat.sub}</p>
            </Card>
          );
        })}
      </div>

      {/* Recent Payroll Activity Table */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="font-display text-base font-semibold text-slate-900">
              Recent Payroll Requests
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest salary disbursement activity across the team
            </p>
          </div>
          <Link
            to="/dashboard/payroll"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Employee</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPayrolls.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-10 text-center text-sm text-slate-400"
                >
                  No payroll requests submitted yet.
                </TableCell>
              </TableRow>
            ) : (
              recentPayrolls.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="font-semibold text-slate-900">
                    {item.employee?.name}
                  </TableCell>
                  <TableCell className="text-slate-600 tabular-nums">
                    {getMonthName(item.month)} {item.year}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900 tabular-nums">
                    ${Number(item.employee?.salary || 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.payment_status === "pending" ? (
                      <Badge variant="warning">
                        <Clock className="h-3 w-3" strokeWidth={2} />
                        Pending
                      </Badge>
                    ) : (
                      <Badge variant="success">
                        <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
                        Paid
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AdminHome;
