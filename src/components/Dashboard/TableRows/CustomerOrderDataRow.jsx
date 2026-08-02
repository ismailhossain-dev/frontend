import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegEye } from "react-icons/fa6";

const CustomerOrderDataRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { image, name, category, price, quantity, status, _id, paymentStatus } = order;

  // অর্ডার ডিলিট হ্যান্ডলার (ডার্ক থিম SweetAlert সহ)
  const handleMyOrdersData = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this order!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981", // Emerald Color
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#0f172a", // Slate 900
      color: "#f8fafc",
      customClass: {
        popup: "border border-slate-800 rounded-2xl",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/my-orders/${id}`);
          if (res.data) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your order has been deleted.",
              icon: "success",
              background: "#0f172a",
              color: "#f8fafc",
              confirmButtonColor: "#10b981",
              customClass: {
                popup: "border border-slate-800 rounded-2xl",
              },
            });
          }
        } catch (error) {
          console.error("Error deleting order:", error);
        }
      }
    });
  };

  return (
    <>
      <tr className="hover:bg-slate-800/30 transition-colors border-b border-slate-800/60">
        {/* Book Image */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="relative group">
              <img
                alt={name}
                src={image}
                className="w-12 h-14 object-cover rounded-xl border border-slate-700/60 shadow-md group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </td>

        {/* Book Name */}
        <td className="px-6 py-4 whitespace-nowrap">
          <p className="font-semibold text-slate-100 max-w-[200px] truncate" title={name}>
            {name}
          </p>
        </td>

        {/* Category Badge */}
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-emerald-400 border border-slate-700/50">
            {category}
          </span>
        </td>

        {/* Price */}
        <td className="px-6 py-4 whitespace-nowrap">
          <p className="font-bold text-slate-200">${price}</p>
        </td>

        {/* Quantity */}
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/40">
            {quantity} Pcs
          </span>
        </td>

        {/* Status */}
        <td className="px-6 py-4 whitespace-nowrap">
          {paymentStatus === "paid" ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Paid
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 capitalize">
              <span className="size-1.5 rounded-full bg-amber-400"></span>
              {status || "Pending"}
            </span>
          )}
        </td>

        {/* Actions */}
        <td className="px-6 py-4 whitespace-nowrap text-center">
          <div className="flex items-center justify-center gap-2">
            {/* View Button */}
            <button
              onClick={() => document.getElementById(`view_modal_${_id}`).showModal()}
              className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-emerald-400 hover:bg-slate-700/80 border border-slate-700/50 transition-all active:scale-95"
              title="View Details"
            >
              <FaRegEye className="size-4" />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => handleMyOrdersData(_id)}
              className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all active:scale-95"
              title="Delete Order"
            >
              <MdDelete className="size-4" />
            </button>
          </div>

          {/* ─── VIEW MODAL ─── */}
          <dialog id={`view_modal_${_id}`} className="modal backdrop-blur-md">
            <div className="modal-box bg-slate-900 border border-slate-800/80 text-slate-100 rounded-3xl shadow-2xl p-6 max-w-sm text-center">
              
              <div className="relative mb-4">
                <img
                  className="w-full h-48 object-cover rounded-2xl border border-slate-800 shadow-lg"
                  src={image}
                  alt={name}
                />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-xl text-xs font-bold bg-slate-950/80 text-emerald-400 border border-slate-800 backdrop-blur-md">
                  {category}
                </span>
              </div>

              <h3 className="font-extrabold text-xl text-white tracking-tight mb-1">{name}</h3>
              
              <div className="flex justify-center items-center gap-4 my-3 py-2 bg-slate-950/50 rounded-2xl border border-slate-800/60">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Price</p>
                  <p className="text-lg font-black text-emerald-400">${price}</p>
                </div>
                <div className="w-[1px] h-8 bg-slate-800"></div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-500">Quantity</p>
                  <p className="text-lg font-black text-slate-200">{quantity}</p>
                </div>
              </div>

              <div className="modal-action justify-center mt-6">
                <form method="dialog">
                  <button className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700/50">
                    Close
                  </button>
                </form>
              </div>

            </div>
            
            {/* Modal Backdrop for closing when clicked outside */}
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </td>
      </tr>
    </>
  );
};

export default CustomerOrderDataRow;