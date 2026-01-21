import axios from "axios";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { GrAchievement } from "react-icons/gr";
import paymentImg from "../assets/images/payment-succes-image.jpg";
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
        sessionId,
      });
    }
  }, [sessionId]);
  return (
    <div className="bg-purple-700">
      <div className="flex  justify-between items-center w-9/12 mx-auto flex-col-reverse md:flex-row py-5">
        <div className="text-center">
          <GrAchievement className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h2 className="font-bold text-3xl">Payment successful</h2>
          <p className="text-sm text-black space-y-2">
            Payment Successful Your payment was completed successfully.
            <br /> Thank you for your purchase. A confirmation has been sent to your email.
          </p>
          <Link className="btn btn-primary mt-4" to="/dashboard/my-orders">
            Go to My Orders
          </Link>
        </div>
        <div className="">
          <img
            src={paymentImg}
            className="w-100 h-100 bg-no-repeat bg-cover rounded-lg border "
            alt=""
          />
        </div>
      </div>
    </div>
    // <div className="flex flex-col items-center justify-center">
    //   <div className="bg-black p-10 my-5 rounded-lg shadow-lg text-center">
    //     <GrAchievement className="w-16 h-16 text-pink-500 mx-auto mb-4" />
    //     <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
    //     <p className="text-gray-600 mb-6">
    //       Thank you for your purchase. Your order is being processed.
    //     </p>
    //     <Link
    //       to="/dashboard/my-orders"
    //       className="inline-block bg-pink-500 text-white font-semibold py-2 px-4 rounded hover:bg-pink-600 transition duration-300"
    //     >
    //       Go to My Orders
    //     </Link>
    //   </div>
    // </div>
  );
};

export default PaymentSuccess;
