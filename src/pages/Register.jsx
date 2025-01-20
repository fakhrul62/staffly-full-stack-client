import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import registerAnimation from "../assets/register.json";
import { updateProfile } from "firebase/auth";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import useAxiosPublic from "../hooks/useAxiosPublic";
import GoogleLogin from "../components/GoogleLogin";
import useAuth from "../hooks/useAuth";

const img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const Register = () => {
  const { createUser } = useAuth();
  const [passType, setpassType] = useState(true);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [salary, setSalary] = useState("");
  const [role, setRole] = useState("");
  const [designationDisabled, setDesignationDisabled] = useState(false);
  const [fixedSalary, setFixedSalary] = useState(100000);
  // Salary mapping based on designation
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
  //Handle Role Change
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    if (selectedRole === "hr") {
      setDesignationDisabled(true); // Disable designation
      setSalary(fixedSalary); // Set fixed salary for HR
    } else {
      setDesignationDisabled(false); // Enable designation
      setSalary(""); // Clear the salary when not HR
    }
  };

  // Handle designation change
  const handleDesignationChange = (e) => {
    const selectedDesignation = e.target.value;
    setSalary(salaryData[selectedDesignation] || ""); // Set salary based on designation
  };
  ///
  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const imgData = form.photo.files[0];
    const role = form.role.value;
    const designation = form.designation.value;
    const salary = parseInt(form.salary.value);
    const bank = form.bank.value;
    const password = form.password.value;
    const isVerified = role === "hr" ? true : false;
    const workStatus = "active";

    const formData = new FormData();
    formData.append("image", imgData);

    // Upload the image to ImgBB
    const res = await axiosPublic.post(img_hosting_api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const photoURL = res.data.data.url;
    if (password.length < 6) {
      Swal.fire({
        title: "Pass should be at least 6 characters!!!",
        icon: "error",
        iconColor: "#f4ec11",
        confirmButtonText: "Okay",
        customClass: {
          confirmButton: "bg-amber-400 text-zinc-800 font-body px-32",
          title: "font-head font-bold text-2xls",
        },
      });
      return;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasSpecialChar) {
      Swal.fire({
        title:
          "Password must include at least one uppercase, one lowercase and one special character!!!",
        icon: "error",
        iconColor: "#76a9fa ",
        confirmButtonText: "Okay",
        customClass: {
          confirmButton: "bg-blue-500 text-zinc-800 font-body px-32",
          title: "font-head font-bold text-2xls",
        },
      });
      return;
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, { displayName: name, photoURL: photoURL })
          .then(() => {
            const userInfo = {
              name: name,
              email: email,
              password: password,
              photoURL: photoURL,
              role: role,
              designation: designation,
              salary: salary,
              bank: bank,
              isVerified: isVerified,
              workStatus: workStatus,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  title: "User Created",
                  icon: "success",
                  iconColor: "#76a9fa ",
                  confirmButtonText: "Okay",
                  customClass: {
                    confirmButton: "bg-blue-500 text-white font-body px-32",
                    title: "font-head font-bold text-2xls",
                  },
                });
                navigate("/");
              }
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "oops!",
              icon: "error",
              text: err.message,
              iconColor: "#76a9fa ",
              confirmButtonText: "Okay",
              customClass: {
                confirmButton: "bg-blue-500 text-white font-body px-32",
                title: "font-head font-bold text-2xls",
              },
            });
          });
      })
      .catch((err) => {
        Swal.fire({
          title: "Failed to create user",
          icon: "error",
          iconColor: "#f4ec11",
          text: err.message,
          confirmButtonText: "Okay",
          customClass: {
            confirmButton: "bg-amber-400 text-zinc-800 font-body px-32",
            title: "font-head font-bold text-2xls",
          },
        });
      });
  };
  return (
    <div>
      <div className="w-6/12 mx-auto">
        <h2 className="text-center font-black text-4xl my-5 font-body">
          Sign Up now!
        </h2>
        <div className="gap-5">
          <div className="mb-20">
            <form
              className="card-body font-body grid grid-cols-2"
              onSubmit={handleSignUp}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  placeholder="Your name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>

                <input
                  type="file"
                  placeholder="Photo"
                  name="photo"
                  required
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  name="role"
                  required
                  className="input input-bordered w-full"
                  defaultValue=""
                  onChange={handleRoleChange}
                >
                  <option disabled value="">
                    Select
                  </option>
                  <option value="hr">HR</option>
                  <option value="employee">Employee</option>
                </select>
              </div>

              {/* Designation select */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Designation</span>
                </label>
                <select
                  name="designation"
                  required
                  className="input input-bordered w-full"
                  defaultValue=""
                  onChange={handleDesignationChange}
                  disabled={designationDisabled}
                >
                  <option disabled value="">
                    Select
                  </option>
                  {Object.keys(salaryData).map((designation) => (
                    <option key={designation} value={designation}>
                      {designation}
                    </option>
                  ))}
                </select>
              </div>

              {/* Salary input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Salary</span>
                </label>
                <input
                  type="text"
                  name="salary"
                  className="input input-bordered"
                  required
                  readOnly
                  value={role === "hr" ? fixedSalary : salary}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bank A/C No.</span>
                </label>
                <input
                  type="text"
                  placeholder="Bank account number"
                  name="bank"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={passType === true ? "password" : "text"}
                    placeholder="Your password"
                    name="password"
                    className="input input-bordered w-full"
                    required
                  />
                  {passType ? (
                    <button
                      className=" absolute  top-4 right-4"
                      onClick={() => setpassType(!passType)}
                      type="button"
                    >
                      <IoEyeOutline />
                    </button>
                  ) : (
                    <button
                      className=" absolute top-4 right-4"
                      onClick={() => setpassType(!passType)}
                      type="button"
                    >
                      <IoEyeOffOutline />
                    </button>
                  )}
                </div>
              </div>
              <div className="form-control col-span-2 mt-6">
                <button className="btn  bg-blue-500 hover:bg-zinc-300 border border-zinc-300 hover:border-zinc-400 text-white hover:text-black duration-300 font-body">
                  Sign Up
                </button>
              </div>
            </form>
            <GoogleLogin text={"Sign up with"}></GoogleLogin>
            <h3 className="font-body text-center text-xl">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 font-bold">
                Log in Now
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
