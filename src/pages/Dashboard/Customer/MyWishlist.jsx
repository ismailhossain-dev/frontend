import React, { useState } from "react";
import { Link } from "react-router";
import {
  HiOutlineHeart,
  HiOutlineTrash,
  HiOutlineShoppingCart,
  HiOutlineArrowRight,
} from "react-icons/hi";

const MyWishlist = () => {
  // ডাইনামিক ডেটার নমুনা (আপনার স্টেট বা TanStack Query ডেটা দিয়ে এটি রিপ্লেস করবেন)
  const [wishlist, setWishlist] = useState([
    {
      _id: "1",
      name: "The Great Gatsby",
      category: "Fiction",
      price: 15.99,
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300",
      inStock: true,
    },
    {
      _id: "2",
      name: "Atomic Habits",
      category: "Self-Help",
      price: 21.5,
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=300",
      inStock: true,
    },
  ]);

  // উইশলিস্ট থেকে আইটেম রিমুভ করার ফাংশন
  const handleRemove = (id) => {
    setWishlist(wishlist.filter((item) => item._id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 mt-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ─── PAGE HEADER ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 shadow-inner">
              <HiOutlineHeart className="text-3xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                My Wishlist
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Save your favorite books to read or purchase later.
              </p>
            </div>
          </div>

          {/* Total Wishlist Items Badge */}
          {wishlist.length > 0 && (
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5 self-start sm:self-center">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Saved Items:{" "}
              <span className="font-extrabold text-sm text-white">
                {wishlist.length}
              </span>
            </div>
          )}
        </div>

        {/* ─── MAIN CONTENT AREA ─── */}
        {wishlist.length === 0 ? (
          /* Empty Wishlist State */
          <div className="text-center py-20 px-6 bg-slate-900/40 border border-slate-800/80 rounded-3xl backdrop-blur-md max-w-xl mx-auto shadow-2xl">
            <div className="inline-flex p-5 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/50 text-emerald-400 mb-6 shadow-inner">
              <HiOutlineHeart className="text-5xl" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Your Wishlist is Empty
            </h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mt-2 leading-relaxed">
              Explore our catalog and click the heart icon on books you want to
              save for later!
            </p>
            <div className="mt-8">
              <Link
                to="/all-book"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 active:scale-95 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all duration-200"
              >
                <span>Explore Books</span>
                <HiOutlineArrowRight className="text-lg" />
              </Link>
            </div>
          </div>
        ) : (
          /* Dynamic Wishlist Table */
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                {/* Table Header */}
                <thead>
                  <tr className="bg-slate-800/40 border-b border-slate-800/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-4">Book Details</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {wishlist.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      {/* Image & Title */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-14 object-cover rounded-xl border border-slate-700/60 shadow-md"
                          />
                          <div>
                            <p
                              className="font-semibold text-slate-100 max-w-[200px] truncate"
                              title={item.name}
                            >
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-emerald-400 border border-slate-700/50">
                          {item.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-bold text-slate-200">
                          ${item.price}
                        </p>
                      </td>

                      {/* Stock Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.inStock ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            Out of Stock
                          </span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          {/* Add to Cart Button */}
                          <button
                            className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 border border-emerald-500/20 transition-all active:scale-95 flex items-center gap-1.5 font-bold text-xs"
                            title="Add to Cart"
                          >
                            <HiOutlineShoppingCart className="size-4" />
                            <span className="hidden sm:inline">
                              Add to Cart
                            </span>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleRemove(item._id)}
                            className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20 transition-all active:scale-95"
                            title="Remove from Wishlist"
                          >
                            <HiOutlineTrash className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishlist;
