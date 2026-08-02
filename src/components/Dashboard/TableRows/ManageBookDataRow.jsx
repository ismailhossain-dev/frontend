import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Swal from "sweetalert2";

const ManageBookDataRow = ({ user, index, refetch }) => {
  // Destructuring updated for Book Data
  const { _id, status, name, category, image, price } = user;
  const axiosSecure = useAxiosSecure();

  // --- Update Logic (PATCH) ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedName = form.name.value;
    const updatedPrice = form.price.value;

    const updateDoc = {
      name: updatedName,
      price: parseFloat(updatedPrice),
    };

    try {
      // NOTE: Using _id ensures exact document update in MongoDB
      const res = await axiosSecure.patch(`/manage-books/${_id}`, updateDoc);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Book info updated successfully.",
          timer: 1500,
          showConfirmButton: false,
          background: "#0f172a",
          color: "#fff",
        });
        document.getElementById(`edit_modal_${_id}`).close();
        refetch();
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes detected",
          timer: 1500,
          showConfirmButton: false,
          background: "#0f172a",
          color: "#fff",
        });
        document.getElementById(`edit_modal_${_id}`).close();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Update failed. Please try again.",
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  // --- Delete Logic ---
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      html: `Delete <b class="text-rose-400">${name}</b>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#334155",
      confirmButtonText: "Yes, delete it!",
      background: "#0f172a",
      color: "#fff",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/manage-books/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Book removed.",
              icon: "success",
              background: "#0f172a",
              color: "#fff",
            });
          }
        });
      }
    });
  };

  return (
    <tr className="hover:bg-slate-800/30 transition-colors">
      {/* Index */}
      <td className="px-6 py-4 font-mono text-slate-400 text-xs">{index + 1}</td>

      {/* Book Image & Name */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <img
            src={image || "https://i.ibb.co/vBR74Yf/user.png"}
            alt={name}
            className="w-11 h-14 object-cover rounded-xl border border-slate-700/60 shadow-md"
          />
          <span className="font-semibold text-slate-100 max-w-[200px] truncate" title={name}>
            {name || "Untitled Book"}
          </span>
        </div>
      </td>

      {/* Category */}
      <td className="px-6 py-4 text-slate-300 text-xs font-medium whitespace-nowrap">
        {category || "Uncategorized"}
      </td>

      {/* Price */}
      <td className="px-6 py-4 text-center font-bold text-emerald-400 font-mono text-sm whitespace-nowrap">
        ${price ? price.toFixed(2) : "0.00"}
      </td>

      {/* Status Badge */}
      <td className="px-6 py-4 text-center whitespace-nowrap">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold capitalize border ${
            status === "Available" || status === "pending" || !status
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
          }`}
        >
          {status || "Available"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <div className="flex items-center justify-center gap-2">
          {/* View Details */}
          <button
            onClick={() => document.getElementById(`view_modal_${_id}`).showModal()}
            className="p-2 rounded-xl bg-slate-800/60 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 border border-slate-700/50 transition-all active:scale-95"
            title="View Details"
          >
            <FaRegEye size={15} />
          </button>

          {/* Edit Book */}
          <button
            onClick={() => document.getElementById(`edit_modal_${_id}`).showModal()}
            className="p-2 rounded-xl bg-slate-800/60 text-slate-300 hover:text-amber-400 hover:bg-slate-800 border border-slate-700/50 transition-all active:scale-95"
            title="Edit Book"
          >
            <FaRegEdit size={15} />
          </button>

          {/* Delete Book */}
          <button
            onClick={() => handleDeleteUser(_id)}
            className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20 transition-all active:scale-95"
            title="Delete Book"
          >
            <MdDelete size={16} />
          </button>
        </div>

        {/* ─── 1. VIEW MODAL ─── */}
        <dialog id={`view_modal_${_id}`} className="modal backdrop-blur-md">
          <div className="modal-box bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center text-slate-100 shadow-2xl">
            <img
              className="w-36 h-48 object-cover mx-auto mb-4 rounded-2xl shadow-xl border border-slate-700/50"
              src={image}
              alt={name}
            />
            <h3 className="font-extrabold text-xl text-white">{name}</h3>
            <span className="inline-block px-3 py-1 my-2 rounded-full text-xs font-bold bg-slate-800 text-emerald-400 border border-slate-700/50">
              {category}
            </span>
            <p className="text-xl font-black text-emerald-400 font-mono mt-1">
              Price: ${price}
            </p>

            <div className="modal-action justify-center mt-6">
              <form method="dialog">
                <button className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>

        {/* ─── 2. EDIT MODAL ─── */}
        <dialog id={`edit_modal_${_id}`} className="modal backdrop-blur-md">
          <div className="modal-box bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-100 shadow-2xl" key={name}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
              <h3 className="font-bold text-lg text-white">Update Book Info</h3>
              <form method="dialog">
                <button className="text-slate-400 hover:text-white p-1 rounded-lg">
                  <FiX size={18} />
                </button>
              </form>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4 text-left">
              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Book Name
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={name}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 text-slate-100 text-sm border border-slate-800 outline-none focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Price ($)
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={price}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 text-slate-100 text-sm border border-slate-800 outline-none focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => document.getElementById(`edit_modal_${_id}`).close()}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/10 active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </td>
    </tr>
  );
};

export default ManageBookDataRow;