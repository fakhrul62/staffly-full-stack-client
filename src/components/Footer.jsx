import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Globe,
  Mail,
  Check,
  MessageSquare,
  Briefcase,
  Share2,
} from "lucide-react";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6">
      <footer className="relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800/80 text-slate-300">
        {/* Subtle Decorative Wave Lines */}
        <svg
          className="pointer-events-none absolute -bottom-24 left-1/2 w-[1600px] -translate-x-1/2 opacity-30"
          width="2745"
          height="488"
          viewBox="0 0 2745 488"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0.5 330.864C232.505 403.801 853.749 527.683 1482.69 439.719C2111.63 351.756 2585.54 434.588 2743.87 487"
            stroke="currentColor"
            className="text-slate-700"
          />
          <path
            d="M0.5 286.882C232.505 359.819 853.749 483.701 1482.69 395.738C2111.63 307.774 2585.54 390.606 2743.87 443.018"
            stroke="currentColor"
            className="text-slate-700"
          />
          <path
            d="M0.5 242.9C232.505 315.837 853.749 439.719 1482.69 351.756C2111.63 263.792 2585.54 346.624 2743.87 399.036"
            stroke="currentColor"
            className="text-slate-700"
          />
          <path
            d="M0.5 198.918C232.505 271.855 853.749 395.737 1482.69 307.774C2111.63 219.81 2585.54 302.642 2743.87 355.054"
            stroke="currentColor"
            className="text-slate-700"
          />
          <path
            d="M0.5 154.937C232.505 227.873 853.749 351.756 1482.69 263.792C2111.63 175.828 2585.54 258.661 2743.87 311.072"
            stroke="currentColor"
            className="text-slate-700"
          />
          <path
            d="M0.5 110.955C232.505 183.891 853.749 307.774 1482.69 219.81C2111.63 131.846 2585.54 214.679 2743.87 267.091"
            stroke="currentColor"
            className="text-slate-700"
          />
        </svg>

        <div className="relative z-10 px-6 py-12 sm:px-10 lg:px-14 lg:pt-16 lg:pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2.5 group focus-visible:outline-none"
                aria-label="Staffly Home"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10 p-1.5">
                  <img
                    src={logo}
                    alt="Staffly"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="font-display text-xl font-bold tracking-tight text-white">
                  Staffly
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
                Modern employee management, attendance tracking, and automated
                payroll designed for high-performing teams.
              </p>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link
                    to="/"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/profile"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Company
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href="#about"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Link
                    to="/register"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                  <Badge
                    variant="default"
                    className="border-blue-500/30 bg-blue-600/20 text-blue-300 px-2 py-0.5 text-[10px]"
                  >
                    Hiring
                  </Badge>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Customers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Stay up to date
              </h4>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Get product updates and HR best practices delivered monthly.
              </p>

              <form onSubmit={handleSubscribe} className="mt-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5 backdrop-blur-sm">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="border-0 bg-transparent text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
                  />
                  <Button
                    type="submit"
                    className="shrink-0 rounded-lg bg-blue-600 hover:bg-blue-500 text-white h-10 px-4"
                  >
                    {subscribed ? (
                      <>
                        <Check className="h-4 w-4" strokeWidth={2} />
                        Subscribed
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="h-4 w-4" strokeWidth={2} />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Staffly. All rights reserved.
            </p>

            <div className="flex items-center gap-1.5">
              {[
                { label: "Website", icon: Globe, to: "/" },
                { label: "Community", icon: MessageSquare, to: "/contact" },
                { label: "Careers", icon: Briefcase, to: "/register" },
                { label: "Share", icon: Share2, to: "/contact" },
                { label: "Email", icon: Mail, to: "/contact" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    to={social.to}
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
