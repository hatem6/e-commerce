import React, { useState, useEffect } from 'react';
/* eslint-disable */
import axios from 'axios';
const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("https://server-nu-cyan.vercel.app/customers", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer Hatoum1234`,
        },
      });
      setCustomers(response.data);
      console.table(customers);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const deleteCustomer = async (email) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }
    try {
      await axios.request({
        method: 'delete',
        url: 'https://server-nu-cyan.vercel.app/customers/delete',
        data: { email: email },
        headers: {
          Authorization: `Bearer Hatoum1234`,
        },
      });
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };
  
  useEffect(() => {
    fetchCustomers();
  }, []);
  return (
    <div className="">
      <div className="mt-10">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg ml-5">
            <h3 className="dark:text-gray-200 text-xl font-bold sm:text-2xl">All Customers</h3>
            <p className="dark:text-gray-300 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
          
        </div>
        <div className="">
          <form
            onSubmit={(e) => e.preventDefault()} 
            className="max-w-md px-4 mx-auto mt-12">
           
        </form>
          </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">image</th>
                <th className="py-3 px-6">id</th>
                <th className="py-3 px-6">fullname</th>
                <th className="py-3 px-6">adress</th>
                <th className="py-3 px-6">phone</th>
                <th className="py-3 px-6">email</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 text-gray-600 divide-y">
              {customers.map((item, idx) => (
                <tr key={idx}>
                 <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                  <img 
                    src={item.image ? item.image : 'https://i.postimg.cc/ZYF8ZbDN/account2.png'} 
                    className="md:w-24 md:h-28 rounded-full" 
                    alt={item.name} 
                  />
                </td>
                  <td className="px-6 py-4 whitespace-nowrap">{idx+1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.fullname}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.adress}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                  <td className="text-right px-6 whitespace-nowrap">
                    <button
                      href="#"
                      onClick={() => deleteCustomer(item.email)}
                      className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Customers;
