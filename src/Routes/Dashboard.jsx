import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  TrendingUp,
  ClipboardList,
  Receipt,
  ArrowLeft,
  LogOut,
  Menu,
  X,
  BarChart3,
  Settings,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
  CalendarDays,
  ShieldAlert,
} from "lucide-react";
import logo from "../assets/logo.png";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { cn } from "../lib/utils";

const routeTitles = {
  "/dashboard/home": "Admin Dashboard",
  "/dashboard/all-employee-list": "All Employees",
  "/dashboard/payroll": "Payroll Approvals",
  "/dashboard/analytics": "Workforce Analytics",
  "/dashboard/hr-home": "HR Dashboard",
  "/dashboard/progress": "Team Progress",
  "/dashboard/hr-payment": "My Payments",
  "/dashboard/work-sheet": "Work Sheet",
  "/dashboard/payment-history": "Payment History",
  "/dashboard/profile": "My Profile",
  "/dashboard/settings": "Workspace Settings",
  "/dashboard/leaves": "Leave Management",
  "/dashboard/audit-logs": "Audit Logs",
};

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [role] = useRole();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("staffly_sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("staffly_sidebar_collapsed", String(collapsed));
    } catch {
      // ignore storage errors
    }
  }, [collapsed]);

  const handleLogout = async () => {
    try {
      setMobileOpen(false);
      await logOut();
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  const roleLabel = role?.admin
    ? "Admin"
    : role?.hr
    ? "HR"
    : role?.employee
    ? "Employee"
    : "Member";

  const currentPageTitle =
    routeTitles[location.pathname] ||
    (location.pathname.startsWith("/dashboard/details")
      ? "Employee Details"
      : "Dashboard");

  const getNavLinkClass =
    (isCollapsed) =>
    ({ isActive }) =>
      cn(
        "flex items-center rounded-xl text-sm font-medium transition-all duration-200",
        isCollapsed
          ? "justify-center px-2.5 py-2.5"
          : "gap-3 px-3.5 py-2.5",
        isActive
          ? "bg-blue-600 text-white shadow-sm shadow-blue-950/30"
          : "text-slate-300 hover:bg-white/10 hover:text-white"
      );

  const renderLinks = (onClick, isCollapsed = false) => {
    const linkClass = getNavLinkClass(isCollapsed);

    const workspaceLinks = [
      ...(role?.admin
        ? [
            {
              to: "/dashboard/home",
              end: true,
              label: "Admin Dashboard",
              icon: LayoutDashboard,
            },
            {
              to: "/dashboard/all-employee-list",
              label: "All Employees",
              icon: Users,
            },
            {
              to: "/dashboard/payroll",
              label: "Payroll",
              icon: CreditCard,
            },
            {
              to: "/dashboard/progress",
              label: "Team Progress",
              icon: TrendingUp,
            },
            {
              to: "/dashboard/analytics",
              label: "Analytics",
              icon: BarChart3,
            },
            {
              to: "/dashboard/leaves",
              label: "Leave Requests",
              icon: CalendarDays,
            },
            {
              to: "/dashboard/audit-logs",
              label: "Audit Logs",
              icon: ShieldAlert,
            },
          ]
        : []),
      ...(role?.hr
        ? [
            {
              to: "/dashboard/hr-home",
              end: true,
              label: "HR Dashboard",
              icon: LayoutDashboard,
            },
            {
              to: "/dashboard/progress",
              end: true,
              label: "Team Progress",
              icon: TrendingUp,
            },
            {
              to: "/dashboard/leaves",
              label: "Leave Requests",
              icon: CalendarDays,
            },
            {
              to: "/dashboard/hr-payment",
              end: true,
              label: "My Payments",
              icon: CreditCard,
            },
          ]
        : []),
      ...(role?.employee
        ? [
            {
              to: "/dashboard/work-sheet",
              end: true,
              label: "Work Sheet",
              icon: ClipboardList,
            },
            {
              to: "/dashboard/leaves",
              label: "Leave & PTO",
              icon: CalendarDays,
            },
            {
              to: "/dashboard/payment-history",
              label: "Payment History",
              icon: Receipt,
            },
          ]
        : []),
    ];

    const accountLinks = [
      { to: "/dashboard/settings", label: "Settings", icon: Settings },
      { to: "/", end: true, label: "Back to Home", icon: ArrowLeft },
    ];

    return (
      <>
        {!isCollapsed && (
          <p className="px-3.5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Workspace
          </p>
        )}
        {workspaceLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              title={isCollapsed ? item.label : undefined}
              className={linkClass}
              onClick={onClick}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}

        <div className="my-4 border-t border-slate-800/80" />

        {!isCollapsed && (
          <p className="px-3.5 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Account
          </p>
        )}
        {accountLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              title={isCollapsed ? item.label : undefined}
              className={linkClass}
              onClick={onClick}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          );
        })}
      </>
    );
  };

  const initials = (user?.displayName || user?.email || "U")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 md:flex">
      {/* Desktop Collapsible Sidebar */}
      <aside
        className={cn(
          "hidden md:flex md:flex-col md:fixed md:inset-y-0 bg-slate-950 border-r border-slate-800/80 z-40 transition-all duration-300 ease-in-out",
          collapsed ? "md:w-20" : "md:w-64"
        )}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Brand Header */}
          <div
            className={cn(
              "flex items-center h-16 border-b border-slate-800/80 transition-all",
              collapsed ? "justify-center px-3" : "justify-between px-5"
            )}
          >
            <Link
              to="/"
              className="flex items-center gap-2.5 group min-w-0"
              title="Staffly Home"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/10 p-1.5">
                <img
                  src={logo}
                  className="h-full w-full object-contain"
                  alt="Staffly"
                />
              </div>
              {!collapsed && (
                <span className="font-display text-lg font-bold tracking-tight text-white truncate">
                  Staffly
                </span>
              )}
            </Link>

            {!collapsed && (
              <Badge
                variant="dark"
                className="text-[10px] px-2 py-0.5 uppercase tracking-wider shrink-0"
              >
                {roleLabel}
              </Badge>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
            {renderLinks(undefined, collapsed)}
          </nav>

          {/* Clickable User Profile Footer */}
          <div className="p-3 border-t border-slate-800/80">
            {collapsed ? (
              <div className="flex flex-col items-center gap-2">
                <Link
                  to="/dashboard/profile"
                  title={`${user?.displayName || "Profile"} — View Profile`}
                  className="rounded-full ring-2 ring-transparent hover:ring-blue-500 transition-all"
                >
                  <Avatar className="h-9 w-9 border border-slate-700">
                    <AvatarImage
                      src={user?.photoURL}
                      alt={user?.displayName || "User"}
                    />
                    <AvatarFallback className="bg-blue-600 text-white text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  title="Logout"
                  aria-label="Logout"
                  className="h-8 w-8 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.75} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2 rounded-xl bg-white/5 border border-white/5 p-2 transition-colors hover:bg-white/10">
                <Link
                  to="/dashboard/profile"
                  className="group flex items-center gap-2.5 min-w-0 flex-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  title="View My Profile"
                >
                  <Avatar className="h-9 w-9 shrink-0 border border-slate-700 transition-transform duration-200 group-hover:scale-105">
                    <AvatarImage
                      src={user?.photoURL}
                      alt={user?.displayName || "User"}
                    />
                    <AvatarFallback className="bg-blue-600 text-white text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  title="Logout"
                  aria-label="Logout"
                  className="h-8 w-8 shrink-0 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.75} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-40 bg-slate-950 border-b border-slate-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/10 p-1.5">
              <img
                src={logo}
                className="h-full w-full object-contain"
                alt="Staffly"
              />
            </div>
            <span className="font-display text-lg font-bold text-white">
              Staffly
            </span>
            <Badge variant="dark" className="text-[10px] px-2 py-0.5">
              {roleLabel}
            </Badge>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle dashboard menu"
            className="text-slate-300 hover:bg-white/10 hover:text-white"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </Button>
        </div>

        {mobileOpen && (
          <div className="mt-3 pt-3 border-t border-slate-800 space-y-1">
            {renderLinks(() => setMobileOpen(false), false)}
            <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between">
              <Link
                to="/dashboard/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 min-w-0"
              >
                <Avatar className="h-8 w-8 border border-slate-700">
                  <AvatarImage src={user?.photoURL} alt={user?.displayName} />
                  <AvatarFallback className="bg-blue-600 text-white text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-white truncate">
                  {user?.displayName || user?.email}
                </span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-slate-300 hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" strokeWidth={1.75} />
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Shell */}
      <div
        className={cn(
          "flex-1 min-w-0 flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          collapsed ? "md:ml-20" : "md:ml-64"
        )}
      >
        {/* Desktop Top Utility Bar */}
        <header className="hidden md:flex sticky top-0 z-30 h-16 items-center justify-between border-b border-slate-200/80 bg-white/85 px-6 lg:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed((prev) => !prev)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="h-9 w-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              {collapsed ? (
                <PanelLeftOpen className="h-4 w-4" strokeWidth={1.75} />
              ) : (
                <PanelLeftClose className="h-4 w-4" strokeWidth={1.75} />
              )}
            </Button>

            <div className="h-4 w-[1px] bg-slate-200" />

            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400">Workspace</span>
              <span className="text-slate-300">/</span>
              <span className="font-semibold text-slate-900">
                {currentPageTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/dashboard/settings">
              <Button
                variant="ghost"
                size="icon"
                title="Notifications & Settings"
                aria-label="Notifications and Settings"
                className="h-9 w-9 rounded-full text-slate-500 hover:text-slate-900"
              >
                <Bell className="h-4 w-4" strokeWidth={1.75} />
              </Button>
            </Link>
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 border border-slate-200/80 bg-white hover:border-blue-200 hover:bg-blue-50/40 transition-colors"
            >
              <Avatar className="h-7 w-7 border border-slate-200">
                <AvatarImage
                  src={user?.photoURL}
                  alt={user?.displayName || "User"}
                />
                <AvatarFallback className="text-[10px]">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-slate-700 max-w-[140px] truncate">
                {user?.displayName || "Profile"}
              </span>
            </Link>
          </div>
        </header>

        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
