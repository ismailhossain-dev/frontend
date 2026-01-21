import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetch }) => {
  //amra akne adim er manage user er kaj ta kosi
  const [updatedRole, setUpdatedRole] = useState(user?.role);

  const axiosSecure = useAxiosSecure();

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch("/update-role", {
        email: user?.email,
        role: updatedRole,
      });
      toast.success("Role Updated!");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    } finally {
      closeModal();
    }
  };
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="bg-linear-to-r from-blue-400 via-cyan-900 to-green-400 w-full max-w-md rounded-xl  p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                Update User Role
              </DialogTitle>
              <form>
                <div>
                  <select
                    value={updatedRole}
                    onChange={(e) => setUpdatedRole(e.target.value)}
                    className="w-full my-3 border border-blue-200 rounded-xl px-2 py-3"
                    name="role"
                    id=""
                  >
                    <option className="text-black" value="customer">
                      Customer
                    </option>
                    <option className="text-black" value="seller">
                      Seller
                    </option>
                    <option className="text-black" value="admin">
                      Admin
                    </option>
                  </select>
                </div>
                <div className="flex mt-2 justify-around">
                  <button
                    onClick={handleRoleUpdate}
                    type="button"
                    className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default UpdateUserRoleModal;
