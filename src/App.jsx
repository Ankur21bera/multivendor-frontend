
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Collection from './Pages/Collection'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Placeorder from './Pages/Placeorder'
import Orders from './Pages/Orders'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import SearchBar from './Components/SearchBar'
import { Toaster } from 'react-hot-toast'
import Verify from './Pages/Verify'



const App = () => {

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Toaster/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/place-order' element={<Placeorder/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/verify-stripe' element={<Verify/>}/>
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App