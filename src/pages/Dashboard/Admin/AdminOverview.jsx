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
  Loader2,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"];

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { loading: authLoading } = useAuth(); // wait for auth
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    items: 0,
    revenue: 0,
    orders: 0,
  });

  // console.log(stats);
  // fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [usersRes, booksRes, ordersRes] = await Promise.all([
          axiosSecure.get("/users"),
          axiosSecure.get("/allBooks"),
          // axiosSecure.get("/orders"),
        ]);

        // console.log("Users:", usersRes.data);
        // console.log("Books:", booksRes.data);
        // console.log("Orders:", ordersRes.data);

        // const totalRevenue = ordersRes.data?.reduce(
        //   (sum, order) => sum + (Number(order.price) || 0),
        //   0,
        // );

        setStats({
          users: usersRes.data?.length || 0,
          items: booksRes.data?.length || 0,
          // revenue: totalRevenue || 0,
          // orders: ordersRes.data?.length || 0,
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [axiosSecure]);

  // loading spinner
  if (loading || authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Analytics Overview</h1>
          <p className="text-slate-500 font-medium mt-1">
            Hello Admin, here's what's happening today.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold">
          <ArrowUpRight size={18} />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users size={24} />} label="Total Users" value={stats.users} color="blue" />
        <StatCard
          icon={<Package size={24} />}
          label="Total Products"
          value={stats.items}
          color="purple"
        />
        {/* <StatCard
          icon={<DollarSign size={24} />}
          label="Total Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          color="emerald"
        />
        <StatCard
          icon={<ShoppingCart size={24} />}
          label="Orders"
          value={stats.orders}
          color="rose"
        /> */}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6 font-mono">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6 font-mono">Inventory</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={60}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Stat card component
const StatCard = ({ icon, label, value, color }) => {
  console.log(value);
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    purple: "text-purple-600 bg-purple-50",
    emerald: "text-emerald-600 bg-emerald-50",
    rose: "text-rose-600 bg-rose-50",
  };

  return (
    <div className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center">
        <div className={`p-4 rounded-2xl ${colors[color]}`}>{icon}</div>
        <div className="flex items-center gap-1 text-emerald-500 font-bold text-sm bg-emerald-50 px-2 py-1 rounded-lg">
          <TrendingUp size={14} /> 12%
        </div>
      </div>
      <div className="mt-6">
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{label}</p>
        <h2 className="text-3xl font-black text-slate-900 mt-1">{value}</h2>
      </div>
    </div>
  );
};

// Static chart data (you can replace with dynamic MongoDB data later)
const barData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
];

const pieData = [
  { name: "Books", value: 400 },
  { name: "Electronics", value: 300 },
  { name: "Groceries", value: 300 },
  { name: "Others", value: 200 },
];

export default AdminOverview;
