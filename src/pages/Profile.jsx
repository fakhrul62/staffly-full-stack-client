import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { updateProfile } from "firebase/auth";
import {
  Mail,
  Briefcase,
  CreditCard,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Pencil,
  Settings as SettingsIcon,
} from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Dialog } from "../components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";

const Profile = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();
  const [editOpen, setEditOpen] = useState(false);
  const [newName, setNewName] = useState(user?.displayName || "");
  const [saving, setSaving] = useState(false);

  const { data: dbUser } = useQuery({
    queryKey: ["profileUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        return res.data;
      } catch {
        return null;
      }
    },
  });

  const roleLabel = role?.admin
    ? "Administrator"
    : role?.hr
    ? "HR Manager"
    : dbUser?.role
    ? dbUser.role.toUpperCase()
    : "Employee";

  const isVerified = role?.admin || role?.hr || dbUser?.isVerified;
  const displayName = user?.displayName || dbUser?.name || "Team Member";
  const initials = displayName.slice(0, 2).toUpperCase();

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!user || !newName.trim()) return;
    setSaving(true);
    try {
      await updateProfile(user, { displayName: newName.trim() });
      setEditOpen(false);
      Swal.fire({
        title: "Profile Updated",
        text: "Your display name has been updated.",
        icon: "success",
        confirmButtonColor: "#1d4ed8",
      });
    } catch (err) {
      Swal.fire({
        title: "Update Failed",
        text: err.message,
        icon: "error",
        confirmButtonColor: "#1d4ed8",
      });
    } finally {
      setSaving(false);
    }
  };

  const details = [
    {
      icon: Mail,
      label: "Email Address",
      value: user?.email || "Not provided",
    },
    {
      icon: Briefcase,
      label: "Designation",
      value: dbUser?.designation || roleLabel,
    },
    {
      icon: CreditCard,
      label: "Monthly Salary",
      value: dbUser?.salary ? `$${Number(dbUser.salary).toLocaleString()}` : "—",
    },
    {
      icon: Building2,
      label: "Bank Account No.",
      value: dbUser?.bank || "Not linked",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <Badge variant="default" className="mb-3">
          Account
        </Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          My Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View your account identity, employment details, and verification
          status.
        </p>
      </div>

      {/* Header Banner Card */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm">
        <div className="h-28 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 relative">
          <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <div className="px-6 sm:px-8 pb-7">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 relative z-10">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src={user?.photoURL} alt={displayName} />
              <AvatarFallback className="bg-blue-600 text-white text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex items-center gap-2.5 sm:pb-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setNewName(displayName);
                  setEditOpen(true);
                }}
              >
                <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                Edit Name
              </Button>
              <Link to="/dashboard/settings">
                <Button size="sm">
                  <SettingsIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Settings
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
                {displayName}
              </h2>
              <Badge variant="default">{roleLabel}</Badge>
            </div>
            <p className="text-sm text-slate-500 mt-1">{user?.email}</p>
          </div>

          {/* Status Pills */}
          <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2.5">
            <Badge
              variant={isVerified ? "success" : "warning"}
              className="py-1 px-3"
            >
              {isVerified ? (
                <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
              ) : (
                <Clock className="h-3.5 w-3.5" strokeWidth={2} />
              )}
              {isVerified ? "Verified Account" : "Verification Pending"}
            </Badge>

            <Badge
              variant={
                dbUser?.workStatus === "inactive" ? "destructive" : "secondary"
              }
              className="py-1 px-3 capitalize"
            >
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
              Status: {dbUser?.workStatus || "active"}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Account Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {details.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.label}
              className="p-5 bg-white border-slate-200/80 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 truncate tabular-nums">
                    {item.value}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Edit Profile Dialog */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Display Name"
        description="Update the name displayed across your Staffly workspace."
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile-display-name">Display Name</Label>
            <Input
              id="profile-display-name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default Profile;
