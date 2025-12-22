import { useQuery } from "@tanstack/react-query";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";
// import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyOrders = () => {
  //amra ekane email er mardome order data fetch korsi and amar ekant token kaj kortesi 
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const reslut = await axiosSecure(`/my-orders`);
      return reslut.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  console.log(orders);
  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden rounded-3xl shadow-md border border-gray-100 bg-blue-500 ">
                <table className="min-w-full text-sm text-gray-700">
                  {/* Table Head */}
                  <thead className="bg-linear-to-r from-indigo-50 to-purple-50 border-b">
                    <tr>
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
                    {
                      orders.map(order => <CustomerOrderDataRow key={order._id} order={order} />)
                    }
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
