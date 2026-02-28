import { useQuery } from "@tanstack/react-query";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";
// import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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
  });

  if (isLoading) return <LoadingSpinner />;

  // console.log(orders);
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden  shadow-md border border-gray-100 bg-blue-500 ">
                <table className="min-w-full text-sm text-gray-700">
                  {/* Table Head */}
                  <thead className="bg-linear-to-r from-indigo-50 to-purple-50 border-b">
                    <tr className="bg-gray-50 transition-colors border-b">
                      <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide text-gray-600">
                        Image
                      </th>
                      <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide text-gray-600">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide text-gray-600">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide text-gray-600">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide text-gray-600">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide text-gray-600">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide text-gray-600">
                        Action
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-gray-100">
                    {/* Map my order Table data  */}
                    {orders.map((order) => (
                      <CustomerOrderDataRow key={order._id} order={order} refetch={refetch} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
