import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import BookCategories from "./BookCategories";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Grid, Layers } from "lucide-react";

const AdminCategory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: categories = [],
    isLoading,
  } = useQuery({
    queryKey: ["category", user?.role],
    queryFn: async () => {
      const res = await axiosSecure.get("/allBooks");
      return res.data;
    },
  });

  // Extract unique category names
  const allCategoryName = categories.map((book) => book.category).filter(Boolean);
  const uniqueCategoryNames = [...new Set(allCategoryName)];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-10 min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* ─── HEADER SECTION ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glow Decor */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3.5 rounded-2xl bg-slate-800/80 text-emerald-400 border border-slate-700/50 shadow-inner">
            <Layers className="size-6 sm:size-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Book Categories
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              Explore and manage all unique categories available in your store.
            </p>
          </div>
        </div>

        {/* Categories Count Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-center">
          Total Categories: <span className="font-extrabold text-sm text-white">{uniqueCategoryNames.length}</span>
        </div>
      </div>

      {/* ─── CATEGORIES GRID ─── */}
      {uniqueCategoryNames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueCategoryNames.map((category, index) => (
            <BookCategories key={category || index} data={category} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-12 text-center backdrop-blur-xl shadow-2xl">
          <div className="inline-flex p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-slate-500 mb-3">
            <Grid size={32} />
          </div>
          <p className="text-slate-400 font-medium text-sm">No categories found in the inventory.</p>
        </div>
      )}

    </div>
  );
};

export default AdminCategory;