import React, { useState } from "react";
import {
  CalendarDays,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Plane,
} from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import {
  getLeaveRequests,
  saveLeaveRequests,
  logAuditEvent,
} from "../../lib/enterprise";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Select } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Dialog } from "../../components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";

const Leaves = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const isManager = role?.admin || role?.hr;

  const [leaves, setLeaves] = useState(() => getLeaveRequests());
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    type: "Annual Leave",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const diffDays = Math.max(
      1,
      Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1
    );

    const newLeave = {
      id: `lv-${Date.now()}`,
      employeeName: user?.displayName || "Team Member",
      employeeEmail: user?.email || "",
      type: form.type,
      startDate: form.startDate,
      endDate: form.endDate,
      days: Number.isNaN(diffDays) ? 1 : diffDays,
      reason: form.reason,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const updated = [newLeave, ...leaves];
    setLeaves(updated);
    saveLeaveRequests(updated);

    logAuditEvent({
      actor: user?.displayName || user?.email,
      actorRole: role?.admin ? "Admin" : role?.hr ? "HR" : "Employee",
      action: "LEAVE_REQUESTED",
      target: `${form.type} (${newLeave.days}d)`,
      details: `${form.startDate} to ${form.endDate}`,
      severity: "info",
    });

    setForm({ type: "Annual Leave", startDate: "", endDate: "", reason: "" });
    setModalOpen(false);

    Swal.fire({
      title: "Leave Request Submitted",
      text: "Your manager has been notified for review.",
      icon: "success",
      confirmButtonColor: "#1d4ed8",
    });
  };

  const handleDecision = (id, status, empName, type) => {
    const updated = leaves.map((lv) =>
      lv.id === id ? { ...lv, status } : lv
    );
    setLeaves(updated);
    saveLeaveRequests(updated);

    logAuditEvent({
      actor: user?.displayName || user?.email,
      actorRole: role?.admin ? "Admin" : "HR",
      action: status === "approved" ? "LEAVE_APPROVED" : "LEAVE_REJECTED",
      target: `${empName} — ${type}`,
      details: `Leave request marked as ${status}`,
      severity: status === "approved" ? "success" : "warning",
    });
  };

  const scopedLeaves = isManager
    ? leaves
    : leaves.filter(
        (lv) =>
          !lv.employeeEmail ||
          lv.employeeEmail === user?.email ||
          lv.employeeName === user?.displayName
      );

  const visibleLeaves =
    filter === "all"
      ? scopedLeaves
      : scopedLeaves.filter((lv) => lv.status === filter);

  const pendingCount = scopedLeaves.filter((l) => l.status === "pending").length;
  const approvedDays = scopedLeaves
    .filter((l) => l.status === "approved")
    .reduce((sum, l) => sum + Number(l.days || 1), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Badge variant="default" className="mb-3">
            Time Off &amp; PTO
          </Badge>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Leave Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {isManager
              ? "Review, approve, or decline employee time-off and remote work requests."
              : "Submit time-off requests and track your annual PTO balance."}
          </p>
        </div>

        <Button onClick={() => setModalOpen(true)} className="rounded-xl">
          <Plus className="h-4 w-4" strokeWidth={2} />
          Request Leave
        </Button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 bg-white border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pending Requests
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock className="h-4 w-4" strokeWidth={1.75} />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {pendingCount}
          </p>
          <p className="mt-1 text-xs text-slate-500">Awaiting review</p>
        </Card>

        <Card className="p-5 bg-white border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Approved Days
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {approvedDays} days
          </p>
          <p className="mt-1 text-xs text-slate-500">Scheduled time off</p>
        </Card>

        <Card className="p-5 bg-white border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Annual Allowance
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Plane className="h-4 w-4" strokeWidth={1.75} />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {Math.max(0, 15 - approvedDays)} / 15
          </p>
          <p className="mt-1 text-xs text-slate-500">Days remaining</p>
        </Card>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {["all", "pending", "approved", "rejected"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(status)}
            className="capitalize rounded-lg"
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Leaves Table */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Employee</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right">Status / Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleLeaves.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <CalendarDays className="h-8 w-8" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-slate-600">
                      No leave requests found
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              visibleLeaves.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <p className="font-semibold text-slate-900">
                      {item.employeeName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {item.employeeEmail}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.type}</Badge>
                  </TableCell>
                  <TableCell className="text-slate-600 tabular-nums text-xs">
                    {item.startDate} → {item.endDate}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900 tabular-nums">
                    {item.days}d
                  </TableCell>
                  <TableCell className="text-slate-600 max-w-[220px] truncate">
                    {item.reason}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.status === "pending" && isManager ? (
                      <div className="inline-flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            handleDecision(
                              item.id,
                              "approved",
                              item.employeeName,
                              item.type
                            )
                          }
                          className="h-8 px-3 bg-emerald-600 hover:bg-emerald-700"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleDecision(
                              item.id,
                              "rejected",
                              item.employeeName,
                              item.type
                            )
                          }
                          className="h-8 px-3 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <XCircle className="h-3.5 w-3.5" strokeWidth={2} />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <Badge
                        variant={
                          item.status === "approved"
                            ? "success"
                            : item.status === "rejected"
                            ? "destructive"
                            : "warning"
                        }
                        className="capitalize"
                      >
                        {item.status}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Request Leave Dialog */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Request Time Off"
        description="Submit a leave or remote-work request for HR approval."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="leave-type">Leave Type</Label>
            <Select
              id="leave-type"
              value={form.type}
              onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
            >
              <option value="Annual Leave">Annual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Remote Work">Remote Work</option>
              <option value="Unpaid Leave">Unpaid Leave</option>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="leave-start">Start Date</Label>
              <Input
                id="leave-start"
                type="date"
                required
                value={form.startDate}
                onChange={(e) =>
                  setForm((p) => ({ ...p, startDate: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="leave-end">End Date</Label>
              <Input
                id="leave-end"
                type="date"
                required
                value={form.endDate}
                onChange={(e) =>
                  setForm((p) => ({ ...p, endDate: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="leave-reason">Reason / Notes</Label>
            <Textarea
              id="leave-reason"
              rows={3}
              required
              placeholder="Briefly describe your time-off request..."
              value={form.reason}
              onChange={(e) =>
                setForm((p) => ({ ...p, reason: e.target.value }))
              }
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default Leaves;
