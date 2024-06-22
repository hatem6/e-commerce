import React, { useState, useEffect } from 'react';
/* eslint-disable */
import axios from 'axios';
const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productGenre, setProductGenre] = useState('t-shirt');
  const [productType, setProductType] = useState('women');
  const [productImage, setProductImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const openModal = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setProductName(product.name);
      setProductPrice(product.price);
      setProductGenre(product.genre);
      setProductType(product.type);
      setProductDescription(product.description);
      setIsEditing(true);
    } else {
      setCurrentProduct(null);
      setProductName('');
      setProductPrice('');
      setProductType('t-shirt');
      setProductGenre('woman');
      setProductDescription('');
      setProductImage(null);
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentProduct(null);
  };
  const handleFileChange = (e) => {
    setProductImage(e.target.files[0]);
    setIsFileSelected(true);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsAddingProduct(true);
    if (!isFileSelected && !isEditing) {
      setErrorMessage("Please select an image file.");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      setIsAddingProduct(false);
      return;
    }
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("genre", productGenre);
    formData.append("type", productType);
    formData.append("description", productDescription);
    if (productImage) {
      formData.append("file", productImage);
    }
    try {
      if (isEditing && currentProduct) {
        const response = await axios.put(
          `https://server-nu-cyan.vercel.app/products/${currentProduct.productId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer Hatoum1234`,
            },
          }
        );
        console.log(response.data);
        setSuccessMessage("Product updated successfully!");
      } else {
        const response = await axios.post(
          "https://server-nu-cyan.vercel.app/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer Hatoum1234`,
            },
          }
        );
        console.log(response.data);
        setSuccessMessage("Product added successfully!");
      }
      setIsAddingProduct(false);
      closeModal();
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
      fetchProducts();
    } catch (error) {
      console.error("Error uploading product:", error);
      setIsAddingProduct(false);
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://server-nu-cyan.vercel.app/products", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer Hatoum1234`,
        },
      });
      setProducts(response.data);
      console.table(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      await axios.delete(`https://server-nu-cyan.vercel.app/products/${productId}`, {
        headers: {
          Authorization: `Bearer Hatoum1234`,
        },
      });
      setSuccessMessage("Product deleted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      setErrorMessage("Failed to delete product.");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="">
      <main className="flex flex-col items-center px-4">
        <div className="max-w-sm w-full text-gray-600 space-y-5 mt-20 md:mt-12">
          <button
            onClick={() => openModal()}
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            + Add Product
          </button>
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> {successMessage}</span>
            </div>
          )}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-100 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
                &times;
              </button>
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="flex space-x-4">
                  <div>
                    <input
                      type="text"
                      required
                      className="w-full mt-2 px-4 py-3 text-gray-900 bg-transparent border-2 border-indigo-600 shadow-sm rounded-lg"
                      placeholder="ProductName"
                      onChange={(e) => setProductName(e.target.value)}
                      value={productName}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="ProductPrice"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      className="w-full mt-2 px-4 py-3 text-gray-900 bg-transparent border-2 border-indigo-600 shadow-sm rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div>
                    <select
                      className="w-full mt-2 px-4 md:px-8 py-3 text-gray-900 bg-transparent border-2 border-indigo-600 shadow-sm rounded-lg"
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                    >
                      <option value="t-shirt" className="text-gray-900">
                        T-shirt
                      </option>
                      <option value="w-t-shirt" className="text-gray-900">
                        Woman T-shirt
                      </option>
                      <option value="jeans" className="text-gray-900">
                        Jeans
                      </option>
                      <option value="w-jeans" className="text-gray-900">
                        Woman Jeans
                      </option>
                      <option value="dresse" className="text-gray-900">
                        Dress
                      </option>
                    </select>
                  </div>
                  <div>
                    <select
                      className="w-full mt-2 px-8 md:px-12 py-3 text-gray-900 bg-transparent outline-none border-2 border-indigo-600 shadow-sm rounded-lg"
                      value={productGenre}
                      onChange={(e) => setProductGenre(e.target.value)}
                    >
                      <option value="woman" className="text-gray-900">
                        Woman
                      </option>
                      <option value="man" className="text-gray-900">
                        Man
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                    <input
                      type="text"
                      required
                      className="w-full mt-2 px-4 py-6 text-gray-900 bg-transparent border-2 border-indigo-600 shadow-sm rounded-lg"
                      placeholder="Description..."
                      onChange={(e) => setProductDescription(e.target.value)}
                      value={productDescription}
                    />
                  </div>
                <div>
                  <label
                    htmlFor="file-upload"
                    className="w-full mt-2 px-4 py-6 text-gray-900 bg-transparent border-2 border-indigo-600 shadow-sm rounded-lg cursor-pointer flex justify-center items-center"
                  >
                    {isFileSelected ? "Product Selected" : "Select Your Product"}
                  </label>
                  <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                </div>
                {errorMessage && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {errorMessage}</span>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isAddingProduct}
                  className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                  {isAddingProduct ? (isEditing ? "Updating Product..." : "Adding Product...") : (isEditing ? "Update Product" : "+ Add")}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      <div className="mt-10">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg ml-5">
            <h3 className="dark:text-gray-200 text-xl font-bold sm:text-2xl">All products</h3>
            <p className="dark:text-gray-300 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>
          <div className="flex space-x-4 md:mr-5 mt-4 md:mt-0">
          <button
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            All
          </button>
            <select className="w-full px-4 py-2 text-white bg-indigo-600  shadow-sm rounded-lg">
              <option value="" disabled selected hidden>Man</option>
              <optgroup className='bg-white text-gray-900' label="Man">
                <option value="t-shirt" className='text-gray-900'>T-shirt</option>
                <option value="jeans" className='text-gray-900'>Jeans</option>
              </optgroup>
            </select>
            <select className="w-full px-4 py-2 text-white bg-indigo-600  shadow-sm rounded-lg">
              <option value="" disabled selected hidden>Woman</option>
              <optgroup label="Woman" className='bg-white text-gray-900'>
                <option value="dress" className='text-gray-900'>dresses</option>
                <option value="t-shirt" className='text-gray-900'>T-shirts</option>
                <option value="w-jeans" className='text-gray-900'>Jeans</option>
              </optgroup>
            </select>
          </div>
        </div>
        <div className="">
          <form
            onSubmit={(e) => e.preventDefault()} 
            className="max-w-md px-4 mx-auto mt-12">
            <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search for product"
                    className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-100 focus:bg-white focus:border-indigo-600"
                />
            </div>
        </form>
          </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">product</th>
                <th className="py-3 px-6">name</th>
                <th className="py-3 px-6">price</th>
                <th className="py-3 px-6">genre</th>
                <th className="py-3 px-6">category</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 text-gray-600 divide-y">
              {products.map((item, idx) => (
                <tr key={idx}>
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img src={item.url} className="md:w-24 md:h-28 rounded-full" alt={item.name} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.genre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
                  <td className="text-right px-6 whitespace-nowrap">
                    <a
                      href="#"
                      onClick={() => openModal(item)}
                      className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Edit
                    </a>
                    <button
                      href="#"
                      onClick={() => deleteProduct(item.productId)}
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
export default Products;
