import React, { useState } from 'react';
/* eslint-disable */
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';

const LoginModal = ({ onClose }) => {
  const { currentColor} = useStateContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://server-nu-cyan.vercel.app/employees/signin",{email:email,password:password}, {
        headers: {
          Authorization: `Bearer Hatoum1234`,
        },
      });
   
    if(response.data.success) {
      if(response.data.isAdmin){
        onClose();
      }
      else{
        alert('Oups ! only administrator are allowed to sign in');
      }
    }
    else{
      alert('invalid email or password');
    }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    
  };

  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 z-50">
      <div className="bg-gray-100   p-6 shadow-lg relative w-full h-full ">
        <main className="w-full flex flex-col items-center justify-center px-4">
          <div className="max-w-sm w-full text-gray-600">
            <div className="text-center">
              <img src="https://i.postimg.cc/26h8mJYV/YOLO-1.png" width={100} className="mx-auto" />
              <div className="mt-5 space-y-2">
                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Login</h3>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <button
                style={{ backgroundColor: currentColor }}
                className="w-full px-4 py-2 text-white font-medium hover:bg-opacity-90 active:bg-opacity-100 rounded-lg duration-150"
              >
                Login
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginModal;
