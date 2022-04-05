import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:8000/api/v1/register", {
          username: username,
          email: email,
          password: password,
        })
        .then(res => {
          console.log(res);
          if (res.status !== 201) {
            setMessageError(res.data.message);
          } else {
            navigate("/login");
          }
        });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className='bg-green-400 w-full h-[918px]'>
      <div className='p-12'>
        <div className='mx-auto container rounded-lg bg-slate-200 shadow-xl h-[780px] p-5 w-5/12'>
          <div className='w-full p-5 h-32 rounded-lg text-center'>
            <h1 className='mb-10 text-5xl text-gray-700 my-2 uppercase'>Register</h1>
            <hr />
          </div>
          <form action='post'>
            {messageError === "" ? "" : <div className='h-22 bg-red-500 text-center p-3 opacity-70 rounded-md text-white text-xl'>{messageError}</div>}
            <div className='m-5  p-5 h-22'>
              <label htmlFor='username'>
                <h5>Username :</h5>
                <input type='username' onChange={e => setUsername(e.target.value)} name='email' className='p-5 w-full rounded-md' placeholder='Enter your Email !' required />
              </label>
            </div>
            <div className='m-5  p-5 h-22'>
              <label htmlFor='email'>
                <h5>Email :</h5>
                <input type='email' name='email' onChange={e => setEmail(e.target.value)} className='p-5 w-full rounded-md' placeholder='Enter your Email !' required />
              </label>
            </div>
            <div className='m-5 p-5 h-22'>
              <label htmlFor='password'>
                <h5>Password :</h5>
                <input type='password' name='password' onChange={e => setPassword(e.target.value)} className='p-5 w-full rounded-md' placeholder='Enter your Password !' required />
              </label>
            </div>
            <div className='flex justify-around'>
              <input type='submit' onClick={e => handleRegister(e)} value='Register' className='px-10 rounded-sm cursor-pointer text-white text-xl bg-green-700 py-3 hover:opacity-80' />
              <a href='/login' className='px-10 rounded-sm cursor-pointer text-white text-xl bg-blue-700 py-3  hover:opacity-80'>
                LOGIN
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
