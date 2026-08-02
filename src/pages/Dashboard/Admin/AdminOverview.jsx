import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Package,
  DollarSign,
  ShoppingCart,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

// Dark Theme Palette colors for Charts
const COLORS = ["#10b981", "#06b6d4", "#8b5cf6", "#f43f5e"];

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    items: 0,
    revenue: 0,
    orders: 0,
  });

  // Fetch Dashboard Analytics Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [usersRes, booksRes, orderBooks] = await Promise.all([
          axiosSecure.get("/users"),
          axiosSecure.get("/allBooks"),
          axiosSecure.get("/all-orders"),
        ]);

        // Calculate Dynamic Total Revenue
        const totalRevenue = orderBooks.data?.reduce(
          (sum, order) => sum + (Number(order.price) || 0),
          0
        );

        setStats({
          users: usersRes.data?.length || 0,
          items: booksRes.data?.length || 0,
          orders: orderBooks.data?.length || 0,
          revenue: totalRevenue || 0,
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [axiosSecure]);

  if (loading || authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-10 min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* ─── HEADER ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glow Decor */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Analytics Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
            Welcome back Admin! Here is what's happening with your store today.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-emerald-500/10 active:scale-95 self-start md:self-auto">
          <ArrowUpRight size={18} />
          Export Report
        </button>
      </div>

      {/* ─── STATS CARDS GRID ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={<Users size={22} />}
          label="Total Users"
          value={stats.users}
          trend="+12%"
        />
        <StatCard
          icon={<Package size={22} />}
          label="Total Books"
          value={stats.items}
          trend="+5%"
        />
        <StatCard
          icon={<ShoppingCart size={22} />}
          label="Total Orders"
          value={stats.orders}
          trend="+18%"
        />
        <StatCard
          icon={<DollarSign size={22} />}
          label="Total Revenue"
          value={`$${stats.revenue.toFixed(2)}`}
          trend="+24%"
        />
      </div>

      {/* ─── CHARTS SECTION ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Bar Chart */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Revenue Trend
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Monthly
            </span>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "1rem",
                  color: "#f8fafc",
                }}
              />
              <Bar dataKey="sales" fill="#10b981" radius={[8, 8, 0, 0]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Pie Chart */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Inventory Share
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
              Categories
            </span>
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={80} paddingAngle={4}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="#0f172a" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "1rem",
                  color: "#f8fafc",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Chart Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800/80">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-xs text-slate-400">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="truncate">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── STAT CARD SUB-COMPONENT ─── */
const StatCard = ({ icon, label, value, trend }) => {
  return (
    <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-xl hover:border-slate-700/80 transition-all group">
      <div className="flex justify-between items-center">
        <div className="p-3 rounded-2xl bg-slate-800/80 text-emerald-400 border border-slate-700/50 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
          <TrendingUp size={13} /> {trend}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          {label}
        </p>
        <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
          {value}
        </h2>
      </div>
    </div>
  );
};

// Static Chart Sample Data
const barData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
];

const pieData = [
  { name: "Fiction", value: 400 },
  { name: "Sci-Fi", value: 300 },
  { name: "Self-Help", value: 300 },
  { name: "Others", value: 200 },
];

export default AdminOverview;