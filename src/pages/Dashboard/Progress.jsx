import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Filter, X, Clock, ClipboardList } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Select } from "../../components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";

const formatDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Progress = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedEmail, setSelectedEmail] = useState("");

  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks`);
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/employees`);
      return res.data;
    },
  });

  const filteredTasks = selectedEmail
    ? tasks.filter((task) => task.user_email === selectedEmail)
    : tasks;

  const totalHours = filteredTasks.reduce(
    (sum, t) => sum + Number(t.hour || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Badge variant="default" className="mb-3">
            Workforce Activity
          </Badge>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Team Progress
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track submitted work logs and total hours across employees.
          </p>
        </div>

        <Badge variant="secondary" className="py-1.5 px-3.5 tabular-nums self-start sm:self-end">
          <Clock className="h-3.5 w-3.5 text-blue-600" strokeWidth={1.75} />
          {totalHours} hrs logged ({filteredTasks.length} entries)
        </Badge>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 bg-white border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 shrink-0">
            <Filter className="h-4 w-4 text-blue-600" strokeWidth={1.75} />
            Filter by Employee
          </div>
          <div className="w-full sm:max-w-xs">
            <Select
              value={selectedEmail}
              onChange={(e) => setSelectedEmail(e.target.value)}
            >
              <option value="">All Employees</option>
              {users.map((u) => (
                <option key={u.email} value={u.email}>
                  {u.name}
                </option>
              ))}
            </Select>
          </div>
          {selectedEmail && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedEmail("")}
              className="self-start sm:self-auto"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
              Clear Filter
            </Button>
          )}
        </div>
      </Card>

      {/* Table Card */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-16">No.</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Hours Spent</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Employee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <ClipboardList className="h-8 w-8" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-slate-600">
                      No task entries found
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium text-slate-400 tabular-nums">
                    {idx + 1}
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{item.task}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900 tabular-nums">
                    {item.hour} hrs
                  </TableCell>
                  <TableCell className="text-slate-600 tabular-nums">
                    {formatDate(item.date)}
                  </TableCell>
                  <TableCell className="font-medium text-slate-800">
                    {item.user_name}
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

export default Progress;
