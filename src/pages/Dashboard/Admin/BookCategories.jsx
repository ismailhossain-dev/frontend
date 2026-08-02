import React from "react";
import { FaLayerGroup } from "react-icons/fa";
import { ArrowRight } from "lucide-react";

const BookCategories = ({ data }) => {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10">
      
      {/* Ambient Radial Glow on Hover */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl transition-all duration-500 group-hover:bg-emerald-500/20 group-hover:scale-150 pointer-events-none" />

      <div className="relative z-10">
        {/* Category Icon Container */}
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/80 text-emerald-400 border border-slate-700/50 shadow-inner transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105 group-hover:border-emerald-500/40">
          <FaLayerGroup className="text-xl" />
        </div>

        {/* Category Title */}
        <h3 className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-emerald-400 capitalize">
          {data || "Uncategorized"}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs font-medium text-slate-400 leading-relaxed">
          Manage all books, inventory, and resources listed under this category.
        </p>
      </div>

      {/* Footer Section */}
      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4">
        {/* Active Badge */}
        <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Active Category
        </span>

        {/* Hover Arrow Icon */}
        <div className="p-1.5 rounded-xl bg-slate-800/50 text-slate-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-all duration-300">
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

export default BookCategories;