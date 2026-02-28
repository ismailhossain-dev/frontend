import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import BookCategories from "./BookCategories";

const AdminCategory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: categories = [] } = useQuery({
    queryKey: ["category", user?.role],
    queryFn: async () => {
      const res = await axiosSecure.get("/allBooks");
      return res.data;
    },
  });

  const allCategoryName = categories.map((book) => book.category);
  //Duplicate data off
  const uniqueCategoryNames = [...new Set(allCategoryName)];
  console.log(uniqueCategoryNames);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mx-10 gap-6">
      {uniqueCategoryNames.map((category) => (
        <BookCategories key={category._id} data={category}></BookCategories>
      ))}
    </div>
  );
};

export default AdminCategory;
