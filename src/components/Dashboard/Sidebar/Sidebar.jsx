import { useState } from "react";
import { Link } from "react-router"; // react-router-dom ব্যবহার করলে সে অনুযায়ী বদলে নিন
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/booklogo.jpg";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import useRole from "../../../hooks/useRole";
import Logo from "../../Logo/Logo";

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role] = useRole();

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* ─── 1. MOBILE TOP NAVBAR ─── */}
      <div className="bg-slate-900/80 backdrop-blur-xl text-slate-800  flex justify-between items-center md:hidden border-b  border-slate-800 p-4 fixed top-0 left-0 w-full z-40 shadow-sm">
        <div className="block cursor-pointer p-1 font-bold">
          <Logo />
        </div>

        <button
          onClick={handleToggle}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 transition-transform active:scale-95 border border-slate-200 dark:border-slate-700"
        >
          {isActive ? <HiOutlineX className="h-6 w-6" /> : <AiOutlineBars className="h-6 w-6" />}
        </button>
      </div>

      {/* ─── 2. DESKTOP TOP HEADER (ONLY FOR MD/LG SCREENS) ─── */}
      <header className="hidden md:flex fixed top-0 right-0 left-72 h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 z-30 px-8 items-center justify-between transition-all duration-300 ">
        <div>
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Welcome back, <span className="text-slate-900 dark:text-slate-100 font-bold">{user?.displayName || "User"}</span> 👋
          </h2>
        </div>

        {/* Right Side User Info / Profile Section */}
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-3 p-1.5 pl-3 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 hover:border-emerald-500/40 transition-all duration-300 group"
          >
            <div className="text-right leading-tight hidden sm:block">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-500 transition-colors">
                {user?.displayName || "Profile"}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
                {role || "Member"}
              </p>
            </div>
            <img
              src={user?.photoURL || "https://i.ibb.co/mR4qB8S/avatar.png"}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover border border-emerald-500/50 shadow-sm"
            />
          </Link>
        </div>
      </header>

      {/* ─── 3. SIDEBAR OVERLAY FOR MOBILE ─── */}
      <div
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isActive ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleToggle}
      />

      {/* ─── 4. MAIN SIDEBAR CONTAINER ─── */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 flex flex-col bg-[#0F172A] text-slate-300 transition-transform duration-300 ease-in-out shadow-2xl border-r border-slate-800
        ${isActive ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="px-6 pt-8 pb-6">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 group"
          >
            <div className="relative">
              <img
                src={logo}
                alt="logo"
                className="w-10 h-10 rounded-xl shadow-lg group-hover:rotate-6 transition-transform"
              />
              <div className="absolute -inset-1 bg-emerald-500/20 blur opacity-0 group-hover:opacity-100 rounded-full transition-opacity"></div>
            </div>
            <div>
              <h1 className="text-emerald-500 text-lg font-extrabold leading-none tracking-tight">
                BookCourier
              </h1>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">
                Dashboard
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
          <nav className="space-y-6">
            <div>
              <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[2px] mb-4 flex items-center">
                <span className="w-4 h-[1px] bg-slate-700 mr-2"></span>
                Main Menu
              </p>
              <div className="space-y-1">
                {role === "user" && <CustomerMenu />}
                {role === "admin" && <AdminMenu />}
              </div>
            </div>
          </nav>
        </div>

        {/* Footer Section (Profile & Logout) */}
        <div className="p-4 mt-auto border-t border-slate-800/60 bg-slate-900/50">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[2px] mb-3">
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

          {/* Role Badge */}
          <div className="mt-4 px-4 py-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10 flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500">Current Role</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 capitalize">
              {role || "User"}
            </span>
          </div>
        </div>
      </aside>

      {/* Spacer for Mobile Top Navbar */}
      <div className="md:hidden h-16"></div>
      
      {/* Spacer for Desktop Top Header */}
      <div className="hidden md:block h-16"></div>
    </>
  );
};

export default Sidebar;