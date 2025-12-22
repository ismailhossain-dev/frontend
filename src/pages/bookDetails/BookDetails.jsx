import React, { useState } from "react";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
const BookDetails = () => {
  //pyment work start
  let [isOpen, setIsOpen] = useState(false);
  //dynamic id use
  const { id } = useParams();
  //dynamic payment model work 
  
 
  const { data: book = {}, isLoading } = useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books/${id}`)
      return result.data
    },
  })

  const closeModal = () => {
    setIsOpen(false)
  };
  //loadin me
  if(isLoading) return <LoadingSpinner/>
//
  const { image, name, description, quantity, price, seller,category } = book;
  console.log(book);
  //payment work finished 
  return (
    
  <div>
      <Container className=''>
      <div className="mx-auto  flex flex-col lg:flex-row justify-between w-full gap-12 mb-5 ">
        {/* Header */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <div className="w-full h-[500px] overflow-hidden rounded-xl">
              <img className="object-cover h-[550px] w-full" src={image} />
            </div>
          </div>
        </div>
        <div className="md:gap-10 flex-1">
          {/* Plant Info */}
          <Heading title={name} subtitle={category} />
          <hr className="my-5" />
          <div
            className="
          text-lg font-light text-neutral-500"
          >
            {description}
          </div>
          <hr className="my-5" />

          <div
            className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              "
          >
            <div>Librarian: {seller?.email}</div>
            
          </div>
          <hr className="my-5"/>
            <p>Address: Dhaka</p>
          <hr className="my-5" />
          <p className="font-semibold my-5">Phone Number :01820429181</p>
          <hr/>
          <div>
            <p
              className="
                gap-4 
                font-light
                text-neutral-500
              "
            >
              Quantity:{quantity}
            </p>
          </div>
          <hr className="my-5" />
          <div className="flex justify-between">
            <p className="font-bold text-3xl text-gray-500">Price:{price}$</p>
            <div>
              <Button onClick={() => setIsOpen(true)} label="Order Now" />
            </div>
          </div>
          <hr className="my-6" />

          {/* pyment model */}
          <PurchaseModal book={book} closeModal={closeModal} isOpen={isOpen} />
        </div>
      </div>
    </Container>
  </div>
  );
};

export default BookDetails;
