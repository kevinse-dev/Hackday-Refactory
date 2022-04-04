/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [allContacts, setAllContacts] = useState([]);
  const [userAccount, setUserAccount] = useState("");
  const accessToken = Cookies.get("token");
  const navigate = useNavigate();
  const user = Cookies.get("user");

  const allContact = async data => {
    await axios({
      method: "GET",
      url: `http://localhost:8000/api/v1/user/${data.id}`,
      headers: { "auth-token": accessToken },
    })
      .then(res => {
        setAllContacts(res.data.message.Contacts);
        setUserAccount(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    navigate("/login");
  };


  const handleDelete = (name) => {
    axios.post(`/api/v1/profile/${userAccount.id}/deleteContact/${name}`)
  }


  useEffect(() => {
    if (accessToken && user) {
      const data = JSON.parse(user);
      // console.log(user);
      allContact(data);
    } else {
      navigate("/login");
    }
  }, [accessToken, user]);




  return (
    <>
      <div className='flex'>
        <div className='w-3/12 h-[920px] p-5 bg-red-400 justify-center'>
          <div className='bg-black h-52 p-12 text-white text-center'>
            <h1>FOTO</h1>
          </div>
          <h1>Username : {userAccount.username}</h1>
          <h1>Email : {userAccount.email} </h1>

          <button onClick={handleLogout} className='mt-10 px-4 py-2 bg-gray-500 rounded-sm text-white shadow-md'>
            LOGOUT
          </button>
        </div>

        <div className='w-9/12'>
          <div className='p-10 flex  justify-around'>
            <div className='w-full mx-2'>
              <div className='h-52 p-5 rounded-md text-center bg-blue-800 text-gray-100 font-bold text-2xl'>
                <h1>Contact</h1>
                <h1 className='font-bold text-6xl mt-5'>12</h1>
              </div>
            </div>
            <div className='w-full mx-2 '>
              <div className='h-52 p-5 text-center bg-blue-500'>
                <h1>Favorite</h1>
              </div>
            </div>
            <div className='w-full '>
              <div className='h-52 p-5 text-center bg-blue-500'>
                <h1>Tambah Contact</h1>
              </div>
            </div>
          </div>

          <div className='relative overflow-x-auto mx-auto w-10/12 shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500 '>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50  00'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    NO
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Contact
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    No Telephone
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Email
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Address
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Postal Code
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Update
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {allContacts.length > 0 ? (
                  allContacts.map((user, index) => {
                    return (
                      <tr className='bg-gray-200 border-b' key={index}>
                        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                          {user.name}
                        </th>
                        <td className='px-6 py-4'>{index + 1}</td>
                        <td className='px-6 py-4'>{user.name}</td>
                        <td className='px-6 py-4'>{user.telephone}</td>
                        <td className='px-6 py-4'>{user.address}</td>
                        <td className='px-6 py-4'>{user.postal_code}</td>

                        <td className='px-6 py-4 text-right'>
                          <a href={`/dashboard/update/${user.id}`} className='px-4 py-2 p-5 bg-gray-700 rounded-md text-white'>
                            UPDATE
                          </a>
                        </td>
                        <td className='px-6 py-4 text-right'>
                          <button  onClick={() => handleDelete(user.name)} className='px-4 py-2 p-5 bg-gray-700 rounded-md text-white'>
                            DELETE
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>Contact not Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
            <button>Add Contact</button>
        </div>
      </div>
    </>
  );
}
