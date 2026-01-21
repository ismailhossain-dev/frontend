// import { useState } from "react";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DeleteModal from "../../Modal/DeleteModal";
const CustomerOrderDataRow = ({ order }) => {
  console.log(order);
  // let [isOpen, setIsOpen] = useState(false);
  // const closeModal = () => setIsOpen(false);
  const axiosSecure = useAxiosSecure();
  const { image, name, category, price, quantity, status, _id } = order;

  //delete order data
  const handleMyOrdersData = (id) => {
    console.log(id);
    //sweet alert 2
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
        //delete my orders api
        axiosSecure.delete(`/my-orders/${id}`).then((res) => {
          console.log(res);
        });

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
        <p className="text-gray-900">{status}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          // onClick={() => setIsOpen(true)}
          className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight"
        >
          <span className="absolute cursor-pointer inset-0 bg-red-500 opacity-50 rounded-full"></span>
          <span
            onClick={() => {
              handleMyOrdersData(_id);
            }}
            className="relative cursor-pointer"
          >
            <MdDelete size={20} />
          </span>
        </button>

        {/* <DeleteModal isOpen={isOpen} closeModal={closeModal} /> */}
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
