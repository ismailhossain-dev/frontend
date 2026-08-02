import { useState } from "react";
import { Link, NavLink } from "react-router";
import { AiOutlineMenu } from "react-icons/ai";
import { HiSun, HiMoon } from "react-icons/hi";
import Container from "../Container";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import useTheme from "../../../hooks/useTheme";
import Logo from "../../Logo/Logo";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinkStyles = ({ isActive }) =>
    `whitespace-nowrap px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm flex items-center justify-center ${
      isActive
        ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
        : theme === "dark"
          ? "text-gray-300 hover:bg-white/10 hover:text-white"
          : "text-gray-600 hover:bg-black/5 hover:text-black"
    }`;

  //link
  const navbarMenu = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyles}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-book" className={navLinkStyles}>
          All Books
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navLinkStyles}>
          About
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/dashboard" className={navLinkStyles}>
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div
        className={`w-full backdrop-blur-xl  transition-colors duration-500 shadow-lg 
        ${theme === "dark" ? "bg-slate-900/90 border-white/10" : "bg-white/90 border-black/5"}`}
      >
        <Container>
          <div className="flex flex-row items-center justify-between h-20 md:h-16 gap-2">
            {/* LEFT: Logo */}
            <div className="shrink-0">
              <Logo />
            </div>

            {/* CENTER: Navigation (Desktop) */}
            <nav className="hidden lg:flex items-center justify-center">
              <ul
                className={`flex items-center gap-2 p-1.5 rounded-full border transition-all duration-500 shadow-sm ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 backdrop-blur-md shadow-black/20"
                    : "bg-white/70 border-gray-200 backdrop-blur-md shadow-gray-100"
                }`}
              >
                {navbarMenu}
              </ul>
            </nav>

            {/* RIGHT: Actions */}
            <div className="flex items-center justify-end gap-2 md:gap-4 shrink-0">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl transition-all duration-300 active:scale-90 ${
                  theme === "dark"
                    ? "bg-white/5 hover:bg-white/10 text-yellow-400"
                    : "bg-black/5 hover:bg-black/10 text-blue-600"
                }`}
              >
                {theme === "dark" ? (
                  <HiSun className="text-xl" />
                ) : (
                  <HiMoon className="text-xl" />
                )}
              </button>

              {/* Profile / Dropdown */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center gap-2 p-1 pl-3 pr-1 rounded-full border transition-all ${
                      theme === "dark"
                        ? "bg-white/5 border-white/10 hover:border-green-500/50"
                        : "bg-black/5 border-green-500/50"
                    }`}
                  >
                    <span
                      className={
                        theme === "dark"
                          ? "text-white lg:hidden"
                          : "text-slate-900 lg:hidden"
                      }
                    >
                      <AiOutlineMenu />
                    </span>
                    <img
                      className="rounded-full w-8 h-8 object-cover border border-white/20"
                      src={user?.photoURL || avatarImg}
                      alt="profile"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div
                      className={`absolute right-0 mt-3 w-64 border rounded-2xl shadow-2xl overflow-hidden p-1.5 z-50 animate-in fade-in slide-in-from-top-3 duration-200 ${
                        theme === "dark"
                          ? "bg-slate-900/95 border-slate-800 backdrop-blur-md text-gray-200"
                          : "bg-white/95 border-gray-100 backdrop-blur-md text-gray-800"
                      }`}
                    >
                      {/* 1. Mobile Links inside Dropdown */}
                      <div className="lg:hidden border-b border-gray-100 dark:border-slate-800 pb-1.5 mb-1.5">
                        <p className="px-3.5 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                          Navigation
                        </p>
                        <ul className="flex flex-col gap-1 list-none pl-0 m-0">
                          {navbarMenu}
                        </ul>
                      </div>

                      {/* 2. User Logged In State */}
                      {user ? (
                        <>
                          {/* User Info Card */}
                          <div className="px-3.5 py-2.5 mb-1.5 rounded-xl bg-gray-50 dark:bg-slate-950/40 border border-gray-100/50 dark:border-slate-800/50 flex items-center gap-3">
                            <div className="relative shrink-0">
                              <img
                                className="w-9 h-9 rounded-full object-cover ring-2 ring-green-500/20"
                                src={user?.photoURL || avatarImg}
                                alt="user profile"
                              />
                              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-slate-900" />
                            </div>
                            <div className="truncate">
                              <p className="text-xs text-gray-400 font-medium">
                                Welcome back,
                              </p>
                              <p className="text-sm font-bold truncate text-gray-800 dark:text-gray-200">
                                {user?.displayName || "User"}
                              </p>
                            </div>
                          </div>

                          {/* Action Menu Links */}
                          <div className="space-y-0.5">
                            <Link
                              to="/dashboard/profile"
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                                theme === "dark"
                                  ? "hover:bg-slate-800 text-gray-300 hover:text-white"
                                  : "hover:bg-gray-100 text-gray-600 hover:text-black"
                              }`}
                            >
                              {/* react-icons/hi থেকে HiOutlineUser ব্যবহার করতে পারেন */}
                              <svg
                                className="w-4 h-4 text-gray-400 group-hover:text-current"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              My Profile
                            </Link>

                            {/* Logout Button */}
                            <button
                              onClick={() => {
                                logOut();
                                setIsOpen(false);
                              }}
                              className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm text-red-500 font-semibold rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-200 text-left"
                            >
                              {/* react-icons/hi থেকে HiOutlineLogOut ব্যবহার করতে পারেন */}
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                              Logout
                            </button>
                          </div>
                        </>
                      ) : (
                        /* 3. User Logged Out State (Auth Buttons) */
                        <div className="p-1 space-y-1">
                          <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2.5 text-center text-sm font-medium rounded-xl transition ${
                              theme === "dark"
                                ? "hover:bg-slate-800 text-white"
                                : "hover:bg-gray-100 text-slate-900"
                            }`}
                          >
                            Login
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <li>
                  <NavLink to="/login" className="btn">
                    Login
                  </NavLink>
                </li>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
