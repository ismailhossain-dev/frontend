import { useQuery } from "@tanstack/react-query";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { HiOutlineShoppingBag, HiOutlineClipboardList } from "react-icons/hi";

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

  console.log("My orders", orders);
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen transition-colors duration-300">
      
      {/* ─── PAGE HEADER ─── */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-b border-gray-100 dark:border-slate-800/60 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20 hidden sm:block">
            <HiOutlineClipboardList className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white  dark:text-white tracking-tight">
              My Orders
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Track, manage, and review your order history and status.
            </p>
          </div>
        </div>
        
        {/* Total Orders Counter Badge */}
        {orders.length > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400 border border-green-500/20 dark:border-green-500/10 backdrop-blur-md self-start sm:self-center shadow-xs">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Total Orders: {orders.length}
          </div>
        )}
      </div>

      {/* ─── MAIN CONTENT AREA ─── */}
      {orders.length === 0 ? (
        /* Empty State Blueprint */
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-3xl shadow-xl shadow-gray-100/40 dark:shadow-none max-w-2xl mx-auto backdrop-blur-xs">
          <div className="inline-flex p-5 rounded-2xl bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800/50 text-gray-400 dark:text-gray-500 mb-5 shadow-inner">
            <HiOutlineShoppingBag className="text-4xl" />
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">Your order history is empty</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto mt-2.5 leading-relaxed">
            It looks like you haven’t added any items to your collection yet. Let's find some amazing books for you!
          </p>
          <div className="mt-8">
            <Link
              to="/all-book"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:scale-[0.98] rounded-xl shadow-lg shadow-green-500/20 transition-all duration-200"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        /* Premium Table Framework */
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 rounded-3xl shadow-xl shadow-gray-200/30 dark:shadow-none overflow-hidden backdrop-blur-xs">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 dark:divide-slate-800 text-sm tracking-wide">
              {/* Table Head Section */}
              <thead className="bg-gradient-to-r from-gray-50/80 to-gray-100/50 dark:from-slate-800/40 dark:to-slate-800/20 border-b border-gray-100 dark:border-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-4.5 text-left font-bold uppercase tracking-wider text-[11px] text-gray-500 dark:text-gray-400">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-4.5 text-left font-bold uppercase tracking-wider text-[11px] text-gray-500 dark:text-gray-400">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-4.5 text-left font-bold uppercase tracking-wider text-[11px] text-gray-500 dark:text-gray-400">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-4.5 text-left font-bold uppercase tracking-wider text-[11px] text-gray-500 dark:text-gray-400">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-4.5 text-left font-bold uppercase tracking-wider text-[11px] text-gray-500 dark:text-gray-400">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-4.5 text-left font-bold uppercase tracking-wider text-[11px] text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4.5 text-center font-bold uppercase tracking-wider text-[11px] text-gray-500 dark:text-gray-400">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body Section */}
              <tbody className="divide-y divide-gray-50 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
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
  );
};

export default MyOrders;