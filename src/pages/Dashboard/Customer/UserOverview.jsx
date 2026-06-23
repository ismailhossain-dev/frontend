import React from "react";
import {
  Package,
  Truck,
  CheckCircle,
  ArrowUpRight,
  Clock,
  Search,
  ChevronRight,
  Headphones,
} from "lucide-react";
import { Link } from "react-router";

const UserOverview = () => {
  const stats = [
    {
      label: "Total Orders",
      value: "25",
      icon: <Package size={22} />,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
      trend: "+12.5%",
    },
    {
      label: "My Orders",
      value: "0",
      icon: <Truck size={22} />,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
      trend: "Live",
    },
    {
      label: "Delivered",
      value: "0",
      icon: <CheckCircle size={22} />,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      trend: "94%",
    },
  ];

  const shipments = [
    {
      id: "BC-101",
      title: "The Alchemist",
      recipient: "Rahat Khan",
      status: "Delivered",
      date: "Feb 25, 2026",
      location: "Dhaka",
    },
    {
      id: "BC-102",
      title: "Atomic Habits",
      recipient: "Sumaiya Akter",
      status: "In Transit",
      date: "Feb 28, 2026",
      location: "Chittagong",
    },
    {
      id: "BC-103",
      title: "Deep Work",
      recipient: "Tanvir Ahmed",
      status: "Pending",
      date: "Mar 01, 2026",
      location: "Sylhet",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-300">
      {/* Background Subtle Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* ─── 1. HEADER SECTION ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Dashboard <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Overview</span>
            </h1>
            <p className="text-slate-500 dark:text-gray-400 mt-1 font-medium flex items-center gap-2 text-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Everything is running smoothly
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition shadow-xs">
              Last 30 Days <Clock size={15} />
            </button>
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-95 shadow-lg shadow-indigo-500/15 active:scale-[0.98] transition-all">
              New Shipment <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* ─── 2. STATS CARDS ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 dark:border-slate-800/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                  {stat.icon}
                </div>
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                  stat.label === "In Transit" ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10" : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10"
                }`}>
                  {stat.trend}
                </div>
              </div>
              <div className="mt-5">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                  {stat.value}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* ─── 3. CONTENT CONTENT SECTION ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Recent Shipments Component */}
          <div className="xl:col-span-2 bg-white dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-slate-800/60 shadow-xs p-6 md:p-7">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Recent Shipments
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Overview of your latest book orders.</p>
              </div>
              <button className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider hover:bg-indigo-50 dark:hover:bg-indigo-500/10 px-3 py-1.5 rounded-lg transition-colors">
                See All
              </button>
            </div>

            <div className="space-y-3">
              {shipments.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50/80 dark:hover:bg-slate-800/40 border border-transparent hover:border-gray-100 dark:hover:border-slate-800/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Package size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold mt-1 uppercase tracking-wide">
                        {item.id} <span className="mx-1 text-slate-300 dark:text-slate-700">•</span> {item.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="text-right">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wide ${
                          item.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : item.status === "In Transit"
                            ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                            : "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                        }`}
                      >
                        {item.status}
                      </span>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-1">
                        {item.date}
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Tools Area */}
          <div className="space-y-6">
            {/* Real-time Tracking Box */}
            <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 text-white relative overflow-hidden group shadow-xl">
              <div className="relative z-10">
                <h3 className="text-lg font-bold tracking-tight leading-snug">
                  Track Your Courier Fast
                </h3>
                <p className="text-slate-400 mt-1.5 text-xs font-normal leading-relaxed">
                  Enter your tracking number to get real-time delivery updates instantly.
                </p>

                <div className="mt-5 relative">
                  <input
                    type="text"
                    placeholder="BC-102..."
                    className="w-full pl-4 pr-12 py-3 bg-white/10 dark:bg-white/5 border border-white/10 rounded-xl focus:bg-white focus:text-slate-900 outline-none transition-all text-xs font-semibold placeholder:text-slate-500"
                  />
                  <button className="absolute right-1.5 top-1.5 bg-indigo-600 p-2 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all text-white">
                    <Search size={14} />
                  </button>
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-600/15 rounded-full blur-2xl group-hover:bg-indigo-600/30 transition-colors duration-500"></div>
            </div>

            {/* Support Ticket Box */}
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/60 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
                  <Headphones size={16} />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                  Need Support?
                </h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-5 font-medium leading-relaxed">
                Have any issues with your book shipment? Our dedicated team is ready to help you 24/7.
              </p>
              <Link
                to="/contact"
                className="block text-center w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white text-slate-700 dark:text-slate-300 py-2.5 rounded-xl font-bold text-xs transition-all tracking-wider uppercase"
              >
                Contact Support
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default UserOverview;