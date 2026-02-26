import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Users,
  Package,
  DollarSign,
  ShoppingCart,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ArrowUpRight,
} from "lucide-react";

// Static Data for Charts
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

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"];

// Static Data for Table
const recentOrders = [
  {
    id: "#ORD-001",
    user: "John Doe",
    item: "React Handbook",
    price: "$45.00",
    status: "Delivered",
  },
  { id: "#ORD-002", user: "Jane Smith", item: "Node.js Guide", price: "$32.00", status: "Pending" },
  {
    id: "#ORD-003",
    user: "Robert Fox",
    item: "UI Design Pro",
    price: "$120.00",
    status: "Shipped",
  },
  {
    id: "#ORD-004",
    user: "Mila Kunis",
    item: "Tailwind Master",
    price: "$25.00",
    status: "Delivered",
  },
];

const AdminOverview = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back! Here is what's happening today.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-indigo-200">
          <ArrowUpRight size={18} />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="text-blue-600" />}
          label="Total Users"
          value="12,540"
          growth="+12%"
        />
        <StatCard
          icon={<Package className="text-purple-600" />}
          label="Total Items"
          value="1,205"
          growth="+5%"
        />
        <StatCard
          icon={<DollarSign className="text-emerald-600" />}
          label="Total Revenue"
          value="$45,200"
          growth="+18%"
        />
        <StatCard
          icon={<ShoppingCart className="text-rose-600" />}
          label="Active Orders"
          value="142"
          growth="+2%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart - Monthly Sales */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Monthly Revenue</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b" }}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b" }} />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="sales" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Category Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Category Distribution</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-800">Recent Orders</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Filter orders..."
              className="px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-sm uppercase">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider">Order ID</th>
                <th className="px-6 py-4 font-medium tracking-wider">Customer</th>
                <th className="px-6 py-4 font-medium tracking-wider">Item</th>
                <th className="px-6 py-4 font-medium tracking-wider">Price</th>
                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                <th className="px-6 py-4 font-medium tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-indigo-600">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{order.user}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{order.item}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[12px] font-bold ${
                        order.status === "Delivered"
                          ? "bg-emerald-100 text-emerald-700"
                          : order.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Placeholder */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <p>Showing 1 to 4 of 50 entries</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-white transition-colors">
              Prev
            </button>
            <button className="px-3 py-1 border rounded bg-indigo-600 text-white">1</button>
            <button className="px-3 py-1 border rounded hover:bg-white transition-colors">2</button>
            <button className="px-3 py-1 border rounded hover:bg-white transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ icon, label, value, growth }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
    <div className="flex justify-between items-start">
      <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-white transition-colors">
        {icon}
      </div>
      <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-lg">
        {growth}
      </span>
    </div>
    <div className="mt-4">
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <h2 className="text-2xl font-bold text-slate-900 mt-1">{value}</h2>
    </div>
  </div>
);

export default AdminOverview;
