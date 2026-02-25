import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { FiShoppingBag, FiX, FiCheckCircle } from "react-icons/fi";

const PurchaseModal = ({ closeModal, isOpen, book }) => {
  const { _id, name, category, price, image, seller, quantity: availableQuantity } = book || {};
  const { user } = useAuth();

  const handlePayment = async () => {
    const paymentInfo = {
      bookId: _id,
      name,
      category,
      price,
      image,
      quantity: 1, // আপনি চাইলে এখানে ইউজার থেকে ইনপুট নিতে পারেন
      seller,
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo,
      );
      window.location.href = data.url;
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <Transition shadow show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-[2rem] bg-white dark:bg-[#121826] p-8 shadow-2xl transition-all">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2 text-green-500">
                    <FiShoppingBag size={20} />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Checkout</span>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                <DialogTitle
                  as="h3"
                  className="text-2xl font-black text-slate-900 dark:text-white mb-6"
                >
                  Order Summary
                </DialogTitle>

                {/* Content Section */}
                <div className="space-y-4">
                  {/* Book Preview */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5">
                    <img
                      src={image}
                      alt={name}
                      className="w-16 h-20 object-cover rounded-lg shadow-md"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white line-clamp-1">
                        {name}
                      </h4>
                      <p className="text-xs text-slate-500">{category}</p>
                    </div>
                  </div>

                  {/* Info List */}
                  <div className="space-y-3 px-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">Customer</span>
                      <span className="text-slate-900 dark:text-slate-200 font-bold">
                        {user?.displayName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium">Stock Availability</span>
                      <span className="text-green-600 font-bold">{availableQuantity} Copies</span>
                    </div>
                    <hr className="border-slate-100 dark:border-white/5" />
                    <div className="flex justify-between items-center">
                      <span className="text-slate-900 dark:text-white font-black text-lg">
                        Total Price
                      </span>
                      <span className="text-2xl font-black text-green-500">${price}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <button
                    onClick={closeModal}
                    className="px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all uppercase text-[10px] tracking-widest border border-slate-100 dark:border-white/5"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handlePayment}
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black bg-slate-900 dark:bg-green-500 text-white hover:bg-black dark:hover:bg-green-600 shadow-xl shadow-green-500/10 transition-all uppercase text-[10px] tracking-widest"
                  >
                    Confirm & Pay
                  </button>
                </div>

                <p className="text-[10px] text-center text-slate-400 mt-6 flex items-center justify-center gap-1">
                  <FiCheckCircle className="text-green-500" /> Secure checkout powered by Stripe
                </p>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PurchaseModal;
