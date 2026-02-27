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

  //search work

  return (
    <Container>
      <div className="flex items-center justify-between">
        {/* Title */}
        <div className="text-center mt-10">
          <h1 className="text-5xl font-black text-slate-800 tracking-tighter uppercase dark:text-white ">
            Trending All <span className="text-blue-600">Books</span>
          </h1>
          <div className="h-1.5 w-16 bg-blue-600 mx-auto mt-2 rounded-full"></div>
        </div>
        {/* Search box  */}
        <select defaultValue="Pick a color" className="select w-30">
          <option className="font-bold">First</option>
          <option className="font-bold">Last</option>
        </select>
      </div>
      {AllBook && AllBook.length > 0 ? (
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* amra akane book take map korbo  */}
          {AllBook.map((book) => (
            <AllBookCard key={book._id} book={book}></AllBookCard>
          ))}
        </div>
      ) : null}
    </Container>
  );
};

export default AllBook;
