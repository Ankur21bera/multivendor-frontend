import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ShopContext } from "../Context/ShopContext";

const Verify = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { backendUrl, token, setCartItems,getUserCart } = useContext(ShopContext);

  const success = params.get("success");
  const orderId = params.get("orderId");

  useEffect(() => {
   const verifyPayment = async () => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/order/verify-stripe`,
      { success, orderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success("Payment Successful");

     
      await getUserCart();  
      setCartItems({});

      navigate("/orders");
    } else {
      toast.error("Payment Failed");
      navigate("/cart");
    }
  } catch (error) {
    console.log(error);
    toast.error("Verification Failed");
    navigate("/cart");
  }
};


    if (token && orderId) {
      verifyPayment();
    }
  }, [token, orderId]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-lg font-medium">Verifying Payment...</p>
    </div>
  );
};

export default Verify;
