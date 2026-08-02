import { useQuery } from "@tanstack/react-query";
import UserDataRow from "../../../components/Dashboard/TableRows/UserDataRow";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Users } from "lucide-react";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["/users", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/users`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-10 min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* ─── HEADER SECTION ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glow Decor */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3.5 rounded-2xl bg-slate-800/80 text-emerald-400 border border-slate-700/50 shadow-inner">
            <Users className="size-6 sm:size-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Manage Users
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
              View registered accounts, update details, or manage user roles.
            </p>
          </div>
        </div>

        {/* Total Users Counter */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-center">
          Total Registered: <span className="font-extrabold text-sm text-white">{users.length}</span>
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
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center">Role</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {users.map((user, index) => (
                <UserDataRow
                  key={user._id}
                  user={user}
                  index={index}
                  refetch={refetch}
                />
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default ManageUsers;