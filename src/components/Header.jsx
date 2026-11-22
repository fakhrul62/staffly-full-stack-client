import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, LogIn, LogOut, LayoutDashboard, User } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { cn } from "../lib/utils";

const Header = () => {
  const { user, logOut } = useAuth();
  const [role] = useRole();
  const [mobileOpen, setMobileOpen] = useState(false);

  const dashboardPath = role?.admin
    ? "/dashboard/home"
    : role?.hr
    ? "/dashboard/hr-home"
    : role?.employee
    ? "/dashboard/work-sheet"
    : null;

  const navLinkClass = ({ isActive }) =>
    cn(
      "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
      isActive
        ? "bg-blue-50 text-blue-700"
        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
    );

  const handleLogout = () => {
    logOut()
      .then(() => {
        setMobileOpen(false);
      })
      .catch((error) => console.log(error.message));
  };

  const navItems = (
    <>
      <NavLink
        to="/"
        end
        className={navLinkClass}
        onClick={() => setMobileOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/contact"
        className={navLinkClass}
        onClick={() => setMobileOpen(false)}
      >
        Contact
      </NavLink>
      {user && dashboardPath && (
        <NavLink
          to={dashboardPath}
          className={navLinkClass}
          onClick={() => setMobileOpen(false)}
        >
          <LayoutDashboard className="h-4 w-4" strokeWidth={1.75} />
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between rounded-2xl border border-slate-200/80 bg-white/85 px-4 sm:px-6 shadow-sm backdrop-blur-md transition-all duration-300">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 p-1.5 transition-transform duration-200 group-hover:scale-105">
              <img
                src={logo}
                className="h-full w-full object-contain"
                alt="Staffly logo"
              />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-slate-900">
              Staffly
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-1"
          >
            {navItems}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard/profile"
                  className="rounded-full ring-2 ring-transparent transition-all hover:ring-blue-200"
                  title={user.displayName || "Profile"}
                >
                  <Avatar className="h-9 w-9 border border-slate-200">
                    <AvatarImage
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                    />
                    <AvatarFallback>
                      {(user.displayName || user.email || "U")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="h-9 px-3.5"
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.75} />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="h-9 px-4">
                    <LogIn className="h-4 w-4" strokeWidth={1.75} />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="sm" className="h-9 px-4">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" strokeWidth={1.75} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.75} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="md:hidden mt-2 rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-lg backdrop-blur-md">
            <nav className="flex flex-col gap-1">{navItems}</nav>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar className="h-9 w-9 border border-slate-200">
                      <AvatarImage
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                      />
                      <AvatarFallback>
                        {(user.displayName || user.email || "U")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-slate-700 truncate">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" strokeWidth={1.75} />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2.5 w-full">
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full">
                      <LogIn className="h-4 w-4" strokeWidth={1.75} />
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)}>
                    <Button variant="default" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
