import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageBookDataRow = ({ user, index, refetch }) => {
  // Destructuring updated for Book Data
  //customer ta hole email
  const { _id, status, name, category, image, price, customer } = user;
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
      const res = await axiosSecure.patch(`/manage-books/${customer}`, updateDoc);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Book info updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
        document.getElementById(`edit_modal_${_id}`).close();
        refetch();
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes detected",
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

  // --- Delete Logic ---
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      html: `Delete <b>${name}</b>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/manage-books/${id}`).then((res) => {
          console.log(res);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Book removed.", "success");
          }
        });
      }
    });
  };

  return (
    <tr className="bg-gray-50 transition-colors border-b">
      {/* Index */}
      <td className="px-5 py-5 text-sm text-center">{index + 1}</td>

      {/* Book Image & Name */}
      <td className="px-5 py-5 text-sm">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt={name} />
            </div>
          </div>
          <div className="font-bold text-slate-700">{name}</div>
        </div>
      </td>

      {/* Category */}
      <td className="px-5 py-5 text-sm text-gray-600 font-medium">{category}</td>

      {/* Price */}
      <td className="px-5 py-5 text-sm font-bold text-indigo-600">${price}</td>

      {/* Status Badge */}
      <td className="px-5 py-5 text-sm">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {status || "N/A"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-5 text-sm">
        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={() => document.getElementById(`view_modal_${_id}`).showModal()}
            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
            title="View Details"
          >
            <FaRegEye size={16} />
          </button>

          <button
            onClick={() => document.getElementById(`edit_modal_${_id}`).showModal()}
            className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-600 hover:text-white transition-all"
            title="Edit Book"
          >
            <FaRegEdit size={16} />
          </button>

          <button
            onClick={() => handleDeleteUser(_id)}
            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
            title="Delete Book"
          >
            <MdDelete size={16} />
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

        {/* --- 2. EDIT MODAL --- */}
        <dialog id={`edit_modal_${_id}`} className="modal">
          <div className="modal-box bg-white" key={name}>
            <h3 className="font-bold text-lg mb-4 text-slate-800 border-b pb-2">
              Update Book Info
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4 text-left">
              <div>
                <label className="block mb-1 text-sm font-semibold text-slate-700">Book Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={name}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-slate-700">Price ($)</label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={price}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none"
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

export default ManageBookDataRow;
