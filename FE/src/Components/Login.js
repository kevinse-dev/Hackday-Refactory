import React, { useState } from "react";
import Cookies from 'js-cookie'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [messageError, setMessageError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async(e)  => {
    e.preventDefault()
    await axios.post('http://localhost:8000/api/v1/login', {
      email,
      password
    }).then(res => {
      console.log('data',res);
      const accessToken = res.data.accessToken
      Cookies.set('token', accessToken)
      const user = {
        id: res.data.user.id,
        username:res.data.user.username,
        email:res.data.user.email
      }
      
      Cookies.set('user', JSON.stringify(user))
      navigate('/dashboard')
    }).catch(err => {
      setMessageError(err.response.data.message)
    })
  }
  

  return (
    <div className='bg-blue-400 w-full h-[918px]'>
      <div className='p-12'>
        <div className='mx-auto container rounded-lg bg-slate-200 shadow-xl h-[780px] p-5 w-5/12'>
          <div className='w-full p-5 h-32 rounded-lg text-center'>
            <h1 className='mb-10 text-5xl text-gray-700 my-2 uppercase'>login</h1>
            <hr />
          </div>
          <form>
          {messageError === "" ? "" : <div className='h-22 bg-red-500 text-center p-3 opacity-70 rounded-md text-white text-xl'>{messageError}</div>}
            <div className='m-5 pt-12 p-5 h-44'>
              <label htmlFor='email'>
                <h5>Email :</h5>
                <input type='email' onChange={(e) => setEmail(e.target.value)} name='email' className='p-5 w-full rounded-md' placeholder='Enter your Email !' required />
              </label>
            </div>
            <div className='m-5 p-5  h-44'>
              <label htmlFor='password'>
                <h5>Password :</h5>
                <input type='password' onChange={(e) => setPassword(e.target.value)} name='password' className='p-5 w-full rounded-md' placeholder='Enter your Password !' required />
              </label>
            </div>
            <button onClick={(e) => handleLogin(e)} className='px-10 rounded-sm cursor-pointer text-white text-xl bg-blue-700 py-3 ml-5 hover:opacity-80'>LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  );
}
