import React from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useRole from "../hooks/useRole";

const DashboardIndex = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2
          className="h-7 w-7 animate-spin text-blue-600"
          strokeWidth={2}
        />
        <p className="text-sm text-slate-500">Opening your workspace...</p>
      </div>
    );
  }

  if (role?.admin) return <Navigate to="/dashboard/home" replace />;
  if (role?.hr) return <Navigate to="/dashboard/hr-home" replace />;
  return <Navigate to="/dashboard/work-sheet" replace />;
};

export default DashboardIndex;
