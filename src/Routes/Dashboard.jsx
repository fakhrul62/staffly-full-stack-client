import { Link, NavLink, Outlet } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsCart4 } from "react-icons/bs";
import logo from "../assets/logo.png";
import {
  IoCalendarOutline,
  IoBookmarksOutline,
  IoExitOutline,
} from "react-icons/io5";
import {
  HiArrowLeftStartOnRectangle,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import "../css/Dashboard.css";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [role, isRoleLoading ] = useRole();
  const logout = () => {
    logOut()
      .then(() => console.log("Logged out Successfully"))
      .catch((error) => console.log(error.message));
  };
  const activeColor = "text-white bg-red-400";

  return (
    <div className="flex">
      <div>
        <div className="w-80 min-h-screen bg-zinc-900 flex flex-col justify-between fixed top-0">
          <div>
            <div className="p-6">
              <Link className="flex gap-2 items-center" to="/">
                {/* <span className="w-12"><Lottie animationData={logo} loop={true} /></span> */}
                <img src={logo} className="mr-3 h-6 sm:h-9" alt="Staffly" />
                <span className="font-body text-xl font-semibold text-white ">
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

                    <NavLink to="/dashboard/add-item">
                      <BsCart4 />
                      Add Items
                    </NavLink>

                    <NavLink to="/dashboard/manage-items">
                      <IoCalendarOutline />
                      Manage Items
                    </NavLink>

                    <NavLink to="/dashboard/manage-bookings">
                      <IoBookmarksOutline />
                      Manage Bookings
                    </NavLink>

                    <NavLink to="/dashboard/all-users">
                      <HiOutlineUserGroup />
                      All Users
                    </NavLink>
                  </>
                )}
                {role?.hr && (
                  <>
                    <NavLink to="/dashboard/hr-home" end>
                      <LuLayoutDashboard />
                      HR Dashboard
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
      <div className="flex-1 p-6 ml-80">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
