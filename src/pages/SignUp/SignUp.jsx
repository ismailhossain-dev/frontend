import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";
// import axios from "axios";
import { imageUpload, saveOrUpdateUser } from "../../utils";
const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors); // error check

  // React Hook Form submit
  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);

      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

      if (!passwordRegex.test(password)) {
        toast.error(
          "Password must be at least 6 characters, include one uppercase letter, one number and one special character",
        );
        return;
      }
      console.log("Password is valid");
      // step-1 User Registration
      const result = await createUser(email, password);

      //SIGNUP WORK LAST mongodb save data
      await saveOrUpdateUser({ name, email, image: imageURL });
      //
      // step-2 image upload (future work)
      console.log(image);

      // step-3 Save username & profile photo
      await updateUserProfile(name, imageURL);
      //finished image upload work

      console.log(result);
      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Handle Google Signin backend teke use ke aschi
  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle();

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        password: user?.password,
      });

      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white bg-linear-to-r from-blue-500 to-pink-500 p-4 rounded-lg shadow-lg">
      <div className="flex flex-col w-[420px] my-6 rounded-md p-10 bg-blue-200 text-gray-900 ">
        <div className="mb-8 text-center">
          <h1 className=" text-4xl font-bold">Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border  rounded-md bg-white "
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 20,
                    message: "Name cannot be longer than 20 characters",
                  },
                })}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Image */}
            <div>
              <label className="block mb-2 text-sm">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                 file:bg-lime-50 file:text-lime-700
              hover:file:bg-lime-100
               bg-white border border-dashed border-lime-300 rounded-md cursor-pointer
              focus:outline-none 
                py-2"
                {...register("image")}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm">Email address</label>
              <input
                type="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border border-blue-500 rounded-md bg-white "
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm">Password</label>
              <input
                type="password"
                autoComplete="new-password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md bg-white border-blue-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-pink-500 hover:scale-105 duration-300 w-full rounded-md py-3 text-white"
          >
            {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Continue"}
          </button>
        </form>

        {/* Google Signup */}
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-white">Signup with social accounts</p>
          <div className="flex-1 h-px bg-white"></div>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 cursor-pointer hover:bg-pink-500 duration-200"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="hover:text-pink-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
