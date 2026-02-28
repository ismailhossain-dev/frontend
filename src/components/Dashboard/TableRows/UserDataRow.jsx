import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
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
      // NOTE: Ensure your backend endpoint matches this URL structure
      const res = await axiosSecure.patch(`/users/${email}`, updateDoc);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "User info updated successfully.",
          timer: 1500,
          showConfirmButton: false,
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
        });
        document.getElementById(`edit_modal_${_id}`).close();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Update failed. Please try again.", "error");
    }
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      html: `Delete <b>${displayName || email}</b>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "User removed.", "success");
          }
        });
      }
    });
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{index + 1}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        {displayName}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{email}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm capitalize">
        <span
          className={`px-2 py-1 rounded-full text-xs font-bold ${role === "admin" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}
        >
          {role}
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {new Date(createdAt).toLocaleDateString()}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => document.getElementById(`view_modal_${_id}`).showModal()}
            className="text-blue-600 hover:text-blue-900"
            title="View Details"
          >
            <FaRegEye size={18} />
          </button>

          <button
            onClick={() => document.getElementById(`edit_modal_${_id}`).showModal()}
            className="text-yellow-600 hover:text-yellow-900"
            title="Edit User"
          >
            <FaRegEdit size={18} />
          </button>

          <button
            onClick={() => handleDeleteUser(_id)}
            className="text-red-600 hover:text-red-900"
            title="Delete User"
          >
            <MdDelete size={18} />
          </button>
        </div>

        {/* --- 1. VIEW MODAL --- */}
        <dialog id={`view_modal_${_id}`} className="modal">
          <div className="modal-box bg-white text-center">
            <img
              className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-indigo-500 object-cover"
              src={photoURL || "https://i.ibb.co/vBR74Yf/user.png"}
              alt=""
            />
            <h3 className="font-bold text-xl">{displayName}</h3>
            <p className="text-gray-500">{email}</p>
            <div className="modal-action justify-center">
              <form method="dialog">
                <button className="btn btn-sm px-6">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* --- 2. EDIT MODAL --- */}
        <dialog id={`edit_modal_${_id}`} className="modal">
          {/* Use a combined key to ensure refresh on both name or email change */}
          <div className="modal-box bg-white" key={`${displayName}-${email}`}>
            <h3 className="font-bold text-lg mb-4 text-slate-800 border-b pb-2">
              Update User Info
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4 text-left">
              <div>
                <label className="block mb-1 text-sm font-semibold text-slate-700">
                  Display Name
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={displayName}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-300"
                  required
                />
              </div>

              <div className="modal-action">
                <button
                  type="submit"
                  className="btn bg-indigo-600 text-white hover:bg-indigo-700 border-none"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById(`edit_modal_${_id}`).close()}
                  className="btn"
                >
                  Cancel
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
