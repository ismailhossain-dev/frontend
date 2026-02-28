import { useQuery } from "@tanstack/react-query";
import React from "react";

import ManageBookDataRow from "../../../components/Dashboard/TableRows/ManageBookDataRow";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBooks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: manageBooks = [],

    refetch,
  } = useQuery({
    queryKey: ["manage-books", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/manage-books");
      return res.data;
    },
  });

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr className="bg-gray-100 dark:bg-slate-800">
                    <th className="px-5 py-4 border-b border-gray-200 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-bold">
                      No:
                    </th>

                    <th className="px-5 py-4 border-b border-gray-200 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-bold">
                      Image
                    </th>

                    <th className="px-5 py-4 border-b border-gray-200 text-gray-800 dark:text-gray-200 text-left text-sm uppercase font-bold">
                      Category
                    </th>

                    <th className="px-5 py-4 border-b border-gray-200 text-gray-800 dark:text-gray-200 text-center text-sm uppercase font-bold">
                      Price
                    </th>

                    <th className="px-5 py-4 border-b border-gray-200 text-gray-800 dark:text-gray-200 text-center text-sm uppercase font-bold">
                      Status
                    </th>

                    <th className="px-5 py-4 border-b border-gray-200 text-gray-800 dark:text-gray-200 text-center text-sm uppercase font-bold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {manageBooks.map((book, index) => (
                    <ManageBookDataRow key={book._id} user={book} index={index} refetch={refetch} />
                  ))}
                </tbody>
              </table>

              {manageBooks.length === 0 && (
                <div className="text-center py-10 text-gray-500">No books found in the record.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBooks;
