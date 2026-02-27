import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ContactAdminForm = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const contactData = {
      ...data,
      timestamp: new Date(),
    };

    axiosSecure
      .post("/contact", contactData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Thank you! Your message has been sent to the admin.");
          reset();
        }
      })
      .catch((err) => {
        console.error("Submission error:", err);
        toast.error("Failed to send message. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="bg-indigo-600 p-10 text-center text-white">
          <h2 className="text-3xl font-black tracking-tight uppercase">Contact Admin</h2>
          <p className="text-indigo-100 text-sm mt-2 font-medium">
            We'd love to hear from you. Please fill out the form below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          {/* User Name */}
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
              className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all duration-300 font-medium ${
                errors.name
                  ? "border-red-500 bg-red-50"
                  : "border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-2 ml-1 font-bold">{errors.name.message}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="hello@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all duration-300 font-medium ${
                errors.email
                  ? "border-red-500 bg-red-50"
                  : "border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2 ml-1 font-bold">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number - Fixed Field */}
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="e.g. 017XXXXXXXX"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9+]{11,14}$/,
                  message: "Please enter a valid phone number",
                },
              })}
              className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all duration-300 font-medium ${
                errors.phoneNumber
                  ? "border-red-500 bg-red-50"
                  : "border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-2 ml-1 font-bold">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Message for Admin */}
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
              Your Message
            </label>
            <textarea
              rows="4"
              placeholder="How can we help you today?"
              {...register("message", {
                required: "Message cannot be empty",
                minLength: { value: 10, message: "Message must be at least 10 characters" },
              })}
              className={`w-full px-5 py-4 rounded-2xl border outline-none transition-all duration-300 font-medium resize-none ${
                errors.message
                  ? "border-red-500 bg-red-50"
                  : "border-gray-100 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs mt-2 ml-1 font-bold">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-900 hover:bg-green-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em] mt-4"
          >
            Send Message 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactAdminForm;
