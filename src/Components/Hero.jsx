import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';

const Hero = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col-reverse sm:flex-row items-center border border-gray-300'>
     <div className='w-full sm:w-1/2 flex items-center justify-center px-6 py-12 sm:py-0'>
      <div className='text-[#2f2f2f] max-w-md'>
       <div className='flex items-center gap-3 mb-3'>
        <span className='w-10 h-[2px] bg-[#2f2f2f]'></span>
        <p className='text-sm tracking-widest font-medium uppercase'>Trending Now</p>
       </div>
       <h1 className='text-4xl lg:text-6xl leading-tight mb-4'>New Season <br /> Styles</h1>
       <p className='text-sm text-gray-600 mb-6'>Discover the latest fashion trends curated for a modern lifestyle.</p>
       <button onClick={()=>navigate('/collection')} className='flex items-center gap-3 group'>
        <span className='font-semibold text-sm tracking-wide'>Shop Collection</span>
         <span className="w-10 h-[1.5px] bg-[#2f2f2f] group-hover:w-14 transition-all duration-300"></span>
       </button>
      </div>
     </div>
     <div className='w-full sm:w-1/2'>
      <img className='w-full h-full object-cover' src={assets.hero_img} alt="" />
     </div>
    </div>
  )
}

export default Hero