import useAxiosSecure from "../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Camera, User, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

const UpdateFrom = ({ setUpdate }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
    },
  });

  const handleUpdateForm = async (data) => {
    const updateDoc = {
      displayName: data.name,
      photoURL: data?.image,
    };

    try {
      const res = await axiosSecure.patch(`/users-profile/${user?.email}`, updateDoc);
      if (res.data.modifiedCount > 0) {
        toast.success("Profile Updated Successfully!");
        setUpdate(false);
      }
    } catch (error) {
      console.error("Error updating:", error);
      toast.error("Update failed. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto ">
      {/* Header Section */}
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Update Profile
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Personalize your account details & display information.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleUpdateForm)} className="space-y-5">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 ml-1">
            <User size={15} className="text-emerald-400" />
            Display Name
          </label>
          <input
            type="text"
            placeholder="Your full name"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" },
            })}
            className={`w-full px-4 py-3.5 rounded-2xl bg-slate-950/60 text-slate-100 text-sm border outline-none transition-all placeholder:text-slate-600 ${
              errors.name
                ? "border-rose-500/80 focus:ring-2 focus:ring-rose-500/20"
                : "border-slate-800 focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/10"
            }`}
          />
          {errors.name && (
            <p className="text-rose-400 text-xs font-medium ml-1">{errors.name.message}</p>
          )}
        </div>

        {/* Image Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 ml-1">
            <Camera size={15} className="text-emerald-400" />
            Profile Picture
          </label>
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-slate-950 hover:file:bg-emerald-400 cursor-pointer bg-slate-950/60 border border-dashed border-slate-800 p-2 rounded-2xl transition-all"
            />
          </div>
          <p className="text-[11px] text-slate-500 ml-1 italic">
            * Leave blank to keep your current photo
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-black py-3.5 rounded-2xl shadow-lg shadow-emerald-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                Updating...
              </span>
            ) : (
              <>
                <CheckCircle2 size={18} />
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