import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import Productitem from './Productitem'

const Latestcollection = () => {
   const {products} = useContext(ShopContext)
   const [latestProducts,setLatestProducts] = useState([]);
  
   useEffect(() => {
  if (products.length > 0) {
    setLatestProducts(products.slice(0, 10));
  }
}, [products]);
  return (
    <div className='my-10'>
     <div className='text-center py-8 text-3xl'>
     <Title text1={"Latest"} text2={"Collections"}/>
     <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
      Step into the season with our latest collection, inspired by global fashion trends and designed for bold self-expression. From casual essentials to statement outfits, find styles that keep you ahead of the curve.
     </p>
     </div>
     <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
      {
        latestProducts.map((item,index)=>(
          <Productitem key={index} id={item._id} name={item.name} image={item.image} price={item.basePrice}/>
        ))
      }
     </div>
    </div>
  )
}

export default Latestcollection