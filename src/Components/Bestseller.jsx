
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';
import Productitem from './Productitem';

const Bestseller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter(item => item.bestseller === true);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-14">
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLERS" />
        <p className="mt-4 w-4/5 sm:w-3/5 mx-auto text-sm md:text-base text-gray-600 leading-relaxed">
          Discover our most-loved styles, trusted by customers for their quality,
          comfort, and timeless appeal.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-8">
        {bestSeller.map(item => (
          <Productitem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.basePrice}
          />
        ))}
      </div>
    </div>
  );
};

export default Bestseller;
