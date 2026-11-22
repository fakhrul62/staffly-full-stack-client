// Enterprise client utilities: CSV export, Audit Logs, Leave Management, Printable PDF Payslips

const AUDIT_STORAGE_KEY = "staffly_audit_logs_v1";
const LEAVES_STORAGE_KEY = "staffly_leave_requests_v1";

const DEFAULT_AUDIT_LOGS = [
  {
    id: "aud-1001",
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    actor: "Fakhrul Alam",
    actorRole: "Admin",
    action: "PAYROLL_APPROVED",
    target: "Sarah Lin — Nov 2026",
    details: "Approved monthly salary disbursement ($80,000)",
    severity: "success",
  },
  {
    id: "aud-1002",
    timestamp: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    actor: "HR Operations",
    actorRole: "HR",
    action: "EMPLOYEE_VERIFIED",
    target: "David Park",
    details: "Verified bank account and onboarding compliance",
    severity: "info",
  },
  {
    id: "aud-1003",
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    actor: "Fakhrul Alam",
    actorRole: "Admin",
    action: "ROLE_UPDATED",
    target: "Elena Rostova",
    details: "Promoted from Employee to HR Manager",
    severity: "warning",
  },
];

const DEFAULT_LEAVES = [
  {
    id: "lv-2001",
    employeeName: "Sarah Lin",
    employeeEmail: "sarah@staffly.io",
    type: "Annual Leave",
    startDate: "2026-12-02",
    endDate: "2026-12-05",
    days: 4,
    reason: "Family year-end travel",
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: "lv-2002",
    employeeName: "David Park",
    employeeEmail: "david@staffly.io",
    type: "Remote Work",
    startDate: "2026-11-26",
    endDate: "2026-11-27",
    days: 2,
    reason: "Working remotely during home fiber installation",
    status: "approved",
    createdAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
  },
  {
    id: "lv-2003",
    employeeName: "Maya Patel",
    employeeEmail: "maya@staffly.io",
    type: "Sick Leave",
    startDate: "2026-11-23",
    endDate: "2026-11-23",
    days: 1,
    reason: "Medical checkup appointment",
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
];

export function exportToCsv(filename, headers, rows) {
  const escapeCell = (value) => {
    const str = value == null ? "" : String(value);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csvContent = [
    headers.map(escapeCell).join(","),
    ...rows.map((row) => row.map(escapeCell).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getAuditLogs() {
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(DEFAULT_AUDIT_LOGS));
      return DEFAULT_AUDIT_LOGS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_AUDIT_LOGS;
  }
}

export function logAuditEvent({
  actor = "System",
  actorRole = "Admin",
  action,
  target,
  details,
  severity = "info",
}) {
  const entry = {
    id: `aud-${Date.now()}`,
    timestamp: new Date().toISOString(),
    actor,
    actorRole,
    action,
    target,
    details,
    severity,
  };
  try {
    const existing = getAuditLogs();
    const updated = [entry, ...existing].slice(0, 100);
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [entry];
  }
}

export function getLeaveRequests() {
  try {
    const raw = localStorage.getItem(LEAVES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LEAVES_STORAGE_KEY, JSON.stringify(DEFAULT_LEAVES));
      return DEFAULT_LEAVES;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_LEAVES;
  }
}

export function saveLeaveRequests(list) {
  try {
    localStorage.setItem(LEAVES_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore storage quota errors
  }
}

export function getMonthLabel(month) {
  const num = Number(month);
  if (!num || num < 1 || num > 12) return String(month || "");
  return new Date(2026, num - 1).toLocaleString("en-US", { month: "long" });
}

export function printPayslip(item) {
  const empName = item.employee?.name || "Employee";
  const empEmail = item.employee?.email || "";
  const empDesignation = item.employee?.designation || "Team Member";
  const empBank = item.employee?.bank || "On file";
  const salary = Number(item.employee?.salary || 0);
  const period = `${getMonthLabel(item.month)} ${item.year}`;
  const payDate = item.payment_date || "Pending";
  const status = (item.payment_status || "pending").toUpperCase();
  const receiptNo = `STF-${String(item._id || Date.now()).slice(-6).toUpperCase()}`;

  const win = window.open("", "_blank", "width=820,height=900");
  if (!win) return;

  win.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>Payslip - ${empName} (${period})</title>
        <style>
          body { font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif; color: #0f172a; margin: 0; padding: 40px; background: #f8fafc; }
          .sheet { max-width: 720px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; }
          .top { background: #0f172a; color: #ffffff; padding: 28px 32px; display: flex; justify-content: space-between; align-items: center; }
          .brand { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; }
          .sub { font-size: 12px; color: #94a3b8; margin-top: 4px; }
          .badge { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 600; background: ${status === "PAID" ? "#059669" : "#d97706"}; color: #fff; }
          .body { padding: 32px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; }
          .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; }
          .lbl { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 600; }
          .val { font-size: 14px; font-weight: 600; margin-top: 4px; color: #0f172a; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          th, td { text-align: left; padding: 12px 14px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
          th { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; background: #f8fafc; }
          .right { text-align: right; }
          .total { font-size: 18px; font-weight: 700; color: #1d4ed8; }
          .footer { margin-top: 28px; padding-top: 18px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 12px; color: #64748b; }
          @media print { body { background: #fff; padding: 0; } .sheet { border: none; } }
        </style>
      </head>
      <body>
        <div class="sheet">
          <div class="top">
            <div>
              <div class="brand">Staffly</div>
              <div class="sub">Official Earnings Statement · ${receiptNo}</div>
            </div>
            <div style="text-align:right">
              <div class="badge">${status}</div>
              <div class="sub" style="margin-top:6px">Pay Period: ${period}</div>
            </div>
          </div>
          <div class="body">
            <div class="grid">
              <div class="box"><div class="lbl">Employee</div><div class="val">${empName}</div><div class="sub">${empEmail}</div></div>
              <div class="box"><div class="lbl">Designation</div><div class="val">${empDesignation}</div><div class="sub">Bank A/C: ${empBank}</div></div>
              <div class="box"><div class="lbl">Pay Period</div><div class="val">${period}</div></div>
              <div class="box"><div class="lbl">Payment Date</div><div class="val">${payDate}</div></div>
            </div>
            <table>
              <thead><tr><th>Earnings Description</th><th class="right">Amount (USD)</th></tr></thead>
              <tbody>
                <tr><td>Base Monthly Salary (${period})</td><td class="right">$${salary.toLocaleString()}</td></tr>
                <tr><td>Deductions &amp; Withholdings</td><td class="right">$0.00</td></tr>
                <tr><td><strong>Net Disbursement</strong></td><td class="right total">$${salary.toLocaleString()}</td></tr>
              </tbody>
            </table>
            <div class="footer">
              <span>Generated by Staffly Employee Management System</span>
              <span>Receipt #${receiptNo}</span>
            </div>
          </div>
        </div>
        <script>window.onload = () => { window.print(); };</script>
      </body>
    </html>
  `);
  win.document.close();
}
