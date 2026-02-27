import React from "react";
import { Link } from "react-router";
import bookLogo from "../../assets/images/booklogo.jpg";

const Logo = ({ theme = "light", size = 40 }) => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      {/* Logo Icon */}
      <div
        className={`overflow-hidden rounded-lg border border-white/20`}
        style={{ width: size, height: size }}
      >
        <img
          src={bookLogo}
          alt="logo"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Logo Text */}
      <h2
        className={`text-lg font-extrabold tracking-tight hidden sm:block dark:text-white ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}
      >
        Book<span className="text-green-500">Courier</span>
      </h2>
    </Link>
  );
};

export default Logo;
