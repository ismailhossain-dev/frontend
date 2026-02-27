import React, { useState } from "react";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import {
  FiBookOpen,
  FiUser,
  FiTruck,
  FiInfo,
  FiMapPin,
  FiStar,
  FiCalendar,
  FiArrowLeft,
} from "react-icons/fi";
import { Link } from "react-router";

const BookDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books/${id}`);
      return result.data;
    },
  });

  const closeModal = () => setIsOpen(false);

  if (isLoading) return <LoadingSpinner />;

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
    seller,
    quantity,
  } = book;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f1a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-green-500 transition-colors mb-8 font-bold group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Collection</span>
        </Link>

        <div className="bg-white dark:bg-[#121826] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/5 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* LEFT: Image Section */}
            <div className="lg:w-5/12 p-8 lg:p-12 flex items-center justify-center bg-gray-50/50 dark:bg-slate-800/10">
              <div className="relative w-full max-w-md group">
                {/* Floating Rating Badge */}
                <div className="absolute -top-4 -right-4 z-10 bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-4 flex flex-col items-center border border-gray-100 dark:border-white/10">
                  <FiStar className="text-yellow-400 fill-yellow-400 mb-1" size={24} />
                  <span className="text-xl font-black text-slate-800 dark:text-white">
                    {rating}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Rating
                  </span>
                </div>

                {/* Main Image */}
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 transition-transform duration-500 group-hover:scale-[1.02]">
                  <img className="object-cover h-full w-full" src={image} alt={name} />
                </div>

                {/* Decoration */}
                <div className="absolute -bottom-6 -left-6 h-32 w-32 bg-green-500/10 rounded-full blur-3xl -z-10"></div>
              </div>
            </div>

            {/* RIGHT: Content Area */}
            <div className="lg:w-7/12 p-8 lg:p-16 flex flex-col">
              {/* Header: Category & Title */}
              <div className="mb-8">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 w-max rounded-full mb-4">
                  <FiBookOpen size={14} />
                  <span className="text-xs font-black uppercase tracking-widest">{category}</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-slate-800 dark:text-white leading-[1.1]">
                  {name}
                </h1>
              </div>

              {/* Price & Availability */}
              <div className="flex flex-wrap items-center gap-6 mb-10 pb-10 border-b border-gray-100 dark:border-white/5">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                    Price
                  </span>
                  <span className="text-5xl font-black text-green-500">${price}</span>
                </div>

                <div className="h-10 w-[1px] bg-gray-200 dark:bg-gray-800 hidden sm:block"></div>

                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                    Availability
                  </span>
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${quantity > 0 ? "border-green-500/20 bg-green-500/5 text-green-500" : "border-red-500/20 bg-red-500/5 text-red-500"}`}
                  >
                    <div
                      className={`h-2 w-2 rounded-full animate-pulse ${quantity > 0 ? "bg-green-500" : "bg-red-500"}`}
                    ></div>
                    <span className="text-sm font-black uppercase tracking-tight">
                      {quantity > 0 ? `${quantity} Copies left` : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-10">
                <h3 className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-black text-sm uppercase tracking-widest mb-4">
                  <FiInfo className="text-green-500" /> Book Summary
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg italic">
                  "{shortDescription}"
                </p>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <div className="group p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-white/5 hover:border-green-500/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl text-green-500 shadow-sm group-hover:scale-110 transition-transform">
                      <FiUser size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                        Collector/Seller
                      </p>
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        {seller?.name || "Official Hub"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-white/5 hover:border-green-500/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl text-green-500 shadow-sm group-hover:scale-110 transition-transform">
                      <FiMapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                        Location
                      </p>
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        {location || "Dhaka, BD"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Section */}
              <div className="mt-auto flex flex-col sm:flex-row items-center gap-4">
                <button
                  disabled={quantity <= 0}
                  onClick={() => setIsOpen(true)}
                  className={`w-full sm:flex-1 py-5 rounded-[1.5rem] font-black text-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl
                      ${
                        quantity > 0
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-green-500/30 hover:-translate-y-1 active:scale-95"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                      }
                    `}
                >
                  {quantity > 0 ? "Purchase This Book" : "Out of Stock"}
                  <FiTruck className={quantity > 0 ? "animate-bounce" : ""} />
                </button>

                <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-slate-800 rounded-2xl">
                  <FiCalendar className="text-green-500" />
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Listed on: {new Date(date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Purchase Modal */}
              <PurchaseModal book={book} closeModal={closeModal} isOpen={isOpen} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
