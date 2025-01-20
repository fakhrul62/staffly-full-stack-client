import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import GoogleLogin from "../components/GoogleLogin";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const { signInUser, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [passType, setpassType] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [loginEmail, setLoginEmail] = useState("");
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
      // Invalidate the previous query cache
      queryClient.invalidateQueries(["userStatus"]);
      
      // Directly fetch user data
      const userData = await fetchUserData(formEmail);
      
      if (!userData) {
        throw new Error("User not found");
      }

      if (userData.workStatus === "inactive") {
        Swal.fire({
          title: "Account Inactive",
          text: "Your account is inactive. Please contact the administrator.",
          icon: "error",
          iconColor: "#FF0000",
          confirmButtonText: "Okay",
          customClass: {
            confirmButton: "bg-red-500 text-white font-body px-32",
            title: "font-head font-bold text-2xls",
          },
        });
        return;
      }

      // If we get here, the account is active, proceed with login
      await signInUser(formEmail, formPassword);
      
      navigate(location?.state ? location?.state : "/");
      
      Swal.fire({
        title: "Logged in!",
        icon: "success",
        iconColor: "#76a9fa",
        confirmButtonText: "Okay",
        customClass: {
          confirmButton: "bg-blue-500 text-white font-body px-32",
          title: "font-head font-bold text-2xls",
        },
      });
    } catch (error) {
      console.error("Login process error:", error);
      Swal.fire({
        title: error.message === "User not found" ? "User Not Found" : "Login Error",
        text: error.message === "User not found" 
          ? "Please check your email or register if you're new."
          : "Invalid credentials. Please try again.",
        icon: "error",
        iconColor: "#76a9fa",
        confirmButtonText: "Okay",
        customClass: {
          confirmButton: "bg-blue-500 text-white font-body px-32",
          title: "font-head font-bold text-2xls",
        },
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

    setLoginEmail(formEmail);
    await checkUserStatusAndLogin(formEmail, formPassword);
    
    // Clear form after attempt
    form.reset();
  };

  return (
    <div>
      <div className="w-6/12 mx-auto">
        <h2 className="text-center font-black text-4xl my-5 font-body">
          Sign In
        </h2>
        <div className="mt-5 mb-20">
          <form className="card-body font-body" onSubmit={handleSignIn}>
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
                    className="absolute top-4 right-4"
                    onClick={() => setpassType(!passType)}
                    type="button"
                  >
                    <IoEyeOutline />
                  </button>
                ) : (
                  <button
                    className="absolute top-4 right-4"
                    onClick={() => setpassType(!passType)}
                    type="button"
                  >
                    <IoEyeOffOutline />
                  </button>
                )}
              </div>
            </div>
            <div className="form-control mt-6">
              <button 
                className="btn bg-blue-500 hover:bg-zinc-300 border border-zinc-300 hover:border-zinc-400 text-white hover:text-black duration-300 font-body"
                disabled={isCheckingStatus}
              >
                {isCheckingStatus ? "Checking..." : "Log In"}
              </button>
            </div>
          </form>
          <GoogleLogin text={"Sign in with"}></GoogleLogin>
          <h3 className="font-body text-center text-xl">
            New to this site?{" "}
            <Link to="/register" className="text-blue-500 font-bold">
              Register Now
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;