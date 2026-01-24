import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {backendUrl,setToken} = useContext(ShopContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if(currentState === "Reset Password"){
        if(password !== confirmPassword){
          toast.error("Password Is Not Match");
          return;
        }
        const response = await axios.post(`${backendUrl}/api/user/reset-password`,{email,newPassword:password});
        if(response.data.success){
          toast.success(response.data.message);
          setCurrentState("Login")
        } else{
          toast.error(response.data.message)
        }
        return;
      }
      if(currentState === "Forgot Password"){
        const response = await axios.post(`${backendUrl}/api/user/forgot-password`,{email});
        if(response.data.success){
          toast.success(response.data.message);
          setCurrentState("Reset Password")
        } else{
          toast.error(response.data.message)
        }
        return;
      }
      if(currentState === "Sign Up"){
        const response = await axios.post(`${backendUrl}/api/user/register-user`,{
          name:email.split('@')[0],
          email,
          password
        })
        if(response.data.success){
          toast.success(response.data.message);
          setToken(response.data.token);
          sessionStorage.setItem('token',response.data.token);
          navigate("/")
        } else{
          toast.error(response.data.message)
        }
        return;
      }
      if(currentState === "Login"){
        const response = await axios.post(`${backendUrl}/api/user/login-user`,{
          email,
          password
        })
        if(response.data.success){
          toast.success(response.data.message);
          setToken(response.data.token);
          sessionStorage.setItem('token',response.data.token);
          navigate('/')
        } else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong")
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* Heading */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Name */}
      {currentState === 'Sign Up' && (
        <input
          type="text"
          placeholder="Enter Your Name"
          className="w-full px-3 py-2 border border-gray-800"
          required
        />
      )}

      {/* Email */}
      {(currentState === 'Login' ||
        currentState === 'Sign Up' ||
        currentState === 'Forgot Password') && (
        <input
          type="email"
          placeholder="Enter Your Email"
          className="w-full px-3 py-2 border border-gray-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      )}

      {/* Password */}
      {(currentState === 'Login' ||
        currentState === 'Sign Up' ||
        currentState === 'Reset Password') && (
        <input
          type="password"
          placeholder="Enter Your Password"
          className="w-full px-3 py-2 border border-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      )}

      {/* Confirm Password */}
      {currentState === 'Reset Password' && (
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-3 py-2 border border-gray-800"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      )}

      {/* Links */}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === 'Login' && (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState('Forgot Password')}
          >
            Forgot Password
          </p>
        )}

        {currentState === 'Login' ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState('Sign Up')}
          >
            Create account?
          </p>
        ) : currentState === 'Sign Up' ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState('Login')}
          >
            Login Here
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState('Login')}
          >
            Back to Login
          </p>
        )}
      </div>

      {/* Button */}
      <button className="bg-black text-white cursor-pointer font-light px-8 py-2 mt-4">
        {currentState === 'Login' && 'Sign In'}
        {currentState === 'Sign Up' && 'Sign Up'}
        {currentState === 'Forgot Password' && 'Forgot Password'}
        {currentState === 'Reset Password' && 'Reset Password'}
      </button>
    </form>
  )
}

export default Login
