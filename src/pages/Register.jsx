import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import GoogleLogin from "../components/GoogleLogin";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Label } from "../components/ui/label";

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const salaryData = {
  "Sales Assistant": 37500,
  "Social Media Executive": 45000,
  "Digital Marketer": 55000,
  "Marketing Coordinator": 49000,
  "Content Marketing Specialist": 57500,
  "SEO Specialist": 65000,
  "Brand Manager": 80000,
  "PPC Manager": 72500,
  "E-commerce Manager": 67500,
  "Affiliate Marketing Manager": 75000,
};

const Register = () => {
  const { createUser } = useAuth();
  const [passType, setPassType] = useState(true);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [salary, setSalary] = useState("");
  const [role, setRole] = useState("");
  const [designationDisabled, setDesignationDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fixedSalary = 100000;

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    if (selectedRole === "hr") {
      setDesignationDisabled(true);
      setSalary(fixedSalary);
    } else {
      setDesignationDisabled(false);
      setSalary("");
    }
  };

  const handleDesignationChange = (e) => {
    const selectedDesignation = e.target.value;
    setSalary(salaryData[selectedDesignation] || "");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const imgData = form.photo.files[0];
    const selectedRole = form.role.value;
    const designation = form.designation.value;
    const parsedSalary = parseInt(form.salary.value, 10);
    const bank = form.bank.value;
    const password = form.password.value;
    const isVerified = selectedRole === "hr";
    const workStatus = "active";

    if (password.length < 6) {
      Swal.fire({
        title: "Password must be at least 6 characters",
        icon: "error",
        confirmButtonColor: "#1d4ed8",
        confirmButtonText: "Okay",
      });
      return;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasSpecialChar) {
      Swal.fire({
        title:
          "Password must include uppercase, lowercase, and a special character",
        icon: "error",
        confirmButtonColor: "#1d4ed8",
        confirmButtonText: "Okay",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", imgData);

      const res = await axiosPublic.post(img_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const photoURL = res.data.data.url;

      const result = await createUser(email, password);
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL,
      });

      const userInfo = {
        name,
        email,
        photoURL,
        role: selectedRole,
        designation,
        salary: parsedSalary,
        bank,
        isVerified,
        workStatus,
      };

      const saveRes = await axiosPublic.post("/users", userInfo);
      if (saveRes.data.insertedId) {
        Swal.fire({
          title: "Account Created!",
          text: "Welcome to Staffly.",
          icon: "success",
          confirmButtonColor: "#1d4ed8",
          confirmButtonText: "Open Dashboard",
        });
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      Swal.fire({
        title: "Registration Failed",
        text: err.message,
        icon: "error",
        confirmButtonColor: "#1d4ed8",
        confirmButtonText: "Okay",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="p-7 sm:p-9 bg-white border-slate-200/80 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 p-2.5">
              <img
                src={logo}
                alt="Staffly"
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Create your Staffly account
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Set up your employee or HR profile in under a minute.
            </p>
          </div>

          <form
            onSubmit={handleSignUp}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <Label htmlFor="reg-name">Full Name</Label>
              <Input
                id="reg-name"
                type="text"
                name="name"
                placeholder="Jane Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-email">Work Email</Label>
              <Input
                id="reg-email"
                type="email"
                name="email"
                placeholder="jane@company.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-photo">Profile Photo</Label>
              <Input
                id="reg-photo"
                type="file"
                name="photo"
                accept="image/*"
                required
                className="pt-1.5 file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-role">Role</Label>
              <Select
                id="reg-role"
                name="role"
                required
                defaultValue=""
                onChange={handleRoleChange}
              >
                <option disabled value="">
                  Select role
                </option>
                <option value="hr">HR</option>
                <option value="employee">Employee</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-designation">Designation</Label>
              <Select
                id="reg-designation"
                name="designation"
                required={!designationDisabled}
                defaultValue=""
                onChange={handleDesignationChange}
                disabled={designationDisabled}
              >
                <option disabled value="">
                  {designationDisabled ? "HR Manager" : "Select designation"}
                </option>
                {Object.keys(salaryData).map((designation) => (
                  <option key={designation} value={designation}>
                    {designation}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-salary">Salary (USD)</Label>
              <Input
                id="reg-salary"
                type="text"
                name="salary"
                required
                readOnly
                value={role === "hr" ? fixedSalary : salary}
                placeholder="Auto-filled by role"
                className="bg-slate-50 text-slate-600 tabular-nums"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-bank">Bank A/C No.</Label>
              <Input
                id="reg-bank"
                type="text"
                name="bank"
                placeholder="Account number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-password">Password</Label>
              <div className="relative">
                <Input
                  id="reg-password"
                  type={passType ? "password" : "text"}
                  name="password"
                  placeholder="Min 6 chars, Aa1!"
                  required
                  className="pr-10"
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

            <div className="sm:col-span-2 pt-2">
              <Button
                type="submit"
                size="xl"
                disabled={isSubmitting}
                className="w-full rounded-xl"
              >
                <UserPlus className="h-4 w-4" strokeWidth={1.75} />
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Button>
            </div>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-medium">
                or sign up with
              </span>
            </div>
          </div>

          <GoogleLogin text="Sign up with" />

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </section>
  );
};

export default Register;
