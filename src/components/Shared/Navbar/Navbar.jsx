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
      {user && (
        <li>
          <NavLink to="/blog" className={navLinkStyles}>
            Blog
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
      {user && (
        <li>
          <NavLink to="/contact" className={navLinkStyles}>
            Contact
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div
        className={`w-full backdrop-blur-xl border-b transition-colors duration-500 shadow-lg 
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
                className={`flex items-center gap-1 p-1 rounded-full border ${
                  theme === "dark" ? "bg-black/20 border-white/5" : "bg-gray-100 border-black/5"
                }`}
              >
                {navbarMenu}
              </ul>
            </nav>

            {/* RIGHT: Actions */}
            <div className="flex items-center justify-end gap-2 md:gap-4 shrink-0">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg border transition-all active:scale-90 ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 text-white"
                    : "bg-black/5 border-black/10 text-slate-900"
                }`}
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
                  className={`flex items-center gap-2 p-1 pl-3 pr-1 rounded-full border transition-all ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10 hover:border-green-500/50"
                      : "bg-black/5 border-black/10 hover:border-green-500/50"
                  }`}
                >
                  <span
                    className={
                      theme === "dark" ? "text-white lg:hidden" : "text-slate-900 lg:hidden"
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
                    className={`absolute right-0 mt-4 w-56 border rounded-2xl shadow-2xl overflow-hidden py-2 z-50 ${
                      theme === "dark" ? "bg-slate-900 border-white/10" : "bg-white border-black/10"
                    }`}
                  >
                    {/* Mobile Links inside Dropdown */}
                    <div className="lg:hidden border-b border-black/5 pb-2 mb-2 text-sm">
                      {/* <Link
                        to="/"
                        className="block px-5 py-2 hover:bg-green-500 hover:text-white transition"
                      >
                        Home
                      </Link> */}
                      {navbarMenu}
                      {/* ... add other mobile links here ... */}
                    </div>

                    {user ? (
                      <>
                        <div
                          className={`px-5 py-3 border-b border-black/5 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                        >
                          <p className="text-sm font-semibold truncate">
                            {user?.displayName || "User"}
                          </p>
                        </div>
                        <button
                          onClick={logOut}
                          className="w-full flex items-center gap-2 px-5 py-3 text-red-500 font-medium hover:bg-red-50 transition-colors"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <div className="p-2 space-y-1">
                        <Link
                          to="/login"
                          className="block px-5 py-2 hover:bg-green-500 hover:text-white rounded-lg"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="block w-full text-center py-2 bg-green-500 text-white rounded-lg font-bold"
                        >
                          Sign Up
                        </Link>
                      </div>
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
