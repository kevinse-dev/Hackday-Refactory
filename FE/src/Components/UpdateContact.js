import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateContact() {
  const [allContacts, setAllContacts] = useState([]);
  const [userAccount, setUserAccount] = useState("");
  const [messageError, setMessageError] = useState("");
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  // const [form, setForm] = useState({})
  // console.log(name);
  const accessToken = Cookies.get("token");
  const navigate = useNavigate();
  const user = Cookies.get("user");
  const { id } = useParams();

  // console.log(userAccount);

  const allContact = async data => {
    setIsLoading(true)
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
      }).finally(()=>{
        setIsLoading(false)
      })

  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("id", userAccount.id, "id_contact", id);
    await axios({
      method: "POST",
      url: `http://localhost:8000/api/v1/profile/${userAccount.id}/updateContact/${id}`,
      headers: { "auth-token": accessToken },
      data: form,
    })
      .then(res => {
        if (res.data.status === 200) {
          navigate("/dashboard");
        }
        setMessageError(res.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = e => {
    const key = e.target.name;
    const value = e.target.value;
    setForm(prevState => ({ ...prevState, [key]: value }));
  };
  
    useEffect(() => {
  const userUpdate = allContacts.filter(user => user.id === parseInt(id));

      if (userUpdate.length > 0) {
        console.log("update", userUpdate);
        setForm(() => {
          return {
            name: userUpdate[0].name,
            address: userUpdate[0].address,
            telephone: userUpdate[0].telephone,
            postal_code: userUpdate[0].postal_code,
          };
        });
      }
      console.log("object");
    }, [allContacts]);

  useEffect(() => {
    if (accessToken && user) {
      const data = JSON.parse(user);
      // console.log(user);
      allContact(data);
    } else {
      navigate("/login");
    }
  }, [accessToken, user]);

  console.log(form);

  return (
    <>
      <div className='bg-green-400 w-full h-[918px]'>
        <div className='p-12'>
          <div className='mx-auto container rounded-lg bg-slate-200 shadow-xl h-[780px] p-5 w-5/12'>
            <div className='w-full p-5 h-32 rounded-lg text-center'>
              <h1 className='mb-10 text-5xl text-gray-700 my-2 uppercase'>UPDATE</h1>
              <hr />
            </div>

            { isLoading ? (
              <h1>loading...</h1>
            ) : (
              <form>
                {/* {messageError === "" ? "" : <div className='h-22 bg-red-500 text-center p-3 opacity-70 rounded-md text-white text-xl'>{messageError}</div>} */}
                <div className='  p-5 h-22'>
                  <label htmlFor='name'>
                    <h5>name :</h5>
                    <input type='text' value={form.name} onChange={e => handleChange(e)} name='name' className='p-5 w-full rounded-md' required />
                  </label>
                </div>
                <div className=' p-5 h-22'>
                  <label htmlFor='address'>
                    <h5>address :</h5>
                    <input type='text' value={form.address} onChange={e => handleChange(e)} name='address' className='p-5 w-full rounded-md' placeholder='Enter your Email !' required />
                  </label>
                </div>
                <div className='p-5 h-22'>
                  <label htmlFor='postal_code'>
                    <h5>postal code :</h5>
                    <input type='number' value={form.postal_code} onChange={e => handleChange(e)} name='postal_code' className='p-5 w-full rounded-md' placeholder='Enter your Password !' required />
                  </label>
                </div>
                <div className='p-5 h-22'>
                  <label htmlFor='telephone'>
                    <h5>No Telephone :</h5>
                    <input type='number' value={form.telephone} onChange={e => handleChange(e)} name='telephone' className='p-5 w-full rounded-md' placeholder='Enter your Password !' required />
                  </label>
                </div>
                <div className='flex justify-around'>
                  <button onClick={e => handleSubmit(e)} className='px-10 rounded-sm cursor-pointer text-white text-xl bg-green-700 py-3 hover:opacity-80'>
                    UPDATE
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
