import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/booklogo.jpg";
// Icons
// import bookLogo from "../../../../assets/booklogo.jpg"
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";

// User Menu
import MenuItem from "./Menu/MenuItem"; 
import AdminMenu from "./Menu/AdminMenu";
import SellerMenu from "./Menu/SellerMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import useRole from "../../../hooks/useRole";
// import useRole from "../../../hooks/useRole";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [ role] = useRole();
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar, only visible till md breakpoint */}
      {/* <MdMenu size={50} className="hidden text-red-700 sm:block "/> */}
     <div  className="">
     

       <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/" className="flex items-center justify-center gap-x-2">
              <img src={logo} alt="logo" className="h-15 w-15 rounded-full"  />
              <h1 className="text-blue-500 text-2xl text-semibold">Book Courier</h1>
              
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-slate-900  w-70 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Top Content */}
          <div>
            {/* Logo */}
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-purple-700 mx-auto">
              <Link to="/" className="flex items-center justify-center gap-x-2">
                <img src={logo} alt="logo" className="w-12 h-12 rounded-full" />
                <h1 className="text-white text-2xl font-semibold">Book Courier</h1>
              </Link>
            </div>
          </div>

          {/* Middle Content */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/*  Menu Items */}
            <nav>
              {/* seler role er selle role dekabo and customer er jorno customer menu dekabo admin er jorno admin menu dekabo  */}
              {role === 'user' && <CustomerMenu/>}
              {role === 'librarian' && <SellerMenu/>}
              {role === 'admin' && <AdminMenu/>}
            </nav>
          </div>

          {/* Bottom Content */}
          <div>
            <hr />

            <MenuItem icon={FcSettings} label="Profile" address="/dashboard/profile" />
            <button
              onClick={logOut}
              className="flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-white bg-red-500 transition-colors duration-300 transform"
            >
              <GrLogout className="w-5 h-5" />

              <span className="mx-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
     </div>
    </>
  );
};

export default Sidebar;
