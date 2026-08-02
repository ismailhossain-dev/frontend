import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BookOpen } from "lucide-react";

import ManageBookDataRow from "../../../components/Dashboard/TableRows/ManageBookDataRow";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const ManageBooks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: manageBooks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-books", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/manage-books");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-10 min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* ─── HEADER SECTION ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3.5 rounded-2xl bg-slate-800/80 text-emerald-400 border border-slate-700/50 shadow-inner">
            <BookOpen className="size-6 sm:size-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Manage Books
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              Monitor, update, and manage all book inventories in one place.
            </p>
          </div>
        </div>

        {/* Total Count Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-center">
          Total Inventory: <span className="font-extrabold text-sm text-white">{manageBooks.length}</span>
        </div>
      </div>

      {/* ─── TABLE CONTAINER ─── */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            {/* Table Header */}
            <thead>
              <tr className="bg-slate-800/40 border-b border-slate-800/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Book Image</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {manageBooks.map((book, index) => (
                <ManageBookDataRow
                  key={book._id}
                  user={book}
                  index={index}
                  refetch={refetch}
                />
              ))}
            </tbody>

          </table>

          {/* Empty State */}
          {manageBooks.length === 0 && (
            <div className="text-center py-16 px-4">
              <div className="inline-flex p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-slate-500 mb-3">
                <BookOpen size={32} />
              </div>
              <p className="text-slate-400 font-medium text-sm">No books found in the record.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ManageBooks;