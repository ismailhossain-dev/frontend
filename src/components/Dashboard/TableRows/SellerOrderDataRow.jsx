import Swal from "sweetalert2";
import DeleteModal from "../../Modal/DeleteModal";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
// import { use } from "react";
const SellerOrderDataRow = ({ order }) => {
  // console.log(order);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //data load orders tanstack query
  const { data: orderData = [] } = useQuery({
    queryKey: ["orders", user.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/orders/${user.email}`);
      return result.data;
    },
  });
  console.log(orderData);
  //delete orders
  const { name, price, quantity, status, customer, _id } = order;
  const handleDeleteOrders = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be Order delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete Orders!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/orders/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your Orders deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-black ">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-black ">{customer}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text- ">${price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-back ">{quantity}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {/* amra akane dekaysi user panding naki */}
        <p className="text-black ">{status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-2">
          <select
            required
            defaultValue={status}
            className="p-1 border-2 border-blue-300 focus:outline-blue-500 rounded-md text-gray-900  bg-white"
            name="category"
          >
            <option value="Pending">Paid </option>
            <option value="In Progress">Start Processing</option>
            <option value="Delivered">Deliver</option>
          </select>
          <button
            onClick={() => handleDeleteOrders(_id)}
            className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
          >
            <span aria-hidden="true" className="absolute inset-0  opacity-50 rounded-full"></span>
            <span className="relative">
              <MdDelete size={20} />
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;
