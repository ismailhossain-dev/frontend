import useAxiosSecure from "../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Camera, User, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast"; // Optional: Toast use korle bhalo hoy

const UpdateFrom = ({ setUpdate }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.displayName,
    },
  });

  const handleUpdateForm = async (data) => {
    // Note: If you want to upload to imgbb, do it here first, then get the URL
    // For now, I'm using your original logic
    const updateDoc = {
      displayName: data.name,
      photoURL: user?.photoURL, // Replace with new uploaded URL if needed
    };

    try {
      const res = await axiosSecure.patch(`/users-profile/${user?.email}`, updateDoc);
      if (res.data.modifiedCount > 0) {
        toast.success("Profile Updated Successfully!");
        setUpdate(false); // Form close after success
      }
    } catch (error) {
      console.error("Error updating:", error);
      toast.error("Update failed. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-black text-slate-800">Update Profile</h3>
        <p className="text-sm text-slate-500">Personalize your account details</p>
      </div>

      <form onSubmit={handleSubmit(handleUpdateForm)} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
            <User size={16} className="text-indigo-500" />
            Display Name
          </label>
          <input
            type="text"
            placeholder="Your full name"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Too short" },
            })}
            className={`w-full px-5 py-4 rounded-2xl border bg-slate-50 outline-none transition-all ${
              errors.name
                ? "border-red-400 focus:ring-red-100"
                : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs font-semibold ml-2">{errors.name.message}</p>
          )}
        </div>

        {/* Image Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
            <Camera size={16} className="text-indigo-500" />
            Profile Picture
          </label>
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-sm file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer bg-white border border-dashed border-slate-300 p-2 rounded-2xl"
            />
          </div>
          <p className="text-[10px] text-slate-400 ml-2 italic">
            * Leave blank to keep current photo
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-primary  disabled:bg-indigo-300 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              "Updating..."
            ) : (
              <>
                <CheckCircle2 size={20} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFrom;
