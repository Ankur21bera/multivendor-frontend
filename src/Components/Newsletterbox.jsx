import React from "react";
import { assets } from "../assets/assets";

const Newsletterbox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <section
      className="relative my-24 bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.input_icon})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-20 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Join Our Community
        </h2>

        <p className="mt-3 text-sm md:text-base text-gray-200">
          Get exclusive offers, early access, and latest updates straight to
          your inbox.
        </p>

        {/* Input Box */}
        <form
          onSubmit={onSubmitHandler}
          className="mt-8 flex items-center bg-white/95 rounded-md overflow-hidden max-w-lg mx-auto"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 text-sm hover:bg-gray-900 transition"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-3 text-xs text-gray-300">
          20% off your first order. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Newsletterbox;
