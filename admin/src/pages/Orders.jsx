import React, { useEffect, useState } from 'react';
/* eslint-disable */
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://server-nu-cyan.vercel.app/orders', {
          headers: {
            Authorization: `Bearer Hatoum1234`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }
    try {
      await axios.delete(`https://server-nu-cyan.vercel.app/orders/${id}`, {
        headers: {
          Authorization: `Bearer Hatoum1234`,
        },
      });
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>
      <div className="grid grid-cols-1 gap-6">
        {orders.map((order, index) => (
          <div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order #{index + 1}</h2>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700">Client Info</h3>
              <p className="text-gray-600">Name: {order.fullname}</p>
              <p className="text-gray-600">Phone: {order.phone}</p>
              <p className="text-gray-600">Address: {order.adress}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-700">Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.products.map(product => (
                  <div key={product._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <img src={product.image} alt={product.name} width={80} />
                    <p className="text-gray-800 font-medium">{product.name}</p>
                    <p className="text-gray-600">Price: ${product.price}</p>
                    <p className="text-gray-600">Size: {product.size}</p>
                    <p className="text-gray-600">Quantity: {product.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-700">Date: {new Date(order.date).toLocaleDateString()}</p>
              <p className="text-xl font-semibold text-gray-800">Total: ${order.total}</p>
            </div>
            <br />
            <div className="">
            <button 
            onClick={() => deleteOrder(order.orderId)}
            className=" px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150">delete
            </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
