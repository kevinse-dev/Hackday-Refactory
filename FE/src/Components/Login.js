import React from "react";

export default function Login() {
  return (
    <div className='bg-blue-400 w-full h-[918px]'>
      <div className='p-12'>
        <div className='mx-auto container rounded-lg bg-slate-200 shadow-xl h-[780px] p-5 w-5/12'>
          <div className='w-full p-5 h-32 rounded-lg text-center'>
            <h1 className='mb-10 text-5xl text-gray-700 my-2 uppercase'>login</h1>
            <hr />
          </div>
          <form action='post'>
            <div className='m-5 pt-12 p-5 h-44'>
              <label htmlFor='email'>
                <h5>Email :</h5>
                <input type='email' name='email' className='p-5 w-full rounded-md' placeholder='Enter your Email !' required />
              </label>
            </div>
            <div className='m-5 p-5  h-44'>
              <label htmlFor='password'>
                <h5>Password :</h5>
                <input type='password' name='password' className='p-5 w-full rounded-md' placeholder='Enter your Password !' required />
              </label>
            </div>
            <input type='submit' value='LOGIN' className='px-10 rounded-sm cursor-pointer text-white text-xl bg-blue-700 py-3 ml-5 hover:opacity-80' />
          </form>
        </div>
      </div>
    </div>
  );
}
