import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import bookLogo from "../../../assets/images/booklogo.jpg";
import useThem from "../../../hooks/useThem";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useThem();
 
  return (
    <div className="fixed w-full bg-blue-500 z-10 shadow-sm">
      <div className="py-4 ">
        <Container>

          <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/" className="flex justify-center items-center gap-x-2">
              <img src={bookLogo} alt="logo" className="w-12 h-12 rounded-full" />
              <h2 className="text-white text-2xl font-semibold">Book Courier</h2>
            </Link>

            {/* center */}
            <div >
              <ul className=" flex gap-3">

               <NavLink
                    to="/"
                    className={({ isActive }) =>
                      ` px-4 py-2 rounded transition font-semibold hidden md:block lg:block  ${
                        isActive ? "bg-green-500  text-white" : "text-gray-700 hover:bg-blue-100"
                      }`
                    }
                  >
                    Home
                  </NavLink>
               <NavLink
                    to="/all-book"
                    className={({ isActive }) =>
                      ` px-4 py-2 rounded transition font-semibold hidden md:block lg:block  ${
                        isActive ? "bg-green-500  text-white" : "text-gray-700 hover:bg-blue-100"
                      }`
                    }
                  >
                    All Book
                  </NavLink>
              
               
              
               {user &&  <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      ` px-4 py-2 rounded transition font-semibold hidden md:block lg:block  ${
                        isActive ? "bg-green-500  text-white" : "text-gray-700 hover:bg-blue-100"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>}
              </ul>
              
              {/*  */}
            </div>
           {
            !user &&    <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      ` px-4 py-2 rounded transition font-semibold hidden md:block lg:block  ${
                        isActive ? "bg-green-500  text-white" : "text-gray-700 hover:bg-blue-100"
                      }`
                    }
                  >
                    SignUp
                  </NavLink>

           }
           {
            !user &&    <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      ` px-4 py-2 rounded transition font-semibold hidden md:block lg:block  ${
                        isActive ? "bg-green-500  text-white" : "text-gray-700 hover:bg-blue-100"
                      }`
                    }
                  >
                    Login
                  </NavLink>

           }
            {/* them work  */}
          <label className="swap swap-rotate cursor-pointer mt-3">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={(e) => toggleTheme(e.target.checked)}
        />
        {/* Sun icon */}
        <svg
          className="swap-on w-8 h-8 text-yellow-400 btn "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m8.66-12.34l-.7.7m-12.02 12.02l-.7.7M21 12h-1M4 12H3m16.66 4.66l-.7-.7m-12.02-12.02l-.7-.7M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        {/* Moon icon */}
        <svg
          className="swap-off w-6 h-6 text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3c.132 0 .263.003.393.009a9 9 0 107.608 7.608A8.96 8.96 0 0112 3z"
          />
        </svg>
          </label>
              {/*  */}
            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3  ">
                {/* Dropdown btn */}
        
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  <div className='hidden md:block'>
                    {/* Avatar */}
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-blue-500 transition font-semibold text-pink-500'
                    >
                      Home
                    </Link>
                    <Link
                      to='/all-book'
                      className='block md:hidden px-4 py-3 hover:bg-blue-500 text-pink-500 transition font-semibold'
                    >
                      All Book
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to='/dashboard'
                          className='px-4 py-3 text-pink-500 hover:bg-blue-500 transition font-semibold'
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className='px-4 py-3 text-pink-500 hover:bg-blue-500 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 text-pink-500 hover:bg-blue-500 transition font-semibold'
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 text-pink-500 hover:bg-blue-500 transition font-semibold'
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar;
