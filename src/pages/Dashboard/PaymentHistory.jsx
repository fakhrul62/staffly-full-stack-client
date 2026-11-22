import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Receipt, CheckCircle2, Clock, Printer } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { printPayslip } from "../../lib/enterprise";
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

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payHistory = [] } = useQuery({
    queryKey: ["payHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payrolls/${user.email}`);
      return res.data;
    },
  });

  const totalEarned = payHistory
    .filter((p) => p.payment_status === "paid")
    .reduce((sum, p) => sum + Number(p.employee?.salary || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Badge variant="default" className="mb-3">
            Compensation
          </Badge>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Payment History
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track your monthly salary payouts and disbursement dates.
          </p>
        </div>

        <Badge variant="success" className="py-1.5 px-3.5 tabular-nums self-start sm:self-end">
          Total Received: ${totalEarned.toLocaleString()}
        </Badge>
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
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payHistory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Receipt className="h-8 w-8" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-slate-600">
                      No payment records yet
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              payHistory.map((item, idx) => (
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
                        <Badge variant="warning">
                          <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
                          Pending
                        </Badge>
                      ) : (
                        <Badge variant="success">
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

export default PaymentHistory;
