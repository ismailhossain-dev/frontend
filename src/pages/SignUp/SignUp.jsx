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

      // 1️ Upload Image
      const imageURL = await imageUpload(imageFile);

      // 2️ Create Firebase User
      const res = await createUser(email, password);
      const user = res.user;

      // 3 Update Firebase Profile
      await updateUserProfile(name, imageURL);

      // 4️Save User to MongoDB
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
                placeholder="Enter your full name" // Placeholder Added
                className="w-full px-4 py-2 border rounded-xl focus:outline-blue-500"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Image */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Profile Image
              </label>

              <div className="relative">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-all duration-300"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {/* Upload Icon */}
                    <svg
                      className="w-8 h-8 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-1 text-sm text-gray-500 font-medium">
                      <span className="text-blue-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG or GIF (max. 2MB)</p>
                  </div>

                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden" // Browser-er default input ta hide kore dewa hoyeche
                    {...register("image", { required: "Profile image is required" })}
                  />
                </label>
              </div>

              {/* Error Message */}
              {errors.image && (
                <p className="text-red-500 text-xs mt-1 italic">{errors.image.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com" // Placeholder Added
                className="w-full px-4 py-2 border rounded-xl focus:outline-blue-500"
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
                  placeholder="••••••••" // Placeholder Added
                  className="w-full px-4 py-2 border rounded-xl focus:outline-blue-500"
                  {...register("password", { required: "Password is required" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-500 hover:text-slate-800"
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
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl transition-colors font-semibold"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin text-xl mx-auto" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Google */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center items-center gap-2 border border-gray-200 hover:bg-gray-50 py-2.5 rounded-xl transition-all"
          >
            <FcGoogle size={24} />
            <span className="font-medium text-slate-700">Google Account</span>
          </button>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
