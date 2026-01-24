import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom';

const Productitem = ({id,image,name,price}) => {
   
  return (
    <Link to={`/product/${id}`} className='group block rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition duration-300'>
     <div className='relative overflow-hidden rounded-t-xl bg-gray-100'>
      <img className='h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110' src={image[0]} alt="" />
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-300"></div>
     </div>
     <div className='p-4'>
      <h3 className='text-sm font-medium text-gray-800 truncate'>{name}</h3>
      <div className='mt-2 flex items-center justify-between'>
      <p className='text-base font-semibold text-gray-900'>${price}</p>
      <span className="text-xs font-medium text-gray-500 group-hover:text-black transition">
            View →
       </span>
      </div>
     </div>
    </Link>
  )
}

export default Productitem