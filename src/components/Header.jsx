import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { PiUserCircleLight } from "react-icons/pi";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";
import useRole from "../hooks/useRole";

const Header = () => {
  const { user, logOut } = useAuth();
  const [role, isRoleLoading ] = useRole();
  const li = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      {user && role?.admin && (
        <>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/dashboard/home">Dashboard</NavLink>
        </>
      )}
      {user && role?.hr && (
        <>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/dashboard/hr-home">Dashboard</NavLink>
        </>
      )}
      {user && role?.employee && (
        <>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/dashboard/user-home">Dashboard</NavLink>
        </>
      )}
      
    </>
  );
  const logout = () => {
    logOut()
      .then(() => console.log("Logged out Successfully"))
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="fixed top-0 left-0 w-full px-5 pt-5 z-50 transition-all duration-300">
      <div className="navbar bg-blue-50 border border-blue-200 rounded-xl px-5">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <FaBarsStaggered />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {li}
            </ul>
          </div>
          <Link className="flex gap-2 items-center">
            {/* <span className="w-12"><Lottie animationData={logo} loop={true} /></span> */}
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Staffly" />
            <span className="font-body text-xl font-semibold dark:text-white ">
              Staffly
            </span>{" "}
          </Link>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 *:text-black gap-5 items-center">
            {li}
            {user ? (
              <Link className="flex items-center gap-2">
                <span>
                  <img
                    src={user.photoURL}
                    className="h-10 w-10 object-cover rounded-xl"
                  />
                </span>
                <button
                  onClick={logout}
                  className="bg-transparent hover:bg-white duration-300 text-2xl gap-2 text-blue-500 flex items-center px-3 py-2 border border-blue-500 rounded-xl"
                  type="button"
                >
                  {" "}
                  <span className="text-base">Logout</span>{" "}
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button
                  className="bg-transparent hover:bg-white duration-300 text-2xl gap-2 text-blue-500 flex items-center px-3 py-2 border border-blue-500 rounded-xl"
                  type="button"
                >
                  <PiUserCircleLight /> <span className="text-base">Login</span>{" "}
                </button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
