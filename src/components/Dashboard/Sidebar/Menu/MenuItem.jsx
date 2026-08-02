/* eslint-disable no-unused-vars */
import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `group relative flex items-center px-4 py-3 my-1.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ease-in-out ${
          isActive
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20  font-bold"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Active Indicator Line on the Left */}
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-emerald-400 rounded-r-full shadow-md shadow-emerald-400/50" />
          )}

          {/* Icon */}
          <Icon
            className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
              isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-slate-200"
            }`}
          />

          {/* Label */}
          <span className="ml-3 tracking-wide truncate">{label}</span>
        </>
      )}
    </NavLink>
  );
};

export default MenuItem;