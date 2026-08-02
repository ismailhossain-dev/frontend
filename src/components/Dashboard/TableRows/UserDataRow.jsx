import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FiEdit3, FiX } from "react-icons/fi";
import Swal from "sweetalert2";

const UserDataRow = ({ user, refetch, index }) => {
  const { _id, email, role, displayName, createdAt, photoURL } = user;
  const axiosSecure = useAxiosSecure();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;

    const updateDoc = {
      displayName: name,
    };

    try {
      const res = await axiosSecure.patch(`/users/${email}`, updateDoc);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "User info updated successfully.",
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
          text: "Data remains the same.",
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

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      html: `Delete <b class="text-rose-400">${displayName || email}</b>?`,
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
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User removed.",
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

      {/* User Info (Avatar + Name) */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-xl object-cover border border-slate-700/60 shadow-md"
            src={photoURL || "https://i.ibb.co/vBR74Yf/user.png"}
            alt={displayName || "User"}
          />
          <span className="font-semibold text-slate-100 max-w-[180px] truncate" title={displayName}>
            {displayName || "N/A"}
          </span>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-4 text-slate-300 font-mono text-xs whitespace-nowrap">{email}</td>

      {/* Role Badge */}
      <td className="px-6 py-4 text-center whitespace-nowrap">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold capitalize border ${
            role === "admin"
              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
              : role === "seller"
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          }`}
        >
          {role || "user"}
        </span>
      </td>

      {/* Joined Date */}
      <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">
        {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
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

          {/* Edit User */}
          <button
            onClick={() => document.getElementById(`edit_modal_${_id}`).showModal()}
            className="p-2 rounded-xl bg-slate-800/60 text-slate-300 hover:text-amber-400 hover:bg-slate-800 border border-slate-700/50 transition-all active:scale-95"
            title="Edit User"
          >
            <FiEdit3 size={15} />
          </button>

          {/* Delete User */}
          <button
            onClick={() => handleDeleteUser(_id)}
            className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white border border-rose-500/20 transition-all active:scale-95"
            title="Delete User"
          >
            <MdDelete size={16} />
          </button>

        </div>

        {/* ─── 1. VIEW DETAILS MODAL ─── */}
        <dialog id={`view_modal_${_id}`} className="modal backdrop-blur-md">
          <div className="modal-box bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center text-slate-100 shadow-2xl relative">
            <img
              className="w-24 h-24 rounded-2xl mx-auto mb-4 border-2 border-emerald-500/40 shadow-xl object-cover"
              src={photoURL || "https://i.ibb.co/vBR74Yf/user.png"}
              alt="Profile"
            />
            <h3 className="font-extrabold text-xl text-white">{displayName || "N/A"}</h3>
            <p className="text-slate-400 font-mono text-xs mt-1">{email}</p>
            
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase">Role:</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                {role || "user"}
              </span>
            </div>

            <div className="modal-action justify-center mt-6">
              <form method="dialog">
                <button className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>

        {/* ─── 2. EDIT USER MODAL ─── */}
        <dialog id={`edit_modal_${_id}`} className="modal backdrop-blur-md">
          <div className="modal-box bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-100 shadow-2xl" key={`${displayName}-${email}`}>
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
              <h3 className="font-bold text-lg text-white">Update User Info</h3>
              <form method="dialog">
                <button className="text-slate-400 hover:text-white p-1 rounded-lg">
                  <FiX size={18} />
                </button>
              </form>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4 text-left">
              <div>
                <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Display Name
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={displayName}
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

export default UserDataRow;