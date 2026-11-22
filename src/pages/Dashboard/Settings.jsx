import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import {
  KeyRound,
  Bell,
  Shield,
  CheckCircle2,
  Mail,
  Lock,
} from "lucide-react";
import Swal from "sweetalert2";
import auth from "../../Provider/firebase.config";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

const Settings = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const [sendingReset, setSendingReset] = useState(false);
  const [prefs, setPrefs] = useState({
    payrollAlerts: true,
    taskDigest: true,
    securityEmails: true,
  });

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    setSendingReset(true);
    try {
      await sendPasswordResetEmail(auth, user.email);
      Swal.fire({
        title: "Reset Email Sent",
        text: `A password reset link has been sent to ${user.email}.`,
        icon: "success",
        confirmButtonColor: "#1d4ed8",
      });
    } catch (err) {
      Swal.fire({
        title: "Could Not Send Reset Email",
        text: err.message,
        icon: "error",
        confirmButtonColor: "#1d4ed8",
      });
    } finally {
      setSendingReset(false);
    }
  };

  const togglePref = (key) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const roleName = role?.admin
    ? "Administrator"
    : role?.hr
    ? "HR Manager"
    : "Employee";

  const permissions = role?.admin
    ? [
        "Manage all employee & HR roles",
        "Deactivate / fire inactive accounts",
        "Approve & disburse monthly payroll",
        "View company-wide analytics & work progress",
      ]
    : role?.hr
    ? [
        "Verify employee onboarding status",
        "Initiate monthly payroll requests",
        "Inspect employee salary charts & details",
        "Monitor team work-sheet progress",
      ]
    : [
        "Log daily tasks and hours worked",
        "Edit or delete personal work-sheet entries",
        "Track personal monthly payment history",
        "Manage personal account profile",
      ];

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="default" className="mb-3">
          Preferences
        </Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Workspace Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your security, notification preferences, and role access.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Security Card */}
        <Card className="lg:col-span-6 p-6 bg-white border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <KeyRound className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="font-display text-base font-semibold text-slate-900">
                  Account Security
                </h2>
                <p className="text-xs text-slate-500">
                  Firebase authentication &amp; password recovery
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-5">
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Mail className="h-4 w-4 text-slate-400 shrink-0" strokeWidth={1.75} />
                  <span className="text-sm text-slate-700 truncate">
                    {user?.email}
                  </span>
                </div>
                <Badge variant="success">Connected</Badge>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <Lock className="h-4 w-4 text-slate-400 shrink-0" strokeWidth={1.75} />
                  <span className="text-sm text-slate-700">
                    Password Reset Link
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={sendingReset}
                  onClick={handlePasswordReset}
                >
                  {sendingReset ? "Sending..." : "Send Email"}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications Card */}
        <Card className="lg:col-span-6 p-6 bg-white border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <Bell className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-slate-900">
                Notification Preferences
              </h2>
              <p className="text-xs text-slate-500">
                Choose which workspace alerts you receive
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                key: "payrollAlerts",
                title: "Payroll Updates",
                desc: "Notify when salary requests are submitted or paid",
              },
              {
                key: "taskDigest",
                title: "Work Sheet Summaries",
                desc: "Weekly summary of logged hours and team tasks",
              },
              {
                key: "securityEmails",
                title: "Security Alerts",
                desc: "Sign-in and account verification notifications",
              },
            ].map((item) => {
              const enabled = prefs[item.key];
              return (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={enabled}
                    onClick={() => togglePref(item.key)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                      enabled ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                        enabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Role Permissions Card */}
        <Card className="lg:col-span-12 p-6 bg-white border-slate-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <Shield className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="font-display text-base font-semibold text-slate-900">
                  Role &amp; Access Permissions
                </h2>
                <p className="text-xs text-slate-500">
                  Capabilities enabled for your current workspace role
                </p>
              </div>
            </div>
            <Badge variant="default" className="self-start sm:self-center">
              Active Role: {roleName}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {permissions.map((perm) => (
              <div
                key={perm}
                className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-sm text-slate-700"
              >
                <CheckCircle2
                  className="h-4 w-4 shrink-0 text-emerald-600"
                  strokeWidth={2}
                />
                <span>{perm}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
