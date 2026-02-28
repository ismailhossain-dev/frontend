import useAxiosSecure from "../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

const UpdateFrom = ({ update }) => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateForm = async (data) => {
    console.log(data);
    const updateDoc = {
      displayName: data.name,
      photoURL: data.image,
    };

    try {
      const res = await axiosSecure.patch(`/users/${user?.email}`, updateDoc);
      if (res.data.modifiedCount > 0) {
        console.log("Update Success!");
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };
  return (
    <div>
      {update ? (
        <form
          onSubmit={handleSubmit(handleUpdateForm)}
          className="space-y-5 p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl"
        >
          {/* 1. Name Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
              Display Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                errors.name
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-semibold">{errors.name.message}</p>
            )}
          </div>

          {/* 3. Image (File) Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Please upload an image" })}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-semibold">{errors.image.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
          >
            Update Profile 🚀
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default UpdateFrom;
