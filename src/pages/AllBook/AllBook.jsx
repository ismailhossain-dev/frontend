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
      const reslut = await axios(`${import.meta.env.VITE_API_URL}/allBooks`);
      console.log(reslut);
      return reslut.data;
    },
  });

 return(
     <Container>
   <div className="flex items-center justify-between">
     <h1 className="text-3xl   text-blue-500 my-2 font-semibold">Tranding All Book</h1>
     <select defaultValue="Pick a color" className="select w-30">
  <option className="font-bold">First</option>
  <option className="font-bold">Last</option>
 
  </select>
   </div>
    {AllBook && AllBook.length > 0 ? (
      <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* amra akane book take map korbo  */}
        {AllBook.map(allbooks => (
          <AllBookCard key={allbooks._id} allbooks={allbooks}></AllBookCard>
        ))}
      </div>
    ) : null}
  </Container>
 )
};

export default AllBook;
