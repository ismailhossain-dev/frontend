import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import AllBookCard from "../AllBookCard/AllBookCard";
import Container from "../../components/Shared/Container";

const AllBook = () => {
  //react usequery diye data fetch
  const { data: AllBook = [] } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      // const reslut = await axios(`${import.meta.env.VITE_API_URL}/books`)
      const result = await axios(`${import.meta.env.VITE_API_URL}/allBooks`);
      // console.log(result);
      return result.data;
    },
  });
  const [filteredBooks, setFilteredBooks] = React.useState([]);
  const [isSearched, setIsSearched] = React.useState(false);
  //search work
  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.toLowerCase();

    setIsSearched(true);

    const result = AllBook.filter((book) => book.title.toLowerCase().includes(location));

    setFilteredBooks(result);
  };

  return (
    <Container>
      <div className="flex justify-between items-center mt-10">
        {/* Title */}
        <div className="text-center ">
          <h1 className="text-[10x] sm:text-xl md:text-3xl lg:text-4xl font-black text-slate-800 tracking-tighter uppercase dark:text-white ">
            Trending All <span className="text-blue-600">Books</span>
          </h1>
          <div className="hidden sm:block h-1.5 w-16 bg-blue-600 mx-auto mt-2 rounded-full"></div>
        </div>

        {/* search  */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 ">
          <label className="input input-bordered flex items-center gap-2 grow bg-base-100 shadow-sm focus-within:shadow-md transition-all duration-300 border-gray-200 dark:border-gray-700">
            {/* Search Icon */}
            <svg
              className="h-[1.2em] opacity-60 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>

            {/* Input Field */}
            <input
              type="search"
              name="location"
              placeholder="Search locations..."
              className="w-28 sm:w-48 md:w-64 grow outline-none bg-transparent"
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary px-3 font-bold hover:scale-105  transition-transform duration-200"
          >
            Find
          </button>
        </form>
        {/* finished search work */}
      </div>
      {/*  */}

      {AllBook && (
        <>
          {isSearched ? (
            filteredBooks.length > 0 ? (
              <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredBooks.map((book) => (
                  <AllBookCard key={book._id} book={book} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-500">❌ No Product Found</h2>
              </div>
            )
          ) : (
            <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {AllBook.map((book) => (
                <AllBookCard key={book._id} book={book} />
              ))}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default AllBook;
