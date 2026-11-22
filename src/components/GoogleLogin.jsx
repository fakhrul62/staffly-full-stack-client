import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Button } from "./ui/button";

const GoogleLogin = ({ text = "Continue with Google" }) => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        axiosPublic
          .post("/users", {
            name: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            role: "employee",
            designation: "Sales Assistant",
            salary: 37500,
            bank: "AJ675HG978",
            isVerified: false,
            workStatus: "active",
          })
          .finally(() => {
            navigate("/dashboard", { replace: true });
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      onClick={handleGoogleSignIn}
      className="w-full h-11 rounded-xl border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium"
    >
      <FcGoogle className="h-5 w-5" />
      <span>{text} Google</span>
    </Button>
  );
};

export default GoogleLogin;
