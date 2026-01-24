import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img className='w-20' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            Discover a world of endless possibilities at [Store Name], where style, quality, and convenience come together. Whether you’re shopping for the latest trends, timeless classics, or everyday essentials, our store has something for everyone.
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5 cursor-pointer'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600 cursor-pointer'>
               <li>Home</li>
               <li>About Us</li>
               <li>Delivery</li>
               <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>Get In Touch</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
             <li>+1-000-000-0000</li>
             <li>ShoppingStore@gmail.com</li>
            </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ Shopping-Store.com</p>
      </div>
    </div>
  )
}

export default Footer
