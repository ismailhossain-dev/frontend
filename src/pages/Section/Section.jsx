import React from "react";
import { FiTruck, FiBookOpen, FiShield, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";

const Section = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative bg-white dark:bg-[#0b1120] py-20 lg:py-32 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 text-green-600 dark:text-green-400 text-xs font-black uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Direct to your doorstep
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter mb-6">
            Your Premium Gateway <br />
            To The World of <span className="text-green-500">Books</span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-10">
            Order your favorite books online and experience the fastest, most reliable delivery
            service in the country. Knowledge is just a click away.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/all-books">
              <button className="w-full sm:w-auto px-10 py-4 bg-slate-900 dark:bg-green-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-black dark:hover:bg-green-700 transition-all shadow-xl shadow-green-500/20 flex items-center justify-center gap-2 group">
                Browse Collection
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-black text-sm uppercase tracking-widest rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-24 bg-slate-50 mb-10 dark:bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-green-500 uppercase  mb-3">Core Values</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Why Choose BookCourier?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-10 bg-white dark:bg-[#121826] rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-8 group-hover:bg-green-500 group-hover:text-white transition-all duration-500">
                <FiTruck size={30} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Express Delivery
              </h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                We pride ourselves on lightning-fast and dependable book delivery across every
                corner of the country.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-10 bg-white dark:bg-[#121826] rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-8 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                <FiBookOpen size={30} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Curated Library
              </h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Explore thousands of popular titles, academic essentials, and fiction masterpieces
                all in one premium space.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-10 bg-white dark:bg-[#121826] rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-8 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                <FiShield size={30} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Secure Checkout
              </h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                Experience peace of mind with our encrypted, safe, and seamless payment methods for
                every order.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section;
