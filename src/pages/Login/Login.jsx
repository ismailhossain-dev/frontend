import { useState } from "react"; // State import kora hoyeche
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Icons import

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false); // Password show/hide state
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
      toast.success("Welcome Back!");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      setLoading(false);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3f4f6] p-4 font-sans">
      <div className="flex flex-col w-full max-w-[450px] rounded-2xl shadow-2xl bg-white overflow-hidden border border-gray-100">
        <div className="pt-10 pb-6 px-10 text-center">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
            Welcome <span className="text-blue-600">Back</span>
          </h1>
          <p className="text-slate-500 font-medium">Please enter your details</p>
        </div>

        <div className="px-10 pb-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block mb-1.5 text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="name@company.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 text-slate-800"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                >
                  Forgot?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Type dynamically change hobe
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 text-slate-800"
                />
                {/* Eye Icon Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-blue-200 transition-all duration-300 transform active:scale-95 flex justify-center items-center"
            >
              {loading ? <TbFidgetSpinner className="animate-spin text-xl" /> : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center text-gray-200">
              <span className="w-full border-t border-gray-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-400 font-semibold tracking-widest">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center items-center gap-3 border-2 border-gray-100 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-slate-700 active:bg-gray-100"
          >
            <FcGoogle size={24} />
            Google Account
          </button>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            New here?{" "}
            <Link
              state={from}
              to="/signup"
              className="text-blue-600 font-bold hover:underline underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
