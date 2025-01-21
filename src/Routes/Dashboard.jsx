import { Link, NavLink, Outlet } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsCart4 } from "react-icons/bs";
import logo from "../assets/logo.png";
import { CiMoneyCheck1 } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import {
  HiArrowLeftStartOnRectangle,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import "../css/Dashboard.css";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { FaBarsStaggered } from "react-icons/fa6";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [role, isRoleLoading] = useRole();
  const logout = () => {
    logOut()
      .then(() => console.log("Logged out Successfully"))
      .catch((error) => console.log(error.message));
  };
  const activeColor = "text-white bg-red-400";

  return (
    <div className="md:flex">
      <div className="hidden md:block">
        <div className="w-80 h-screen bg-zinc-900 flex flex-col justify-between fixed top-0">
          <div>
            <div className="p-6">
              <Link className="flex gap-2 items-center" to="/">
                {/* <span className="w-12"><Lottie animationData={logo} loop={true} /></span> */}
                <img src={logo} className="mr-3 h-6 sm:h-9" alt="Staffly" />
                <span className="font-bebas text-2xl tracking-widest font-semibold text-white ">
                  Staffly
                </span>{" "}
              </Link>
            </div>
            <div className="p-4">
              <ul className="dash-nav *:text-white hover:*:text-zinc-950 hover:*:bg-blue-400 *:rounded-lg *:py-2 *:px-4 *:mb-2 *:flex *:items-center *:gap-2">
                {role?.admin && (
                  <>
                    <NavLink to="/dashboard/home" end>
                      <LuLayoutDashboard />
                      Admin Dashboard
                    </NavLink>

                    <NavLink to="/dashboard/all-employee-list">
                      <HiOutlineUserGroup />
                      All Employees
                    </NavLink>

                    <NavLink to="/dashboard/payroll">
                      <CiMoneyCheck1 />
                      Payroll
                    </NavLink>
                  </>
                )}
                {role?.hr && (
                  <>
                    <NavLink to="/dashboard/hr-home" end>
                      <LuLayoutDashboard />
                      HR Dashboard
                    </NavLink>
                    <NavLink to="/dashboard/progress" end>
                      <LuLayoutDashboard />
                      Progress
                    </NavLink>
                    <NavLink to="/dashboard/hr-payment" end>
                      <CiMoneyCheck1 />
                      My Payment
                    </NavLink>
                  </>
                )}
                {role?.employee && (
                  <>
                    <NavLink to="/dashboard/work-sheet" end>
                      <LuLayoutDashboard />
                      Work Sheet
                    </NavLink>

                    <NavLink to="/dashboard/payment-history">
                      <BsCart4 />
                      Payment History
                    </NavLink>
                  </>
                )}

                <NavLink className="" to="/">
                  <HiArrowLeftStartOnRectangle />
                  Go to Home
                </NavLink>
              </ul>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-between mt-4 p-6">
            <div className="flex gap-2 items-center ">
              <img
                src={user.photoURL}
                className="h-12 w-12 object-cover rounded-full"
              />
              <div>
                <h2 className="text-white">{user.displayName}</h2>
                <h2 className="text-sm text-zinc-300">{user.email}</h2>
              </div>
            </div>
            <button
              type="button"
              className="text-white tooltip"
              data-tip="Logout"
              onClick={logout}
            >
              <IoExitOutline />
            </button>
          </div>
        </div>
      </div>
      <div className="navbar md:hidden bg-blue-50 border border-blue-200 rounded-xl px-5">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <FaBarsStaggered />
            </div>
            <ul
              tabIndex={0}
              className=" menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-5 space-y-3 shadow *:text-black hover:*:text-zinc-950 hover:*:bg-blue-400 *:rounded-lg *:py-2 *:px-4 *:mb-2 *:flex *:items-center *:gap-2"
            >
              {role?.admin && (
                  <>
                    <NavLink to="/dashboard/home" end>
                      <LuLayoutDashboard />
                      Admin Dashboard
                    </NavLink>

                    <NavLink to="/dashboard/all-employee-list">
                      <HiOutlineUserGroup />
                      All Employees
                    </NavLink>

                    <NavLink to="/dashboard/payroll">
                      <CiMoneyCheck1 />
                      Payroll
                    </NavLink>
                  </>
                )}
                {role?.hr && (
                  <>
                    <NavLink to="/dashboard/hr-home" end>
                      <LuLayoutDashboard />
                      HR Dashboard
                    </NavLink>
                    <NavLink to="/dashboard/progress" end>
                      <LuLayoutDashboard />
                      Progress
                    </NavLink>
                    <NavLink to="/dashboard/hr-payment" end>
                      <CiMoneyCheck1 />
                      My Payment
                    </NavLink>
                  </>
                )}
                {role?.employee && (
                  <>
                    <NavLink to="/dashboard/work-sheet" end>
                      <LuLayoutDashboard />
                      Work Sheet
                    </NavLink>

                    <NavLink to="/dashboard/payment-history">
                      <BsCart4 />
                      Payment History
                    </NavLink>
                  </>
                )}

                <NavLink className="" to="/">
                  <HiArrowLeftStartOnRectangle />
                  Go to Home
                </NavLink>
            
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
      </div>
      <div className="flex-1  p-6 md:ml-80">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
