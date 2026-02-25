import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { imageUpload } from "../../utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, image, email, password } = data;

    try {
      // 🔹 Image Validation
      if (!image || image.length === 0) {
        toast.error("Please upload a profile image");
        return;
      }

      const imageFile = image[0];

      // 🔹 Password Validation
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
      if (!passwordRegex.test(password)) {
        toast.error(
          "Password must be at least 6 characters, include one uppercase letter, one number and one special character",
        );
        return;
      }

      // 1️⃣ Upload Image
      const imageURL = await imageUpload(imageFile);

      // 2️⃣ Create Firebase User
      const res = await createUser(email, password);
      const user = res.user;

      // 3️⃣ Update Firebase Profile
      await updateUserProfile(name, imageURL);

      // 4️⃣ Save User to MongoDB
      const userInfo = {
        email: user.email,
        displayName: name,
        photoURL: imageURL,
        role: "user",
      };

      const result = await axiosSecure.post("/user", userInfo);
      console.log("Saved in MongoDB:", result.data);

      toast.success("Registration Successful! 🎉");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Something went wrong!");
    }
  };

  // 🔹 Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithGoogle();
      const user = res.user;

      const userInfo = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

      await axiosSecure.post("/user", userInfo);

      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3f4f6] p-4">
      <div className="flex flex-col w-full max-w-[480px] my-6 rounded-2xl shadow-2xl bg-white overflow-hidden border border-gray-100">
        <div className="pt-10 pb-6 px-10 text-center">
          <h1 className="text-4xl font-black text-slate-800 mb-2">
            Create <span className="text-blue-600">Account</span>
          </h1>
          <p className="text-slate-500 font-medium">Join us and start your journey</p>
        </div>

        <div className="px-10 pb-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-xl"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Image */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full border rounded-xl p-2"
                {...register("image", { required: "Profile image is required" })}
              />
              {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-xl"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 border rounded-xl"
                  {...register("password", { required: "Password is required" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3 rounded-xl"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin text-xl mx-auto" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Google */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center items-center gap-2 border mt-6 py-2 rounded-xl"
          >
            <FcGoogle size={24} />
            Google Account
          </button>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
