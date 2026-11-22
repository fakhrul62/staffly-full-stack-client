import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import GoogleLogin from "../components/GoogleLogin";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";
import logo from "../assets/logo.png";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const Login = () => {
  const { signInUser, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [passType, setPassType] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const queryClient = useQueryClient();

  const fetchUserData = async (email) => {
    if (!email) return null;
    try {
      const res = await axiosSecure.get(`/users/${email}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const checkUserStatusAndLogin = async (formEmail, formPassword) => {
    setIsCheckingStatus(true);
    try {
      queryClient.invalidateQueries(["userStatus"]);
      const userData = await fetchUserData(formEmail);

      if (!userData) {
        throw new Error("User not found");
      }

      if (userData.workStatus === "inactive") {
        Swal.fire({
          title: "Account Inactive",
          text: "Your account is inactive. Please contact the administrator.",
          icon: "error",
          confirmButtonColor: "#1d4ed8",
          confirmButtonText: "Okay",
        });
        return;
      }

      await signInUser(formEmail, formPassword);

      const targetPath =
        location?.state?.from?.pathname ||
        (userData.role === "admin"
          ? "/dashboard/home"
          : userData.role === "hr"
          ? "/dashboard/hr-home"
          : "/dashboard/work-sheet");

      navigate(targetPath, { replace: true });

      Swal.fire({
        title: "Welcome back!",
        text: "You have signed in successfully.",
        icon: "success",
        confirmButtonColor: "#1d4ed8",
        confirmButtonText: "Continue",
      });
    } catch (error) {
      console.error("Login process error:", error);
      Swal.fire({
        title:
          error.message === "User not found"
            ? "User Not Found"
            : "Sign In Failed",
        text:
          error.message === "User not found"
            ? "Please check your email or register if you're new."
            : "Invalid credentials. Please try again.",
        icon: "error",
        confirmButtonColor: "#1d4ed8",
        confirmButtonText: "Okay",
      });
    } finally {
      setIsCheckingStatus(false);
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formEmail = form.email.value;
    const formPassword = form.password.value;
    await checkUserStatusAndLogin(formEmail, formPassword);
    form.reset();
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
      <div className="max-w-md mx-auto">
        <Card className="p-7 sm:p-8 bg-white border-slate-200/80 shadow-sm">
          {/* Header */}
          <div className="text-center mb-7">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 p-2.5">
              <img
                src={logo}
                alt="Staffly"
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">
              Sign in to Staffly
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Enter your credentials to access your workspace.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  strokeWidth={1.75}
                />
                <Input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  className="pl-10 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  strokeWidth={1.75}
                />
                <Input
                  id="login-password"
                  type={passType ? "password" : "text"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="pl-10 pr-10 h-11"
                />
                <button
                  type="button"
                  onClick={() => setPassType((prev) => !prev)}
                  aria-label={passType ? "Show password" : "Hide password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {passType ? (
                    <Eye className="h-4 w-4" strokeWidth={1.75} />
                  ) : (
                    <EyeOff className="h-4 w-4" strokeWidth={1.75} />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="xl"
              disabled={isCheckingStatus}
              className="w-full rounded-xl mt-2"
            >
              <LogIn className="h-4 w-4" strokeWidth={1.75} />
              {isCheckingStatus ? "Checking account..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-medium">
                or continue with
              </span>
            </div>
          </div>

          <GoogleLogin text="Sign in with" />

          <p className="mt-6 text-center text-sm text-slate-600">
            New to Staffly?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Create an account
            </Link>
          </p>
        </Card>
      </div>
    </section>
  );
};

export default Login;
