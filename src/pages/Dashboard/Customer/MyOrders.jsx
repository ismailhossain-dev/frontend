import { useQuery } from "@tanstack/react-query";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { HiOutlineShoppingBag, HiOutlineClipboardList, HiOutlineArrowRight } from "react-icons/hi";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/my-orders/${user.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 mt-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ─── PAGE HEADER ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          {/* Background Ambient Glow Effect */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 shadow-inner">
              <HiOutlineClipboardList className="text-3xl" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
                My Orders
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Track, manage, and review your purchase history.
              </p>
            </div>
          </div>

          {/* Total Orders Badge */}
          {orders.length > 0 && (
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5 self-start sm:self-center">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Total Orders: <span className="font-extrabold text-sm text-white">{orders.length}</span>
            </div>
          )}
        </div>

        {/* ─── MAIN CONTENT AREA ─── */}
        {orders.length === 0 ? (
          
          /* Empty State Section */
          <div className="text-center py-20 px-6 bg-slate-900/40 border border-slate-800/80 rounded-3xl backdrop-blur-md max-w-xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="inline-flex p-5 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/50 text-emerald-400 mb-6 shadow-inner">
              <HiOutlineShoppingBag className="text-5xl" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              No Orders Found
            </h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mt-2 leading-relaxed">
              Your order history is currently empty. Explore our collection and grab your favorite books today!
            </p>
            <div className="mt-8">
              <Link
                to="/all-book"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 active:scale-95 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all duration-200"
              >
                <span>Browse Collection</span>
                <HiOutlineArrowRight className="text-lg" />
              </Link>
            </div>
          </div>

        ) : (

          /* Premium Table Container */
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                
                {/* Table Header */}
                <thead>
                  <tr className="bg-slate-800/40 border-b border-slate-800/80 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-4">Book Details</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {orders.map((order) => (
                    <CustomerOrderDataRow
                      key={order._id}
                      order={order}
                      refetch={refetch}
                    />
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

export default MyOrders;