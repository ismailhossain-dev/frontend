import { useNavigate } from "react-router";
import { FiHome, FiAlertTriangle, FiArrowLeft } from "react-icons/fi";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-[#0b1120] min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="container max-w-2xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Animated 404 Header */}
          <div className="relative">
            <h1 className="text-[12rem] md:text-[15rem] font-black text-slate-100 dark:text-slate-800/50 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/5 transform -rotate-12">
                <FiAlertTriangle className="text-green-500 text-5xl md:text-7xl animate-bounce" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mt-8 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Oops! Page Not <span className="text-green-500">Found</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
              The book you're looking for might be in another shelf or has been moved to a different
              library.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white font-bold text-sm uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
            >
              <FiArrowLeft size={18} />
              Go Back
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto px-10 py-4 flex items-center justify-center gap-2 rounded-2xl bg-slate-900 dark:bg-green-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-black dark:hover:bg-green-700 shadow-xl shadow-green-500/20 transition-all active:scale-95"
            >
              <FiHome size={18} />
              Take Me Home
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-16 pt-8 border-t border-slate-100 dark:border-white/5 w-full max-w-xs">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-4">
              Need Help?
            </p>
            <div className="flex justify-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <button
                onClick={() => navigate("/contact")}
                className="hover:text-green-500 transition-colors"
              >
                Contact Support
              </button>
              <button
                onClick={() => navigate("/all-books")}
                className="hover:text-green-500 transition-colors"
              >
                Browse Books
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
