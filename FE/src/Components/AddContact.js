import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AddContact() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [postal_code, setPostalCode] = useState('')
  const [telephone, setTelephone] = useState('')
  const [userAccount, setUserAccount] = useState("");
  const [messageError, setMessageError] = useState('')
  const accessToken = Cookies.get("token");
  const navigate = useNavigate();
  const user = Cookies.get("user");
  

  const handleAdd = () => {
    axios({
      method: "POST",
      url: `http://localhost:8000/api/v1/profile/${userAccount.id}/addContact`,
      headers: { "auth-token": accessToken },
      data: {
        fk_id:userAccount.id,
        name,
        address,
        postal_code,
        telephone
      }
    })
      .then(res => {
        // if(res.data.status === 201){
        //   navigate('/dashboard')
        // }else{
        //   setMessageError(res.data.message)
        // }
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });


  };



  useEffect(() => {
    if (accessToken && user) {
      const data = JSON.parse(user);
      // console.log(user);
      setUserAccount(data)
    } else {
      navigate("/login");
    }
  }, [accessToken, user]);



  return (
    <div className='bg-green-400 w-full h-[918px]'>
      <div className='p-12'>
        <div className='mx-auto container rounded-lg bg-slate-200 shadow-xl h-[780px] p-5 w-5/12'>
          <div className='w-full p-5 h-32 rounded-lg text-center'>
            <h1 className='mb-10 text-5xl text-gray-700 my-2 uppercase'>Register</h1>
            <hr />
          </div>
          <div>
            {messageError === "" ? "" : <div className='h-22 bg-red-500 text-center p-3 opacity-70 rounded-md text-white text-xl'>{messageError}</div>}
            <div className=' p-5 h-22'>
              <label htmlFor='name'>
                <h5>name :</h5>
                <input type='text' onChange={(e) => setName(e.target.value)}  name='name' className='p-5 w-full rounded-md' placeholder='Enter your Email !' />
              </label>
            </div>
            <div className=' p-5 h-22'>
              <label htmlFor='address'>
                <h5>address :</h5>
                <input type='text' name='address' onChange={(e) => setAddress(e.target.value)}  className='p-5 w-full rounded-md' placeholder='Enter your Email !' />
              </label>
            </div>
            <div className='p-5 h-22'>
              <label htmlFor='telephone'>
                <h5>telephone :</h5>
                <input type='number' name='telephone' onChange={(e) => setTelephone(e.target.value)}  className='p-5 w-full rounded-md' placeholder='Enter your Password !' />
              </label>
            </div>
            <div className='p-5 h-22'>
              <label htmlFor='postal_code'>
                <h5>postal code :</h5>
                <input type='number' name='telephone' onChange={(e) => setPostalCode(e.target.value)}  className='p-5 w-full rounded-md' placeholder='Enter your Password !' />
              </label>
            </div>
            <div className='flex justify-around'>
              <button onClick={handleAdd} className='px-10 rounded-sm cursor-pointer text-white text-xl bg-green-700 py-3 hover:opacity-80'>Add</button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
