import React from "react";
import Card from "./Card";
import Container from "../Shared/Container";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Books = () => {
  //useQuery diye data fetch
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      // const reslut = await axios(`${import.meta.env.VITE_API_URL}/books`)
      const reslut = await axios(`${import.meta.env.VITE_API_URL}/sixBooks`);
      return reslut.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  console.log(books);

  return (
    <Container>
      <h1 className="text-3xl text-center text-blue-500 mt-10 font-semibold">Tranding Book</h1>
      {books && books.length > 0 ? (
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* amra akane book take map korbo  */}
          {books.map((book) => (
            <Card key={book._id} book={book}></Card>
          ))}
        </div>
      ) : null}
    </Container>
  );
};

export default Books;
