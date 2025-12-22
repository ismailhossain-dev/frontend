import React from "react";

const Section = () => {
  return (
    <div>
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700">Welcome to BookCourier</h1>
          <p className="mt-4 text-gray-600 text-lg">
            Order your favorite books online and get fast, reliable delivery right to your doorstep.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Browse Books
          </button>
        </div>
      </section>
      <section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center text-gray-800">
      Why Choose BookCourier?
    </h2>

    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="p-6 border-2 border-blue-500 rounded-xl text-center">
        <h3 className="text-xl font-semibold text-blue-600">
          Fast Delivery
        </h3>
        <p className="mt-2 text-gray-600">
          Quick and dependable book delivery across the country.
        </p>
      </div>

      <div className="p-10 border-2 border-blue-500 rounded-xl  text-center">
        <h3 className="text-xl font-semibold text-blue-600">
          Large Book Collection
        </h3>
        <p className="mt-2 text-gray-600">
          Thousands of popular, academic, and fiction books in one place.
        </p>
      </div>

      <div className="p-10 border-2 border-blue-500 rounded-xl text-center">
        <h3 className="text-xl font-semibold text-blue-600">
          Secure Payment
        </h3>
        <p className="mt-2 text-gray-600">
          Safe and easy payment methods for a smooth checkout experience.
        </p>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default Section;
