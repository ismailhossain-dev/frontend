import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Container from "../../components/Shared/Container";
import Card from "../../components/Home/Card";

const AllBook = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Intermediate");

  const { data: allBooks = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/allBooks`);
      return result.data;
    },
  });

  const categories = ["All", ...new Set(allBooks.map((book) => book.category))];

  useEffect(() => {
    let filtered = [...allBooks];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "High") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredBooks(filtered);
  }, [selectedCategory, searchQuery, sortOption, allBooks]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.search.value);
  };

  return (
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-8 md:mt-12 gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            Trending All <span className="text-blue-600 dark:text-blue-500">Books</span>
          </h1>
          <div className="h-1.5 w-16 bg-blue-600 dark:bg-blue-500 mt-2 rounded-full"></div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <form onSubmit={handleSearch} className="relative w-full sm:w-72">
            <input
              type="search"
              name="search"
              placeholder="Search by title..."
              className="w-full pl-4 pr-20 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm transition-all text-sm"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors"
            >
              Search
            </button>
          </form>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full sm:w-44 px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm text-sm font-medium transition-all"
          >
            <option value="Intermediate">Sort by Default</option>
            <option value="High">Price: High to Low</option>
            <option value="Low">Price: Low to High</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <aside className="w-full lg:w-1/4">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-5 rounded-3xl sticky top-24 border border-gray-200/60 dark:border-gray-700/60 shadow-xl shadow-gray-100/50 dark:shadow-none transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></span>
              <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                Categories
              </h3>
            </div>

            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
              {categories.map((category) => {
                const isActive = selectedCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`group relative flex items-center justify-between whitespace-nowrap px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ease-out overflow-hidden flex-shrink-0 lg:flex-shrink ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-[1.01]"
                        : "bg-gray-50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:shadow-md"
                    }`}
                  >
                    {isActive && (
                      <span className="hidden lg:block absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                    )}

                    <span className="relative z-10 capitalize">{category}</span>

                    <svg
                      className={`hidden lg:block w-4 h-4 transition-transform duration-300 ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-blue-500 dark:text-blue-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="w-full lg:w-3/4">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-lg text-blue-600 dark:text-blue-500"></span>
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
              {filteredBooks.map((book) => (
                <Card key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-gray-50 dark:bg-gray-800/50 border border-gray-200/60 dark:border-gray-700/60 rounded-3xl">
              <h2 className="text-xl font-bold text-gray-500 dark:text-gray-400">
                ❌ No Books Found
              </h2>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setSortOption("Intermediate");
                }}
                className="mt-4 px-4 py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </Container>
  );
};

export default AllBook;