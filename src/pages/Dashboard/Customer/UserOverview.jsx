import React from "react";
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  Heart,
} from "lucide-react";

// Chart.js Imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const UserOverview = () => {
  // ডাইনামিক ডেটার জন্য প্লেসহোল্ডার
  const stats = [
    {
      label: "Total Orders",
      value: "25",
      icon: <Package size={22} />,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Pending Orders",
      value: "3",
      icon: <Clock size={22} />,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "In Transit",
      value: "2",
      icon: <Truck size={22} />,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      label: "Delivered",
      value: "20",
      icon: <CheckCircle size={22} />,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Wishlist Books",
      value: "12",
      icon: <Heart size={22} />,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
  ];

  // চার্টের ডেটা
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        fill: true,
        label: "Orders Placed",
        data: [2, 5, 3, 8, 4, 10, 6],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.15)",
        tension: 0.4,
        pointBackgroundColor: "#6366f1",
        pointBorderColor: "#ffffff",
        pointHoverRadius: 6,
      },
    ],
  };

  // চার্টের অপশন (ডার্ক থিমের সাথে মানানসই)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#f8fafc",
        bodyColor: "#f8fafc",
        borderColor: "#334155",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#94a3b8",
        },
      },
      y: {
        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
        ticks: {
          color: "#94a3b8",
          stepSize: 2,
        },
      },
    },
  };

  return (
    /* পুরো পেজের ব্যাকগ্রাউন্ড সবসময় ডার্ক (bg-slate-950) থাকবে */
    <div className="min-h-screen p-4 md:p-8 bg-slate-950 text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8 mt-6">
        
        {/* ─── 1. HEADER SECTION ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Dashboard <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">Overview</span>
            </h1>
            <p className="text-slate-400 mt-1 font-medium flex items-center gap-2 text-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Welcome back to your activity panel
            </p>
          </div>
        </div>

        {/* ─── 2. STATS CARDS ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-900 p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold text-white mt-1 tracking-tight">
                  {stat.value}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* ─── 3. CHART SECTION ─── */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Order Activity
              </h2>
              <p className="text-xs text-slate-400">
                Monthly overview of your book purchases
              </p>
            </div>
          </div>

          {/* Chart Container */}
          <div className="h-72 w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserOverview;