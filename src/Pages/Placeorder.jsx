import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Title from '../Components/Title';
import Carttotal from '../Components/Carttotal';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const Placeorder = () => {
  const navigate = useNavigate();
  const [method,setMethod] = useState("cod");
  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    address:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const [errors,setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const validate = () => {
    const newErrors = {}
    if(!formData.firstName.trim()) newErrors.firstName = "First Name Is Required"
    if(!formData.lastName.trim()) newErrors.lastName = "Last Name Is Required"
    if(!formData.email.trim()){
      newErrors.email = "Email Is Required"
    } else if(!/^\S+@\S+\.\S+$/.test(formData.email)){
      newErrors.email = "Valid Email Is Required"
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.country.trim()) newErrors.country = 'Country is required'
    if (!/^\d{5,6}$/.test(formData.zipcode)) {
      newErrors.zipcode = 'Zipcode must be 5–6 digits'
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const {cartItems,backendUrl,token,getCartSummary,setCartItems} = useContext(ShopContext);

  const buildOrderItems = ()=> {
    const items = [];
    for(const productId in cartItems){
      for(const size in cartItems[productId]){
        items.push({
          productId,
          size,
          quantity:cartItems[productId][size]
        })
      }
    }
    return items;
  }

  const { finalTotal } = getCartSummary();


const handleRazorpayPayment = async (orderItems) => {
  const { data } = await axios.post(
    `${backendUrl}/api/order/razorpay`,
    { items: orderItems, amount: finalTotal, address: formData },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const razorpayOrder = data.order;
  const mongoOrderId = data.mongoOrderId;

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY,
    amount: razorpayOrder.amount,
    currency: "INR",
    order_id: razorpayOrder.id,

    handler: async function (response) {
      const verifyRes = await axios.post(
        `${backendUrl}/api/order/verify-razorpay`,
        
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderId: mongoOrderId, 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (verifyRes.data.success) {
        setCartItems({});
        navigate("/orders");
      }
    },
  };

  new window.Razorpay(options).open();
};



  
  const handleSubmit = async () => {
    if(!validate()) return
    if(!token){
      toast.error("Please Login First");
      navigate("/login");
      return;
    }
    const orderItems = buildOrderItems();
    if(orderItems.length === 0){
      toast.error("Your Cart Is Empty")
      return;
    }
    try {
      if(method === "cod"){
        const response = await axios.post(`${backendUrl}/api/order/cod`,{items:orderItems,amount:finalTotal,address:formData},{headers:{Authorization:`Bearer ${token}`}});
        if(response.data.success){
          toast.success("Placed Order Successfully");
          setCartItems({});
          navigate("/orders");
        } else{
          toast.error(response.data.message);
        }
      }

      if(method === "stripe"){
        const response = await axios.post(`${backendUrl}/api/order/stripe`,{items:orderItems,amount:finalTotal,address:formData},{headers:{Authorization:`Bearer ${token}`}});
        if(response.data.success){
          window.location.href = response.data.session_url;
        } else{
          toast.error(response.data.message)
        }
      }

      if (method === "razorpay") {
       await handleRazorpayPayment(orderItems);
}

    } catch (error) {
      console.log(error);
      toast.error("Order Is Failed")
    }
  }

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
     <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
      <div className='text-xl sm:text-2xl my-3'>
       <Title text1={"Delivery"} text2={"Information"}/>
      </div>
      <div className='flex gap-3'>
       <div className='w-full'>
       <input type="text" name='firstName' value={formData.firstName} onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' placeholder='First Name' />
       {errors.firstName && <p className='text-red-500 text-xs'>{errors.firstName}</p> }
       </div>
        <div className='w-full'>
       <input type="text" name='lastName' value={formData.lastName} onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' placeholder='Last Name' />
       {errors.lastName && <p className='text-red-500 text-xs'>{errors.lastName}</p> }
       </div>
      </div>
       <input type="email" name='email' value={formData.email} onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' placeholder='Email' />
       {errors.email && <p className='text-red-500 text-xs mt-[-12px]'>{errors.email}</p> }
       <input type="text" name='address' value={formData.address} onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' placeholder='Address' />
       {errors.address && <p className='text-red-500 text-xs mt-[-12px]'>{errors.address}</p> }
       <div className='flex gap-3'>
       <div className='w-full'>
       <input type="text" name='city' value={formData.city} onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' placeholder='City' />
       {errors.city && <p className='text-red-500 text-xs'>{errors.city}</p> }
       </div>
       <div className='w-full'>
       <input type="text" name='state' value={formData.state} onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' placeholder='State' />
       {errors.state && <p className='text-red-500 text-xs'>{errors.state}</p> }
       </div>
       </div>
       <div className='flex gap-3'>
        <div className='w-full'>
         <input type="text" name='zipcode' value={formData.zipcode} onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' placeholder='Zipcode' />
       {errors.zipcode && <p className='text-red-500 text-xs'>{errors.zipcode}</p> }
        </div>
        <div className='w-full'>
         <input type="text" name='country' value={formData.country} onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' placeholder='Country' />
       {errors.country && <p className='text-red-500 text-xs'>{errors.country}</p> }
        </div>
       </div>
       <input type="phone" name='phone' value={formData.phone} onChange={handleChange} className='border rounded py-1.5 px-3.5 w-full' placeholder='Phone' />
       {errors.phone && <p className='text-red-500 text-xs mt-[-12px]'>{errors.phone}</p> }
     </div>
     <div className='mt-8'>
      <div className='min-w-80'>
       <Carttotal/>
      </div>
      <div className='mt-12'>
       <Title text1={"Payment"} text2={"Method"}/>
       <div className='flex gap-3 flex-col lg:flex-row'>
        {['stripe', 'razorpay', 'cod'].map((item) => (
              <div
                key={item}
                onClick={() => setMethod(item)}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <span
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === item ? 'bg-green-400' : ''
                  }`}
                />
                {item === 'cod' ? (
                  <p className="text-gray-500 text-sm font-medium mx-4">
                    Cash On Delivery
                  </p>
                ) : (
                  <img
                    className="h-5 mx-4"
                    src={item === 'stripe' ? assets.stripe_logo : assets.razorpay_logo}
                    alt=""
                  />
                )}
              </div>
            ))}
       </div>
       <div className='w-full text-end mt-8'>
       <button className='bg-black text-white px-16 py-3 text-sm cursor-pointer' onClick={handleSubmit}>Place Order</button>
       </div>
      </div>
     </div>
    </div>
  )
}

export default Placeorder

