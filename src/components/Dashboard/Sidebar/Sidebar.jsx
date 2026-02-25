import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/booklogo.jpg";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import SellerMenu from "./Menu/SellerMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import useRole from "../../../hooks/useRole";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role] = useRole();

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Mobile Screen Navbar */}
      <div className="bg-white/80 backdrop-blur-md text-gray-800 flex justify-between md:hidden border-b p-3 fixed w-full z-20">
        <div>
          <Link to="/" className="flex items-center gap-x-2">
            <img src={logo} alt="logo" className="h-10 w-10 rounded-xl shadow-md" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Book Courier
            </span>
          </Link>
        </div>

        <button
          onClick={handleToggle}
          className="p-2 rounded-lg focus:outline-none focus:bg-gray-100 transition-colors"
        >
          <AiOutlineBars className="h-6 w-6 text-slate-800" />
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isActive && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 md:hidden"
          onClick={handleToggle}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`z-30 md:fixed flex flex-col justify-between overflow-x-hidden bg-slate-900 w-72 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform 
        ${!isActive ? "-translate-x-full" : "translate-x-0"} 
        md:translate-x-0 transition-all duration-300 ease-in-out shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="hidden md:block">
            <div className="w-full flex px-4 py-3 shadow-inner rounded-2xl justify-center items-center bg-purple-600/10 border border-purple-500/20 mx-auto">
              <Link to="/" className="flex items-center justify-center gap-x-3">
                <img
                  src={logo}
                  alt="logo"
                  className="w-10 h-10 rounded-lg shadow-lg ring-2 ring-purple-500/50"
                />
                <h1 className="text-white text-xl font-bold tracking-tight">
                  Book<span className="text-purple-400">Courier</span>
                </h1>
              </Link>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col justify-between flex-1 mt-8">
            <nav className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-4 mb-4">
                Main Menu
              </div>
              {role === "user" && <CustomerMenu />}
              {role === "librarian" && <SellerMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>

          {/* Bottom Profile & Logout Section */}
          <div className="pt-6 border-t border-slate-800">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-4 mb-4">
              Preferences
            </div>

            <MenuItem icon={FcSettings} label="Profile" address="/dashboard/profile" />

            <button
              onClick={logOut}
              className="flex w-full items-center px-4 py-3 mt-4 text-slate-300 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-300 group"
            >
              <GrLogout className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="mx-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
