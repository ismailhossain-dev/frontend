import React from "react";
import {
  Package,
  Truck,
  CheckCircle,
  ArrowUpRight,
  Clock,
  MapPin,
  ChevronRight,
  Search,
} from "lucide-react";
import { Link } from "react-router";

const UserOverview = () => {
  const stats = [
    {
      label: "Total Books Sent",
      value: "25",
      icon: <Package size={22} />,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
    },
    {
      label: "In Transit",
      value: "03",
      icon: <Truck size={22} />,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
    },
    {
      label: "Delivered",
      value: "21",
      icon: <CheckCircle size={22} />,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
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
    <div className="min-h-screen p-4 md:p-8 relative overflow-hidden bg-[#f8fafc]">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] bg-indigo-100/50 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[25%] h-[25%] bg-blue-100/50 rounded-full blur-[80px] -z-10"></div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Dashboard <span className="text-indigo-600">Overview</span>
            </h1>
            <p className="text-slate-500 mt-1 font-medium flex items-center gap-2 text-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Everything is running smoothly
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
              Last 30 Days <Clock size={16} />
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              New Shipment <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        {/* 2. Stats Cards - Clean Glass Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-md p-6 rounded-[28px] border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <div className={`${stat.bg} ${stat.color} p-3.5 rounded-2xl`}>{stat.icon}</div>
                <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">
                  +12.5%
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[1.5px]">
                  {stat.label}
                </p>
                <h3 className="text-4xl font-black text-slate-900 mt-1 tracking-tight">
                  {stat.value}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Content Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Shipments List */}
          <div className="xl:col-span-2 bg-white/90 backdrop-blur-sm rounded-[32px] border border-white shadow-xl shadow-slate-200/50 p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight text-center sm:text-left">
                Recent Shipments
              </h2>
              <button className="text-indigo-600 text-xs font-black uppercase tracking-widest hover:bg-indigo-50 px-3 py-2 rounded-xl transition">
                See All
              </button>
            </div>

            <div className="space-y-3">
              {shipments.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center justify-between p-4 rounded-[22px] hover:bg-indigo-50/40 border border-transparent hover:border-indigo-50 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Package size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 leading-none">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 font-bold mt-1.5 uppercase tracking-wider">
                        {item.id} • {item.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="hidden md:block text-right">
                      <p
                        className={`text-[10px] font-black px-2 py-0.5 rounded-md inline-block ${
                          item.status === "Delivered"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {item.status.toUpperCase()}
                      </p>
                      <p className="text-[10px] text-slate-300 font-bold mt-1 uppercase italic">
                        {item.date}
                      </p>
                    </div>
                    <ChevronRight
                      size={18}
                      className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tools */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group shadow-2xl">
              <div className="relative z-10">
                <h3 className="text-xl font-black leading-snug">
                  Track Your <br /> Courier Fast.
                </h3>
                <p className="text-slate-400 mt-3 text-xs font-medium leading-relaxed">
                  Enter your tracking number to get real-time delivery status.
                </p>

                <div className="mt-6 relative">
                  <input
                    type="text"
                    placeholder="BC-000000"
                    className="w-full pl-4 pr-12 py-3.5 bg-white/10 border border-white/10 rounded-2xl focus:bg-white focus:text-slate-900 outline-none transition-all text-sm font-bold placeholder:text-slate-500"
                  />
                  <button className="absolute right-2 top-2 bg-indigo-600 p-1.5 rounded-xl hover:scale-105 active:scale-95 transition">
                    <Search size={18} />
                  </button>
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-600/20 rounded-full blur-2xl group-hover:bg-indigo-600/40 transition-colors"></div>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-lg">
              <h3 className="font-black text-slate-800 mb-5 flex items-center gap-2">
                Need Support?
              </h3>
              <p className="text-slate-500 text-sm mb-6 font-medium">
                Have issues with your book courier? Our team is here to help you 24/7.
              </p>
              <Link
                to="/contact"
                className="w-full border-2 btn bg-primary text-white border-slate-100 text-slate-800 py-3.5 rounded-2xl font-black text-xs transition-all uppercase tracking-widest"
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
