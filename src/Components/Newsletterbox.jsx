import React from "react";
import { assets } from "../assets/assets";

const Newsletterbox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section
      className="relative my-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.input_icon})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 py-14 text-center text-white">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Join Our Community
        </h2>

        <p className="mt-3 text-sm sm:text-base text-gray-200">
          Get exclusive offers and updates directly in your inbox.
        </p>

        {/* FORM */}
        <form
          onSubmit={onSubmitHandler}
          className="mt-6 w-full"
        >
          {/* Input */}
          <input
            type="email"
            required
            placeholder="Enter your email address"
            className="w-full px-4 py-3 text-sm text-gray-800 rounded-md bg-white"
          />

          {/* Button */}
          <button
            type="submit"
            className="mt-3 w-full bg-black text-white py-3 text-sm rounded-md hover:bg-gray-900 transition"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-3 text-xs text-gray-300">
          20% off on first order. No spam.
        </p>
      </div>
    </section>
  );
};

export default Newsletterbox;
