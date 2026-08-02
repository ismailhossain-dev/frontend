import React, { useState } from "react";
import { Link } from "react-router";
import {
  FiArrowUpRight,
  FiEye,
  FiStar,
  FiLayers,
  FiHeart,
} from "react-icons/fi";
import WishlistButton from "../buttons/WishlistButton/WishlistButton";

const Card = ({ book }) => {
  const {
    _id,
    name,
    image,
    shortDescription,
    price,
    category,
    rating,
    location,
    date,
    title,
  } = book;

  



  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-green-500/10 p-3.5">
      
      {/* 1. Image Section */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-slate-100 dark:bg-slate-800">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={image}
          alt={name || title}
        />

        {/* Floating Badges & Wishlist Button */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
          {/* Category Badge */}
          <div className="flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm">
            <FiLayers className="text-green-500 size-3" />
            <span className="text-slate-800 dark:text-gray-100 text-[10px] font-bold uppercase tracking-wider">
              {category}
            </span>
          </div>

          {/* Heart / Wishlist Button */}
          <WishlistButton book={book} />
        </div>

        {/* Rating Badge (Bottom Left of Image) */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-slate-900/80 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded-xl text-xs font-bold border border-white/10 shadow-lg">
          <FiStar fill="currentColor" size={13} />
          <span className="text-white text-[11px]">{rating}</span>
        </div>

        {/* Hover Quick View Overlay */}
        <Link
          to={`/book/${_id}`}
          className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]"
        >
          <div className="bg-white dark:bg-slate-900 text-green-500 p-3.5 rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <FiArrowUpRight size={22} />
          </div>
        </Link>
      </div>

      {/* 2. Content Section */}
      <div className="mt-4 flex flex-col flex-grow px-1.5">
        {/* Book Title */}
        <Link to={`/book/${_id}`}>
          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-1 hover:text-green-500 transition-colors">
            {name || title}
          </h3>
        </Link>

        {/* Subtitle / Short Description */}
        {(shortDescription || title) && (
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed font-normal">
            {shortDescription || title}
          </p>
        )}

        {/* 3. Pricing & Footer Action */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800/80 mt-3">
          {/* Price */}
          <div className="flex items-baseline gap-0.5 text-green-600 dark:text-green-400">
            <span className="text-xs font-semibold">$</span>
            <span className="text-xl font-extrabold tracking-tight">{price}</span>
          </div>

          {/* Action Button */}
          <Link
            to={`/book/${_id}`}
            className="flex items-center gap-1.5 bg-green-500  hover:bg-green-600 text-white px-4 py-2.5 rounded-xl font-semibold text-xs transition-all duration-300 active:scale-95 shadow-sm"
          >
            <span>Details</span>
            <FiEye size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;