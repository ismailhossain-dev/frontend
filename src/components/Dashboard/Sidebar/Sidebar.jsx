import { useState } from "react";
import { Link } from "react-router"; // Change to react-router-dom if standard
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/booklogo.jpg";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi"; // New close icon for mobile
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
      {/* --- Mobile Screen Navbar (Glassmorphism) --- */}
      <div className="bg-white/80 backdrop-blur-xl text-gray-800 flex justify-between md:hidden border-b border-gray-100 p-4 fixed w-full z-40 shadow-sm">
        <div className="block cursor-pointer p-1 font-bold">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-8 w-8 rounded-lg" />
            <span className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Book Courier
            </span>
          </Link>
        </div>

        <button
          onClick={handleToggle}
          className="p-2 rounded-lg bg-gray-50 text-slate-800 transition-transform active:scale-95 border border-gray-200"
        >
          {isActive ? <HiOutlineX className="h-6 w-6" /> : <AiOutlineBars className="h-6 w-6" />}
        </button>
      </div>

      {/* --- Sidebar Overlay for Mobile --- */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isActive ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleToggle}
      />

      {/* --- Main Sidebar Container --- */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 flex flex-col bg-[#0F172A] text-slate-300 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl border-r border-slate-800
        ${isActive ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* 1. Logo Section */}
        <div className="px-6 py-8 hidden md:block">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 group"
          >
            <div className="relative">
              <img
                src={logo}
                alt="logo"
                className="w-10 h-10 rounded-xl shadow-lg group-hover:rotate-6 transition-transform"
              />
              <div className="absolute -inset-1 bg-blue-500/20 blur opacity-0 group-hover:opacity-100 rounded-full transition-opacity"></div>
            </div>
            <div>
              <h1 className="text-white text-lg font-bold leading-none tracking-tight">
                Book<span className="text-blue-400">Courier</span>
              </h1>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">
                Dashboard
              </span>
            </div>
          </Link>
        </div>

        {/* 2. Navigation Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
          <nav className="space-y-6">
            <div>
              <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[2px] mb-4 flex items-center">
                <span className="w-4 h-[1px] bg-slate-700 mr-2"></span>
                Main Menu
              </p>
              <div className="space-y-1">
                {role === "user" && <CustomerMenu />}
                {role === "librarian" && <SellerMenu />}
                {role === "admin" && <AdminMenu />}
              </div>
            </div>

            {/* Other Sections could go here */}
          </nav>
        </div>

        {/* 3. Footer Section (Profile & Logout) */}
        <div className="p-4 mt-auto border-t border-slate-800/60 bg-slate-900/50">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[2px] mb-4">
            Preferences
          </p>

          <div className="space-y-1">
            <MenuItem icon={FcSettings} label="My Profile" address="/dashboard/profile" />

            <button
              onClick={logOut}
              className="flex w-full items-center px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-300 group"
            >
              <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-red-500/20 transition-colors">
                <GrLogout className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
              <span className="mx-4 font-semibold text-sm">Logout</span>
            </button>
          </div>

          {/* Subtle Role Badge */}
          <div className="mt-4 px-4 py-2 bg-blue-500/5 rounded-lg border border-blue-500/10 flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500">Current Role</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 capitalize">
              {role}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Spacer for Mobile */}
      <div className="md:hidden h-16"></div>
    </>
  );
};

export default Sidebar;
