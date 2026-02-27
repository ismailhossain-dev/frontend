import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const ManageOrders = () => {
  //amra ekane email er mardome order data fetch korsi
  const { user } = useAuth();
  //useQuery asche tasktack teke
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/manage-orders/${user?.email}`);
      console.log(res.data);
      // const reslut = await axios(`${import.meta.env.VITE_API_URL}/orders/${user?.email}`);
      return res.data;
    },
  });

  console.log(orders);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Quantity
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>{/* Map my order Table data  */}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageOrders;
