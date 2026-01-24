import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import Title from './Title';

const Carttotal = () => {
  const { currency, getCartSummary } = useContext(ShopContext);

  const {
    subTotal,
    discountTotal,
    gstTotal,
    shippingTotal,
    finalTotal,
  } = getCartSummary();

  return (
    <div className="w-full">
      <div className="text-xl mb-4">
        <Title text1={"Cart"} text2={"Total"} />
      </div>

      <div className="flex flex-col gap-3 text-sm text-gray-700">

        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{subTotal.toFixed(2)}</p>
        </div>

        <hr />

        <div className="flex justify-between text-green-600">
          <p>Discount</p>
          <p>-{currency}{discountTotal.toFixed(2)}</p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>GST</p>
          <p>{currency}{gstTotal.toFixed(2)}</p>
        </div>

        <hr />

        <div className="flex justify-between text-gray-500">
          <p>Shipping</p>
          <p>{currency}{shippingTotal.toFixed(2)}</p>
        </div>

        <hr />

        <div className="flex justify-between text-base font-semibold">
          <p>Total Payable</p>
          <p>{currency}{finalTotal.toFixed(2)}</p>
        </div>

      </div>
    </div>
  );
};

export default Carttotal;
