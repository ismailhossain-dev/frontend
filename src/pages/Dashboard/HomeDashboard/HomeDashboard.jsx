import React from "react";
import { BookOpen, Truck, Users, Package, Search } from "lucide-react";

const HomeDashboard = () => {
  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      price: 450,
      stock: 120,
      status: "Available",
    },
    {
      id: 2,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      price: 380,
      stock: 75,
      status: "Available",
    },
    {
      id: 3,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 300,
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: 4,
      title: "Deep Work",
      author: "Cal Newport",
      price: 420,
      stock: 40,
      status: "Available",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <h1 className="text-3xl font-bold text-gray-900">BookCourier Home 📚</h1>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search books..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="h-7 w-7 text-indigo-600" />
              <p className="text-gray-600 font-medium">Total Books</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">1,240</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Package className="h-7 w-7 text-emerald-600" />
              <p className="text-gray-600 font-medium">Total Orders</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">860</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Truck className="h-7 w-7 text-blue-600" />
              <p className="text-gray-600 font-medium">Delivered</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">742</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-7 w-7 text-purple-600" />
              <p className="text-gray-600 font-medium">Customers</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">520</p>
          </div>
        </div>

        {/* Books Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Latest Books</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Book Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {books.map((book) => (
                  <tr
                    key={book.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{book.title}</td>
                    <td className="px-6 py-4 text-gray-600">{book.author}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">৳{book.price}</td>
                    <td className="px-6 py-4 text-gray-600">{book.stock}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          book.status === "Available"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {book.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
