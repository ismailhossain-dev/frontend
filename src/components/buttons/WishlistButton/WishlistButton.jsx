import React from 'react';
import { FiHeart } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';

const WishlistButton = ({book}) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    // console.log("wishlist Axios Secure", axiosSecure)
    // console.log("wishlist user", user)
    

      const handleWishlist = async(e) => {
    e.preventDefault(); 
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // console.log("wishlist book data", book)

    const result = await axiosSecure.post('/wishlist', {
        productId: book._id,
        title:book.title,
        price: book.price,
        rating:book.rating,
        image:book.image,
        quantity: book.quantity,
        name:user?.displayName, 
        email: user?.email,
        date: new Date().toISOString()
    })

    console.log("post insert successfully", result)
    
  };
    return (
        <div>
           <button
            onClick={handleWishlist}
            className="p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 text-slate-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-500 transition-all active:scale-90 shadow-md"
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <FiHeart
              size={16}
              className={`transition-colors ${
                isWishlisted ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </button>
        </div>
    );
};

export default WishlistButton;