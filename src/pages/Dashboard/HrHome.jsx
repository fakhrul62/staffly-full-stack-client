import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle2,
  XCircle,
  CreditCard,
  Eye,
  Users,
  ShieldCheck,
  Clock,
} from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Select } from "../../components/ui/select";
import { Label } from "../../components/ui/label";
import { Dialog } from "../../components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const HrHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employees`);
      return res.data;
    },
  });

  const handleToggleVerified = async (id, currentStatus) => {
    const res = await axiosSecure.patch(`/users/${id}`, {
      isVerified: !currentStatus,
    });
    if (res.data.modifiedCount > 0) {
      refetch();
    }
  };

  const handlePayroll = async (e) => {
    e.preventDefault();
    if (!selectedEmployee) return;

    try {
      const { data: existingPayroll } = await axiosSecure.get(
        `/payrolls/check?employee_email=${selectedEmployee.email}&month=${month}&year=${year}`
      );
      if (existingPayroll.exists) {
        Swal.fire({
          title: "Already Requested",
          text: "Payroll for this month has already been requested.",
          icon: "error",
          confirmButtonColor: "#1d4ed8",
        });
        return;
      }

      const payroll = {
        month: parseInt(month, 10),
        year: parseInt(year, 10),
        employee: selectedEmployee,
        hr_email: user.email,
        payment_date: "",
        payment_status: "pending",
      };

      const res = await axiosSecure.post("/payrolls", payroll);
      if (res.data.insertedId) {
        setSelectedEmployee(null);
        setMonth("");
        setYear("");
        Swal.fire({
          title: "Request Sent",
          text: "Payroll request has been sent to Admin for approval.",
          icon: "success",
          confirmButtonColor: "#1d4ed8",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Request Failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#1d4ed8",
      });
    }
  };

  const verifiedCount = users.filter((u) => u.isVerified).length;
  const pendingCount = users.length - verifiedCount;
  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Badge variant="default" className="mb-3">
            HR Workspace
          </Badge>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, {user?.displayName || "HR Manager"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Verify employee profiles, inspect salary charts, and initiate
            monthly payroll requests.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="py-1 px-3 tabular-nums">
            <Users className="h-3.5 w-3.5" strokeWidth={1.75} />
            {users.length} Employees
          </Badge>
          <Badge variant="success" className="py-1 px-3 tabular-nums">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
            {verifiedCount} Verified
          </Badge>
          <Badge variant="warning" className="py-1 px-3 tabular-nums">
            <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
            {pendingCount} Pending
          </Badge>
        </div>
      </div>

      {/* Table Card */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16">No.</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead className="text-center">Verified</TableHead>
              <TableHead>Bank Account</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Users className="h-8 w-8" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-slate-600">
                      No employees registered yet
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              users.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium text-slate-400 tabular-nums">
                    {idx + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-slate-200">
                        <AvatarImage src={item.photoURL} alt={item.name} />
                        <AvatarFallback>
                          {(item.name || "E").slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {item.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleToggleVerified(item._id, item.isVerified)
                      }
                      title={
                        item.isVerified
                          ? "Verified (click to revoke)"
                          : "Unverified (click to verify)"
                      }
                      className={
                        item.isVerified
                          ? "h-9 w-9 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700"
                          : "h-9 w-9 rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600"
                      }
                    >
                      {item.isVerified ? (
                        <CheckCircle2 className="h-5 w-5" strokeWidth={1.75} />
                      ) : (
                        <XCircle className="h-5 w-5" strokeWidth={1.75} />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-600">
                    {item.bank || "—"}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900 tabular-nums">
                    ${Number(item.salary || 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        disabled={!item.isVerified}
                        onClick={() => setSelectedEmployee(item)}
                        className="h-8 px-3"
                      >
                        <CreditCard className="h-3.5 w-3.5" strokeWidth={1.75} />
                        Pay
                      </Button>
                      <Link to={`/dashboard/details/${item._id}`}>
                        <Button variant="outline" size="sm" className="h-8 px-3">
                          <Eye className="h-3.5 w-3.5" strokeWidth={1.75} />
                          Details
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Monthly Pay Request Dialog */}
      <Dialog
        open={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        title="Monthly Pay Request"
        description={
          selectedEmployee
            ? `Submit salary disbursement request for ${selectedEmployee.name} ($${Number(
                selectedEmployee.salary || 0
              ).toLocaleString()}).`
            : ""
        }
      >
        <form onSubmit={handlePayroll} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="pay-month">Month</Label>
              <Select
                id="pay-month"
                value={month}
                required
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="">Select month</option>
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pay-year">Year</Label>
              <Select
                id="pay-year"
                value={year}
                required
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Select year</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={currentYear + i}>
                    {currentYear + i}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectedEmployee(null)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <CreditCard className="h-4 w-4" strokeWidth={1.75} />
              Request Admin Pay
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default HrHome;
