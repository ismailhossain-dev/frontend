import React from "react";
import { FaLayerGroup, FaArrowRight } from "react-icons/fa";

const BookCategories = ({ data }) => {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10">
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-indigo-50 opacity-50 transition-transform duration-500 group-hover:scale-150" />

      <div className="relative z-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition-transform duration-500 group-hover:rotate-12">
          <FaLayerGroup className="text-xl" />
        </div>

        <h3 className="text-xl font-bold tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors capitalize">
          {data}
        </h3>
        <p className="mt-2 text-sm font-medium text-slate-500">
          Manage all books and resources under this category.
        </p>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active Section
        </span>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-0 bg-indigo-600 transition-all duration-500 group-hover:w-full" />
    </div>
  );
};

export default BookCategories;
