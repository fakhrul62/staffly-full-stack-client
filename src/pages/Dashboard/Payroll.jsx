import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, CheckCircle2, Clock, Download, Printer } from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { exportToCsv, logAuditEvent, printPayslip } from "../../lib/enterprise";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
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
  return new Date(2026, num - 1).toLocaleString("en-US", { month: "long" });
};

const Payroll = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payrolls = [], refetch } = useQuery({
    queryKey: ["payrolls"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payrolls`);
      return res.data;
    },
  });

  const handlePay = async (item) => {
    const date = new Date().toISOString().split("T")[0];
    try {
      const res = await axiosSecure.patch(`/payrolls/${item._id}`, {
        payment_date: date,
        payment_status: "paid",
      });
      if (res.status === 200) {
        logAuditEvent({
          actor: user?.displayName || user?.email,
          actorRole: "Admin",
          action: "PAYROLL_APPROVED",
          target: `${item.employee?.name} — ${getMonthName(item.month)} ${item.year}`,
          details: `Disbursed $${Number(item.employee?.salary || 0).toLocaleString()} on ${date}`,
          severity: "success",
        });
        refetch();
        Swal.fire({
          title: "Payment Approved",
          text: `Salary disbursed for ${item.employee?.name}.`,
          icon: "success",
          confirmButtonColor: "#1d4ed8",
        });
      }
    } catch (error) {
      console.error("Error updating payroll:", error);
      Swal.fire({
        title: "Payment failed",
        icon: "error",
        confirmButtonColor: "#1d4ed8",
      });
    }
  };

  const pendingCount = payrolls.filter(
    (p) => p.payment_status === "pending"
  ).length;
  const paidCount = payrolls.filter((p) => p.payment_status === "paid").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Badge variant="default" className="mb-3">
            Finance
          </Badge>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Payroll Approvals
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review monthly salary requests submitted by HR and issue payouts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="warning" className="py-1 px-3 tabular-nums">
            <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
            {pendingCount} Pending
          </Badge>
          <Badge variant="success" className="py-1 px-3 tabular-nums">
            <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.75} />
            {paidCount} Paid
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3"
            onClick={() =>
              exportToCsv(
                "staffly-payroll.csv",
                ["Employee", "Salary", "Month", "Year", "Payment Date", "Status"],
                payrolls.map((p) => [
                  p.employee?.name || "",
                  p.employee?.salary || 0,
                  getMonthName(p.month),
                  p.year,
                  p.payment_date || "Pending",
                  p.payment_status,
                ])
              )
            }
          >
            <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16">No.</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrolls.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <CreditCard className="h-8 w-8" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-slate-600">
                      No payroll requests yet
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              payrolls.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium text-slate-400 tabular-nums">
                    {idx + 1}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900">
                    {item.employee?.name}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900 tabular-nums">
                    ${Number(item.employee?.salary || 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-slate-600 tabular-nums">
                    {getMonthName(item.month)} {item.year}
                  </TableCell>
                  <TableCell className="text-slate-500 tabular-nums">
                    {item.payment_date || "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center justify-end gap-2">
                      {item.payment_status === "pending" ? (
                        <Button
                          onClick={() => handlePay(item)}
                          size="sm"
                          className="h-8 px-3.5"
                        >
                          <CreditCard className="h-3.5 w-3.5" strokeWidth={1.75} />
                          Pay Now
                        </Button>
                      ) : (
                        <Badge variant="success" className="py-1 px-2.5">
                          <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
                          Paid
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => printPayslip(item)}
                        title="Print / Save Payslip PDF"
                        aria-label="Print Payslip"
                        className="h-8 w-8 text-slate-500 hover:text-blue-600"
                      >
                        <Printer className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </Button>
                    </div>
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

export default Payroll;
