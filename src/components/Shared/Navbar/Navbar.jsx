import { useState } from "react";
import { Link, NavLink } from "react-router"; // react-router-dom use kora better
import { AiOutlineMenu } from "react-icons/ai";
import { HiSun, HiMoon } from "react-icons/hi";
import Container from "../Container";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import bookLogo from "../../../assets/images/booklogo.jpg";
import useTheme from "../../../hooks/useTheme";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinkStyles = ({ isActive }) =>
    `relative px-5 py-2 rounded-full transition-all duration-300 font-medium text-sm flex items-center justify-center ${
      isActive
        ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
        : theme === "dark"
          ? "text-gray-300 hover:bg-white/10 hover:text-white"
          : "text-gray-600 hover:bg-black/5 hover:text-black"
    }`;

  return (
    // fixed top-0 left-0 w-full deya hoyeche jate width 100% hoy
    <div className="fixed top-0 left-0 w-full z-50">
      <div
        className={`w-full backdrop-blur-xl border-b transition-colors duration-500 shadow-lg 
        ${theme === "dark" ? "bg-slate-900/90 border-white/10" : "bg-white/90 border-black/5"}`}
      >
        <Container>
          <div className="flex flex-row items-center justify-between h-16">
            {/* LEFT: Logo */}
            <div className="flex-1 flex justify-start">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 overflow-hidden rounded-lg border border-white/20">
                  <img
                    src={bookLogo}
                    alt="logo"
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <h2
                  className={`text-lg font-extrabold tracking-tight hidden sm:block ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                >
                  Book<span className="text-green-500">Courier</span>
                </h2>
              </Link>
            </div>

            {/* CENTER: Navigation (Desktop) */}
            <nav className="hidden md:flex flex-[2] justify-center">
              <ul
                className={`flex items-center gap-2 p-1.5 rounded-full border ${theme === "dark" ? "bg-black/20 border-white/5" : "bg-gray-100 border-black/5"}`}
              >
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
                {user && (
                  <li>
                    <NavLink to="/dashboard" className={navLinkStyles}>
                      Dashboard
                    </NavLink>
                  </li>
                )}
                {!user && (
                  <li>
                    <NavLink to="/login" className={navLinkStyles}>
                      Login
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>

            {/* RIGHT: Actions */}
            <div className="flex-1 flex items-center justify-end gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg border transition-all active:scale-90 ${theme === "dark" ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10 text-slate-900"}`}
              >
                {theme === "dark" ? (
                  <HiSun className="text-xl text-yellow-400" />
                ) : (
                  <HiMoon className="text-xl text-blue-400" />
                )}
              </button>

              {/* Profile / Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`flex items-center gap-2 p-1 pl-3 pr-1 rounded-full border transition-all ${theme === "dark" ? "bg-white/5 border-white/10 hover:border-green-500/50" : "bg-black/5 border-black/10 hover:border-green-500/50"}`}
                >
                  <span
                    className={
                      theme === "dark" ? "text-white md:hidden" : "text-slate-900 md:hidden"
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
                    className={`absolute right-0 mt-4 w-56 border rounded-2xl shadow-2xl overflow-hidden py-2 z-50 ${theme === "dark" ? "bg-slate-900 border-white/10" : "bg-white border-black/10"}`}
                  >
                    <div className="md:hidden border-b border-black/5 pb-2 mb-2 text-sm">
                      <Link
                        to="/"
                        className={`block px-5 py-3 hover:bg-green-500 hover:text-white ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Home
                      </Link>
                      <Link
                        to="/all-book"
                        className={`block px-5 py-3 hover:bg-green-500 hover:text-white ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                      >
                        All Books
                      </Link>
                      <Link
                        to="/dashboard"
                        className={`block px-5 py-3 hover:bg-green-500 hover:text-white ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                      >
                        Dashboard
                      </Link>
                    </div>

                    {user ? (
                      <>
                        {/* User Name Section */}
                        <div
                          className={`px-5 py-4 border-b border-gray-100 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                        >
                          <p className="text-sm font-semibold truncate">
                            {user?.displayName || "User Name"}
                          </p>
                        </div>

                        {/* Logout Button */}
                        <button
                          onClick={logOut}
                          className="w-full flex items-center gap-2 px-5 py-3 text-red-500 font-medium hover:bg-red-50 transition-colors"
                        >
                          {/* Optional: Logout Icon (React Icons ba SVG use korte paren) */}
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className={`block px-5 py-3 hover:bg-green-500 hover:text-white transition ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Login
                        </Link>
                        <div className="px-4 py-2">
                          <Link
                            to="/signup"
                            className="block w-full text-center py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition"
                          >
                            Sign Up
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
