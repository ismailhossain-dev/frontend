// import { useState } from "react";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DeleteModal from "../../Modal/DeleteModal";
import { Eye } from "lucide-react";
import { FaRegEye } from "react-icons/fa6";
const CustomerOrderDataRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { image, name, category, price, quantity, status, _id } = order;

  const handleMyOrdersData = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be my orders !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, My Order delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/my-orders/${id}`).then((res) => {
          return res;
        });

        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "My orders has been deleted.",
          icon: "success",
        });
      }
    });
    //
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              <img alt="profile" src={image} className="w-18 h-18 rounded-full" />
            </div>
          </div>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{category}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">${price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{quantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {order.paymentStatus === "paid" ? (
          <span className="text-green-400">Paid</span>
        ) : (
          <p className="text-gray-900">{status}</p>
        )}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex gap-3">
          {/* view */}
          <button
            onClick={() => document.getElementById(`view_modal_${_id}`).showModal()}
            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
            title="View Details"
          >
            <FaRegEye size={16} />
          </button>

          {/* view */}
          <button
            // onClick={() => setIsOpen(true)}
            className=" btn btn-squire"
          >
            <span
              onClick={() => {
                handleMyOrdersData(_id);
              }}
              className="relative cursor-pointer"
            >
              <MdDelete size={20} />
            </span>
          </button>
        </div>

        {/* --- 1. VIEW MODAL --- */}
        <dialog id={`view_modal_${_id}`} className="modal">
          <div className="modal-box bg-white text-center">
            <img
              className="w-40 h-56 object-cover mx-auto mb-4 rounded-lg shadow-md"
              src={image}
              alt={name}
            />
            <h3 className="font-bold text-2xl text-slate-800">{name}</h3>
            <p className="badge badge-indigo my-2">{category}</p>
            <p className="text-xl font-bold text-indigo-600 mt-2">Price: ${price}</p>
            <div className="modal-action justify-center">
              <form method="dialog">
                <button className="btn btn-outline btn-sm px-8">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        {/*  */}
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
