import { Link, NavLink, Outlet } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsCart4 } from "react-icons/bs";
import { IoCalendarOutline, IoBookmarksOutline, IoExitOutline  } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { PiMoneyWavy, PiQuotes } from "react-icons/pi";
import { HiArrowLeftStartOnRectangle, HiOutlineUserGroup } from "react-icons/hi2";
import "../css/Dashboard.css";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [cart] = useCart();

  const [isAdmin] = useAdmin();
  const logOut = () => {
    logout()
      .then(() => console.log("Logged out Successfully"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="flex">
      <div>
        <div className="w-80 min-h-screen bg-zinc-900 flex flex-col justify-between fixed top-0">
          <div>
            <div className="p-6">
              <Link to="/" className="flex gap-2 items-center">
                {/* <span className="w-12"><Lottie animationData={logo} loop={true} /></span> */}
                <span className="flex flex-col -space-y-5 justify-center">
                  <span className="logo-1 text-2xl text-white relative z-20">
                    Rice & Spice
                  </span>
                  <span className="logo-2 text-5xl text-amber-400 z-10`">
                    House
                  </span>{" "}
                </span>
              </Link>
            </div>
            <div className="p-4">
              <ul className="dash-nav *:text-white hover:*:text-zinc-950 hover:*:bg-amber-400 *:rounded-lg *:py-2 *:px-4 *:mb-2 *:flex *:items-center *:gap-2">
                {isAdmin ? (
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
                ) : (
                  <>
                    <NavLink to="/dashboard/user-home" end>
                      <LuLayoutDashboard />
                      Users Dashboard
                    </NavLink>

                    <NavLink to="/dashboard/cart">
                      <BsCart4 />
                      My Cart ({cart.length})
                    </NavLink>

                    <NavLink to="/dashboard/reservation">
                      <IoCalendarOutline />
                      Reservation
                    </NavLink>
                    <NavLink to="/dashboard/payment-history">
                      <PiMoneyWavy  />
                      Payment History
                    </NavLink>

                    <NavLink to="/dashboard/review">
                      <PiQuotes />
                      Add a Review
                    </NavLink>

                    <NavLink to="/dashboard/my-bookings">
                      <IoBookmarksOutline />
                      My Bookings
                    </NavLink>

                    <NavLink className="" to="/order">
                      <MdOutlineShoppingBag />
                      Order Now
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
            <button type="button" className="text-white tooltip" data-tip="Logout" onClick={logOut}>
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
