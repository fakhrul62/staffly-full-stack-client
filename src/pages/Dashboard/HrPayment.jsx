import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, CheckCircle2, Clock } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Card } from "../../components/ui/card";
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

const HrPayment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["hrPayHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payrolls/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="default" className="mb-3">
          Compensation
        </Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          My Payments
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View your monthly salary disbursements and payout status.
        </p>
      </div>

      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16">No.</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <CreditCard className="h-8 w-8" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-slate-600">
                      No payment records yet
                    </p>
                    <p className="text-xs text-slate-400">
                      Completed and pending salary payouts will appear here.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              payments.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium text-slate-400 tabular-nums">
                    {idx + 1}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900 tabular-nums">
                    {getMonthName(item.month)} {item.year}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900 tabular-nums">
                    ${Number(item.employee?.salary || 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-slate-500 tabular-nums">
                    {item.payment_date || "—"}
                  </TableCell>
                  <TableCell className="text-right">
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

export default HrPayment;
