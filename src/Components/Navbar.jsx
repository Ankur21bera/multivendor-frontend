
import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [visible, setVisible] = useState(false)

  const {setShowSearch,getCartCount,token,setToken} = useContext(ShopContext)

  const navigate = useNavigate()

  const logoutHandler = () => {
    setToken('')
    toast.success("Logout Successfully")
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="flex items-center justify-between font-medium">
      
      <img className="w-30 h-30" src={assets.logo} alt="logo" />

      
      <ul className="hidden sm:flex gap-5 text-[22px] text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 h-[1.5px] bg-gray-700 hidden border-none" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/4 h-[1.5px] bg-gray-700 hidden border-none" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 h-[1.5px] bg-gray-700 hidden border-none" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 h-[1.5px] bg-gray-700 hidden border-none" />
        </NavLink>
      </ul>

     
      <div className="flex items-center gap-6">
       
        <img
          onClick={() => setShowSearch(true)}
          className="w-5 bg-white cursor-pointer"
          src={assets.search_icon}
          alt="search"
        />

        
        {!token ? (
        
          <Link to="/login">
            <button className="text-sm border px-4 py-1 rounded hover:bg-black hover:text-white transition">
              Login
            </button>
          </Link>
        ) : (
        
          <div className="group relative">
            <img
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt="profile"
            />

            <div className="absolute right-0 pt-4 hidden group-hover:block dropdown-menu">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <Link
                  to="/orders"
                  className="cursor-pointer hover:text-black"
                >
                  My Orders
                </Link>
                <p
                  onClick={logoutHandler}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        )}

      
        <Link to="/cart" className="relative">
          <img className="w-5 min-w-5" src={assets.cart_icon} alt="cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-[8px] leading-4 text-center bg-black text-white rounded-full aspect-square">
            {getCartCount()}
          </p>
        </Link>

        
        <img
          onClick={() => setVisible(true)}
          className="cursor-pointer w-5 sm:hidden"
          src={assets.menu_icon}
          alt="menu"
        />
      </div>

     
      <div
        className={`absolute top-0 right-0 bottom-0 bg-white overflow-hidden transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="back"
            />
            <p>Back</p>
          </div>

          <NavLink
            to="/"
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/collection"
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
          >
            Collection
          </NavLink>

          <NavLink
            to="/about"
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
          >
            Contact
          </NavLink>

          {!token && (
            <NavLink
              to="/login"
              className="py-2 pl-6 border"
              onClick={() => setVisible(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
