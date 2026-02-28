import React from "react";
import Card from "./Card";
import Container from "../../../src/components/Shared/Container";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Books = () => {
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/homeBooks`);
      return result.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  console.log(books);

  return (
    <Container>
      <div>
        <div className="text-center mt-10">
          <h1 className="text-5xl font-black text-slate-800 tracking-tighter uppercase dark:text-white ">
            Trending <span className="text-blue-600">Books</span>
          </h1>
          <div className="h-1.5 w-16 bg-blue-600 mx-auto mt-2 rounded-full"></div>
        </div>
        {books && books.length > 0 ? (
          <div className="py-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* amra akane book take map korbo  */}
            {books.map((book) => (
              <Card key={book._id} book={book}></Card>
            ))}
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default Books;
