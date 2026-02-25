import React, { useState } from "react";
import Container from "../../components/Shared/Container";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { FiBookOpen, FiUser, FiHash, FiTruck, FiInfo } from "react-icons/fi";

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

  const { image, name, description, quantity, price, seller, category } = book;

  return (
    <div className="min-h-screen  py-10">
      <div className="bg-white dark:bg-[#121826] rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* LEFT: Book Preview Image */}
          <div className="lg:w-2/5 p-6 bg-gray-50 dark:bg-slate-800/20">
            <div className="relative group aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
              <img
                className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                src={image}
                alt={name}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-green-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  {category}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Content Area */}
          <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col">
            {/* Title & Category */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-green-500 mb-2">
                <FiBookOpen />
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">{category}</span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-800 dark:text-white leading-tight">
                {name}
              </h1>
            </div>

            {/* Price & Stock Badge */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-4xl font-black text-green-500">${price}</span>
              <div
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${quantity > 0 ? "border-green-500/20 bg-green-50/50 text-white" : "border-red-500/20 bg-red-50/50 text-red-600"}`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${quantity > 0 ? "bg-green-500" : "bg-red-500"}`}
                ></div>
                <span className="text-sm font-bold">
                  {quantity > 0 ? `${quantity} Copies Available` : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold mb-3">
                <FiInfo className="text-green-500" /> Description
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {description}
              </p>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5">
                <div className="p-3 bg-white dark:bg-slate-700 rounded-xl text-green-500 shadow-sm">
                  <FiUser size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">
                    Librarian / Seller
                  </p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {seller?.name || "Official Store"}
                  </p>
                  <p className="text-xs text-slate-500">{seller?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5">
                <div className="p-3 bg-white dark:bg-slate-700 rounded-xl text-green-500 shadow-sm">
                  <FiTruck size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Shipping</p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Express Delivery
                  </p>
                  <p className="text-xs text-slate-500">Safe Packaging Guaranteed</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-auto">
              <button
                disabled={quantity <= 0}
                onClick={() => setIsOpen(true)}
                className={`w-full lg:w-max px-12 py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-xl flex items-center justify-center gap-3
                    ${
                      quantity > 0
                        ? "bg-green-500 hover:bg-green-600 text-white shadow-green-500/20 active:scale-95"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }
                  `}
              >
                <FiHash />
                {quantity > 0 ? "Order This Book" : "Out of Stock"}
              </button>
            </div>

            {/* Purchase Modal */}
            <PurchaseModal book={book} closeModal={closeModal} isOpen={isOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
