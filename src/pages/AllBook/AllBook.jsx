import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AllBookCard from "../AllBookCard/AllBookCard";
import Container from "../../components/Shared/Container";

const AllBook = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Intermediate");

  // Data Fetching
  const { data: allBooks = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/allBooks`);
      return result.data;
    },
  });

  // Unique Categories
  const categories = ["All", ...new Set(allBooks.map((book) => book.category))];

  // Filter + Search + Sort
  useEffect(() => {
    let filtered = [...allBooks];

    // Category Filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    // Search Filter
    if (searchQuery) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Sort High Price
    if (sortOption === "High") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredBooks(filtered);
  }, [selectedCategory, searchQuery, sortOption, allBooks]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.search.value);
  };

  return (
    <Container>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-5">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-800 uppercase dark:text-white">
            Trending All <span className="text-blue-600">Books</span>
          </h1>
          <div className="hidden sm:block h-1.5 w-16 bg-blue-600 mt-2 rounded-full"></div>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center  w-full">
            <label className="input input-bordered flex items-center gap-2 grow bg-base-100 shadow-sm border-gray-200">
              <input
                type="search"
                name="search"
                placeholder="Search by title..."
                className="grow outline-none bg-transparent"
              />
            </label>
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded-md  btn-primary  font-bold"
            >
              Find
            </button>
          </form>

          {/* Sort */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select select-bordered w-full sm:w-40"
          >
            <option value="Intermediate">Intermediate</option>
            <option value="High">High Price</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-10">
        {/* Sidebar Category */}
        <aside className="w-full lg:w-1/4">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl sticky top-24 border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Categories</h3>

            <div className="flex flex-wrap lg:flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-left transition-all font-medium ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Books Grid */}
        <main className="w-full lg:w-3/4">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-lg text-blue-600"></span>
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <AllBookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-gray-50 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-400">❌ No Books Found</h2>

              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setSortOption("Intermediate");
                }}
                className="mt-4 text-blue-600 underline"
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
