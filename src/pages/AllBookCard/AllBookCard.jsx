import React from "react";
import { Link } from "react-router";
import { FiArrowUpRight, FiEye, FiMapPin, FiCalendar, FiStar, FiLayers } from "react-icons/fi";
const AllBookCard = ({ book }) => {
  const { _id, title, name, image, shortDescription, price, category, rating, location, date } =
    book;
  // console.log(allbooks);
  return (
    <div className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] p-4">
      {/* 1. Image Section */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2rem] bg-gray-100 dark:bg-gray-800 shadow-inner">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={image}
          alt={name}
        />

        {/* Floating Badges on Image */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <div className="flex items-center gap-1.5 bg-white/90 dark:bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
            <FiLayers className="text-green-500 size-3" />
            <span className="text-slate-800 dark:text-gray-100 text-[10px] font-bold uppercase tracking-wider">
              {category}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2.5 py-1.5 rounded-2xl text-[11px] font-black shadow-lg">
            <FiStar fill="currentColor" size={12} />
            {rating}
          </div>
        </div>

        {/* Hover Action Overlay */}
        <Link
          to={`/book/${_id}`}
          className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[1px]"
        >
          <div className="bg-white dark:bg-gray-900 p-4 rounded-full text-green-500 shadow-2xl translate-y-8 group-hover:translate-y-0 transition-all duration-500">
            <FiArrowUpRight size={24} />
          </div>
        </Link>
      </div>

      {/* 2. Content Section */}
      <div className="mt-6 flex flex-col flex-grow px-2">
        {/* Title */}
        <Link to={`/book/${_id}`}>
          <h3 className="font-black text-slate-800 dark:text-gray-50 text-xl line-clamp-1 leading-tight group-hover:text-green-500 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Short Description - Added here for better visibility */}
        <h2 className="text-[18px] font-extrabold text-gray-800 dark:text-white tracking-tight leading-tight">
          {title}
        </h2>
        <p className="mt-3 text-sm text-slate-500 dark:text-gray-400 line-clamp-2 leading-relaxed ">
          "{shortDescription}"
        </p>

        {/* Info Row: Location & Date */}
        <div className="mt-5 flex items-center gap-4 border-b border-gray-50 dark:border-gray-800 pb-5">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-gray-400">
            <FiMapPin className="text-green-500" size={14} />
            <span className="text-[11px] font-bold uppercase tracking-tight">{location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-gray-400">
            <FiCalendar className="text-green-500" size={14} />
            <span className="text-[11px] font-bold uppercase tracking-tight">
              {new Date(date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* 3. Pricing & Footer Action */}
        <div className="mt-auto pt-5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">
              Price
            </span>
            <div className="flex items-baseline gap-0.5 text-green-600 dark:text-green-400">
              <span className="text-sm font-bold">$</span>
              <span className="text-2xl font-black leading-none">{price}</span>
            </div>
          </div>

          <Link
            to={`/book/${_id}`}
            className="group/btn relative overflow-hidden flex items-center gap-2 bg-slate-900 dark:bg-green-600 hover:bg-green-500 text-white px-6 py-3.5 rounded-2xl font-bold text-xs transition-all duration-300 active:scale-95 shadow-xl shadow-gray-200 dark:shadow-none"
          >
            <FiEye className="group-hover/btn:rotate-12 transition-transform" size={16} />
            <span>DETAILS</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllBookCard;
