import React, { useState } from "react";
import { ShieldAlert, Download, Search, FileText } from "lucide-react";
import { getAuditLogs, exportToCsv } from "../../lib/enterprise";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";

const AuditLogs = () => {
  const [logs] = useState(() => getAuditLogs());
  const [search, setSearch] = useState("");

  const filtered = logs.filter((entry) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      (entry.actor || "").toLowerCase().includes(q) ||
      (entry.action || "").toLowerCase().includes(q) ||
      (entry.target || "").toLowerCase().includes(q) ||
      (entry.details || "").toLowerCase().includes(q)
    );
  });

  const handleExport = () => {
    exportToCsv(
      "staffly-audit-logs.csv",
      ["Timestamp", "Actor", "Role", "Action", "Target", "Details"],
      filtered.map((l) => [
        new Date(l.timestamp).toLocaleString(),
        l.actor,
        l.actorRole,
        l.action,
        l.target,
        l.details,
      ])
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <Badge variant="default" className="mb-3">
            Governance &amp; Compliance
          </Badge>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Audit Logs
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Immutable activity trail of payroll approvals, role updates,
            verifications, and leave decisions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative w-full sm:w-56">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              strokeWidth={1.75}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search audit events..."
              className="pl-9 bg-white"
            />
          </div>
          <Button variant="outline" size="sm" onClick={handleExport} className="h-10 px-3.5">
            <Download className="h-4 w-4" strokeWidth={1.75} />
            Export CSV
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Timestamp</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <FileText className="h-8 w-8" strokeWidth={1.5} />
                    <p className="text-sm font-medium text-slate-600">
                      No matching audit events
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="text-xs text-slate-500 tabular-nums">
                    {new Date(entry.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">
                        {entry.actor}
                      </span>
                      <Badge variant="secondary" className="text-[10px]">
                        {entry.actorRole}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        entry.severity === "success"
                          ? "success"
                          : entry.severity === "warning"
                          ? "warning"
                          : entry.severity === "destructive"
                          ? "destructive"
                          : "default"
                      }
                      className="font-mono text-[10px]"
                    >
                      <ShieldAlert className="h-3 w-3" strokeWidth={1.75} />
                      {entry.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-slate-800">
                    {entry.target}
                  </TableCell>
                  <TableCell className="text-slate-600 text-xs max-w-xs truncate">
                    {entry.details}
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

export default AuditLogs;
