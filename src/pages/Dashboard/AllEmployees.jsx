import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Shield, UserX, Users, Download } from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { exportToCsv, logAuditEvent } from "../../lib/enterprise";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";

const AllEmployees = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-users`);
      return res.data;
    },
  });

  const handleFire = async (id, name) => {
    const confirm = await Swal.fire({
      title: `Fire ${name}?`,
      text: "This will deactivate their account and prevent them from signing in.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, deactivate",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/fire-user/${id}`, {
        workStatus: "inactive",
      });
      if (res.data.modifiedCount > 0) {
        logAuditEvent({
          actor: user?.displayName || user?.email,
          actorRole: "Admin",
          action: "EMPLOYEE_DEACTIVATED",
          target: name,
          details: "Marked employee workStatus as inactive",
          severity: "destructive",
        });
        refetch();
        Swal.fire({
          title: "Employee Deactivated",
          text: `${name} has been marked as inactive.`,
          icon: "success",
          confirmButtonColor: "#1d4ed8",
        });
      }
    } catch {
      Swal.fire({
        title: "Failed to fire employee",
        icon: "error",
        confirmButtonColor: "#1d4ed8",
      });
    }
  };

  const handleRoleToggle = async (id, currentRole, name) => {
    const newRole = currentRole === "employee" ? "hr" : "employee";
    try {
      const res = await axiosSecure.patch(`/update-role/${id}`, {
        role: newRole,
      });
      if (res.data.modifiedCount > 0) {
        logAuditEvent({
          actor: user?.displayName || user?.email,
          actorRole: "Admin",
          action: "ROLE_UPDATED",
          target: name,
          details: `Changed role from ${currentRole.toUpperCase()} to ${newRole.toUpperCase()}`,
          severity: "warning",
        });
        refetch();
        Swal.fire({
          title: "Role Updated",
          text: `${name} is now assigned as ${newRole.toUpperCase()}.`,
          icon: "success",
          confirmButtonColor: "#1d4ed8",
        });
      }
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire({
        title: "Failed to update role",
        icon: "error",
        confirmButtonColor: "#1d4ed8",
      });
    }
  };

  const filteredUsers = allUsers.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (item.name || "").toLowerCase().includes(q) ||
      (item.designation || "hr").toLowerCase().includes(q) ||
      (item.role || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Badge variant="default" className="mb-3">
            Directory
          </Badge>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            All Employees
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage roles and employment status across your organization.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative w-full sm:w-64">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              strokeWidth={1.75}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or role..."
              className="pl-9 bg-white"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-10 px-3.5"
            onClick={() =>
              exportToCsv(
                "staffly-employees.csv",
                ["Name", "Email", "Designation", "Role", "Status"],
                filteredUsers.map((u) => [
                  u.name,
                  u.email || "",
                  u.designation || "HR Manager",
                  u.role,
                  u.workStatus || "active",
                ])
              )
            }
          >
            <Download className="h-4 w-4" strokeWidth={1.75} />
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
              <TableHead>Designation</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Role Action</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Users className="h-8 w-8" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-slate-600">
                      No employees found
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell className="font-medium text-slate-400 tabular-nums">
                    {idx + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-slate-200">
                        <AvatarImage src={item.photoURL} alt={item.name} />
                        <AvatarFallback>
                          {(item.name || "U").slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">
                          {item.name}
                        </p>
                        {item.email && (
                          <p className="text-xs text-slate-500 truncate">
                            {item.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {item.designation || "HR Manager"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.role === "hr" ? "default" : "secondary"}
                      className="uppercase"
                    >
                      {item.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        handleRoleToggle(item._id, item.role, item.name)
                      }
                      variant={item.role === "employee" ? "outline" : "subtle"}
                      size="sm"
                    >
                      <Shield className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {item.role === "employee" ? "Make HR" : "Make Employee"}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    {item.workStatus === "active" ? (
                      <Button
                        onClick={() => handleFire(item._id, item.name)}
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                      >
                        <UserX className="h-3.5 w-3.5" strokeWidth={1.75} />
                        Fire
                      </Button>
                    ) : (
                      <Badge variant="destructive">Fired</Badge>
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

export default AllEmployees;
