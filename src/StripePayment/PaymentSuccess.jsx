import axios from "axios";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { HiCheckCircle } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";

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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-gray-100 transform transition-all hover:scale-[1.01]">
        {/* Animated Success Icon */}
        <div className="relative flex justify-center mb-6">
          <div className="absolute inset-0 bg-green-100 rounded-full scale-150 blur-xl opacity-50 animate-pulse"></div>
          <HiCheckCircle className="relative w-20 h-20 text-green-500 animate-bounce" />
        </div>

        {/* Text Content */}
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Payment Successful!</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Thank you for your purchase. Your payment was completed successfully. A confirmation email
          has been sent to your inbox.
        </p>

        {/* Transaction Info (Optional Style) */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-8 border border-slate-100">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Status</span>
            <span className="text-green-600 font-bold uppercase tracking-wider">Verified</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-95"
            to="/dashboard/my-orders"
          >
            Go to My Orders <BsArrowRight className="text-lg" />
          </Link>

          <Link
            className="w-full block text-slate-500 hover:text-slate-800 font-medium py-2 transition-colors"
            to="/"
          >
            Back to Home
          </Link>
        </div>

        {/* Bottom Badge */}
        <div className="mt-8 pt-6 border-t border-slate-50 flex justify-center gap-4 grayscale opacity-50">
          <span className="text-[10px] font-bold tracking-widest uppercase">Secured by Stripe</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
