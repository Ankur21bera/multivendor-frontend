import React from 'react'
import { assets } from '../assets/assets'

const Newsletterbox = () => {
    const onSubmitHandler = (e) => {
    e.preventDefault()
  }
  return (
    <section className='relative my-16 bg-cover bg-center bg-no-repeat' style={{backgroundImage:`url(${assets.input_icon})`}}>
     <div className='absolute inset-0 bg-black/60'>
     </div>
     <div className='relative z-10 max-w-3xl mx-auto px-6 py-16 text-center text-white'>
      <h2 className='text-3xl md:text-4xl font-semibold tracking-wide'>Join Our Community</h2>
      <p className='mt-4 text-sm md:text-base text-gray-200 leading-relaxed'>Subscribe to receive exclusive offers, early access to new arrivals,and the latest fashion trends delivered straight to your inbox.</p>
      <form className='mt-8 flex flex-col sm:flex-row items-center gap-3 bg-white rounded-full p-2 max-w-xl mx-auto' onSubmit={onSubmitHandler}>
       <input className='w-full sm:flex-1 px-5 py-3 text-sm text-gray-700 outline-none rounded-full' type="email" placeholder='Enter Your Email Address' />
       <button className='bg-black text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-800 transition cursor-pointer' type='submit'>Subscribe</button> 
      </form>
      <p className='mt-4 text-xs text-gray-300'>Get 20% off on your first order. No spam, unsubscribe anytime.</p>
     </div>
    </section>
  )
}

export default Newsletterbox