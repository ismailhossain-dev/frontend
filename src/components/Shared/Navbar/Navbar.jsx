import { useState } from "react";
import { Link, NavLink } from "react-router";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Container from "../Container";
import useAuth from "../../../hooks/useAuth";
import useThem from "../../../hooks/useThem";
import avatarImg from "../../../assets/images/placeholder.jpg";
import bookLogo from "../../../assets/images/booklogo.jpg";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useThem();

  // Professional Navigation Links Styling
  const navLinkStyles = ({ isActive }) =>
    `relative px-5 py-2 rounded-full transition-all duration-300 font-medium text-sm flex items-center justify-center ${
      isActive
        ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
        : "text-gray-300 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="fixed w-full z-50 ">
      {" "}
      {/* Added padding for "Floating" effect */}
      <div className=" mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        <Container>
          <div className="flex flex-row items-center justify-between py-3 h-16">
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
                <h2 className="text-white text-lg font-extrabold tracking-tight hidden sm:block">
                  Book<span className="text-green-500">Courier</span>
                </h2>
              </Link>
            </div>

            {/* CENTER: Navigation (Desktop) */}
            <nav className="hidden md:flex flex-[2] justify-center">
              <ul className="flex items-center gap-2 bg-black/20 p-1.5 rounded-full border border-white/5">
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
              </ul>
            </nav>

            {/* RIGHT: Actions */}
            <div className="flex-1 flex items-center justify-end gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={() => toggleTheme(theme === "light" ? "dark" : "light")}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-yellow-400 hover:bg-white/10 transition-all"
              >
                {theme === "dark" ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Profile / Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 p-1 pl-3 pr-1 rounded-full bg-white/5 border border-white/10 hover:border-green-500/50 transition-all"
                >
                  <span className="text-white md:hidden">
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
                  <div className="absolute right-0 mt-4 w-56 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 animate-in slide-in-from-top-2 duration-200">
                    <div className="md:hidden border-b border-white/5 pb-2 mb-2">
                      <Link
                        to="/"
                        className="block px-5 py-3 text-gray-300 hover:bg-green-500 hover:text-white transition"
                      >
                        Home
                      </Link>
                      <Link
                        to="/all-book"
                        className="block px-5 py-3 text-gray-300 hover:bg-green-500 hover:text-white transition"
                      >
                        All Books
                      </Link>
                    </div>

                    {user ? (
                      <>
                        <div className="px-5 py-2 mb-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                          User Menu
                        </div>
                        <Link
                          to="/dashboard"
                          className="block px-5 py-3 text-gray-300 hover:bg-green-500 hover:text-white transition"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={logOut}
                          className="w-full text-left px-5 py-3 text-red-400 hover:bg-red-500 hover:text-white transition"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-5 py-3 text-gray-300 hover:bg-green-500 hover:text-white transition"
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
