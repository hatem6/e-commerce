import React, { useState } from 'react';
/* eslint-disable */
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productGenre, setProductGenre] = useState("t-shirt");
  const [productType, setProductType] = useState("women");
  const [productImage, setProductImage] = useState(null);
  
  const [isAddingProduct, setIsAddingProduct] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [errorMessage, setErrorMessage] = useState("");
  const [isFileSelected, setIsFileSelected] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFileChange = (e) => {
    setProductImage(e.target.files[0]);
    setIsFileSelected(true);

  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsAddingProduct(true);
    
    if (!isFileSelected) {
      setErrorMessage("Please select an image file.");
      setTimeout(() => {
        setErrorMessage(""); // Clear the success message after 20 seconds
      }, 4000);
      setIsAddingProduct(false);
      return;
    }
   
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("genre", productGenre);
    formData.append("type", productType);
    formData.append("file", productImage);

    try {
      const response = await axios.post(
        "https://server-nu-cyan.vercel.app/upload", // Replace with your API endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer Hatoum1234`, // Add your authentication token if needed
          },
        }
      );
      console.log(response.data);
      setIsAddingProduct(false);
      setSuccessMessage("Product added successfully!"); // Set success message
      closeModal(); // Close the modal after successful form submission
      setTimeout(() => {
        setSuccessMessage(""); // Clear the success message after 20 seconds
      }, 4000);
      setProductName("");
      setProductPrice("");
      setIsFileSelected(false);
    } catch (error) {
      console.error("Error uploading product:", error);
      setIsAddingProduct(false);
      
    }
  };
 
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="">
    <main className="flex flex-col items-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5 mt-20 md:mt-12">
        <button
            onClick={openModal}
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
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <form
             onSubmit={handleFormSubmit} 
              
              className="space-y-5"
            >
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
                  <select className="w-full mt-2 px-4 md:px-8 py-3 text-gray-900 bg-transparent border-2 border-indigo-600 shadow-sm rounded-lg"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}>
                    <option value="t-shirt" className="text-gray-900">
                      T-shirt
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
                  <select className="w-full mt-2 px-8 md:px-12 py-3 text-gray-900 bg-transparent outline-none border-2 border-indigo-600 shadow-sm rounded-lg"
                  value={productGenre}
                  onChange={(e) => setProductGenre(e.target.value)}>
                    <option value="women" className="text-gray-900">
                      Woman
                    </option>
                    <option value="men" className="text-gray-900">
                      Man
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="file-upload"
                  className="w-full mt-2 px-4 py-6 text-gray-900 bg-transparent border-2 border-indigo-600 shadow-sm rounded-lg cursor-pointer flex justify-center items-center"
                >
                  {isFileSelected ? "Product Selected" : "Select Your Product"}
                </label>
                <input id="file-upload" type="file"  className="hidden"  onChange={handleFileChange} />
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
                 {isAddingProduct ? "Adding Product..." : "+ Add"}
              </button>
            </form>
          </div>
        </div>
      )}
    
    </main>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="" title="All Products" />
    <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
      </div>
    </div>
  );
};

export default Products;
