import React from 'react';
/* eslint-disable */
import { useStateContext } from '../contexts/ContextProvider';

const LoginModal = ({ onClose }) => {
  const { currentColor} = useStateContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
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
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  required
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
