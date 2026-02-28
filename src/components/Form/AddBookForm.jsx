import React from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import toast from "react-hot-toast";
const AddBookForm = () => {
  //tanstack query use
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/books`, payload),
    // onSuccess toas dekabo
    onSuccess: (data) => {
      toast.success("Book added successful");
      mutationReset();
      console.log(data);
    },
    //eta retry korbe amr function continue takle
    retry: 3,
  });

  //user ta amra useAuth teke niye asbo
  const { user } = useAuth();
  //React Hooks teke asche
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, //amra reset use kore from clear korbo
  } = useForm();
  //amra akane image upload er kaj ta korbo
  const onSubmit = async (data) => {
    const { name, description, quantity, price, category, image } = data;

    const imageFile = image[0];

    try {
      const imageUrl = await imageUpload(imageFile);

      const bookData = {
        image: imageUrl,
        name,
        description,
        quantity: Number(quantity), //Convert number
        price: Number(price), //Convert number
        category,
        //amra akane seller objet er detais dekabo
        seller: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };
      await mutateAsync(bookData);
      reset(); //from clear reset
    } catch (err) {
      console.log(err);
    }
  };

  //pending hole amra loading spinner dekabo
  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 bg-cyan-700 p-10 rounded-md ">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm ">
              <label htmlFor="name" className="block  text-white">
                {" "}
                Book Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border focus:outline-blue-500 rounded-md bg-white"
                id="name"
                type="text"
                placeholder="Book Name"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 20,
                    message: "Name cannot be longer than 20 characters",
                  },
                })}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-white ">
                Category
              </label>
              <select
                className="w-full px-4 py-3 focus:outline-blue-500 rounded-md bg-white"
                name="category"
                {...register("category", {
                  required: "category is required",
                })}
              >
                <option value="Fiction">Fiction</option>
                <option value="Academic">Academic</option>
                <option value="Islamic">Islamic</option>
              </select>
              {/* kono kichu missing takle error message ta dekabe */}
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
              )}
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm border-blue-500 ">
              <label htmlFor="description" className="block text-white">
                description
              </label>

              <textarea
                id="description"
                placeholder="Write plant description here..."
                className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border bg-white focus:outline-blue-500 "
                name="description"
                {...register("description", {
                  required: "description is required",
                })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-white ">
                  Book Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border focus:outline-blue-500 rounded-md bg-white"
                  id="price"
                  type="number"
                  placeholder="Price per unit"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" },
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
                )}
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label htmlFor="quantity" className="block text-white">
                  Quantity
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border  focus:outline-blue-500 rounded-md bg-white"
                  id="quantity"
                  type="number"
                  placeholder="Available quantity"
                  {...register("quantity", {
                    required: "quantity is required",
                  })}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>
                )}
              </div>
            </div>
            {/* Image */}
            <div className=" p-4  w-full  m-auto rounded-lg grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-blue-500 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      id="image"
                      accept="image/*"
                      hidden
                      {...register("image", {
                        required: "Image is required",
                      })}
                    />

                    <div className="bg-pink-400 text-white rounded font-semibold cursor-pointer p-1 px-3 hover:bg-pink-500">
                      Upload
                    </div>
                  </label>
                </div>
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-pink-500 hover:scale-105 "
            >
              {/* Save & Continue button */}
              {isPending ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Save & Continue"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddBookForm;
