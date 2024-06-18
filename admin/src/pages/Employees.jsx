import React, { useState, useEffect } from 'react';
/* eslint-disable */
import axios from 'axios';
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const openModal = (employee = null) => {
    if (employee) {
      setCurrentEmployee(employee);
      setName(employee.name);
      setRole(employee.role);
      setEmail(employee.email);
      setPassword(employee.password);
      setIsEditing(true);
    } else {
      setCurrentEmployee(null);
      setName('');
      setRole('administrator');
      setEmail('');
      setImage(null);
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentEmployee(null);
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setIsFileSelected(true);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsAddingEmployee(true);
    if (!isFileSelected && !isEditing) {
      setErrorMessage("Please select an image file.");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      setIsAddingEmployee(false);
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("file", image);
    }
    try {
      if (isEditing && currentEmployee) {
        const response = await axios.put(
          `https://server-nu-cyan.vercel.app/employees/${currentEmployee.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer Hatoum1234`,
            },
          }
        );
        console.log(response.data);
        setSuccessMessage("Employee updated successfully!");
      } else {
        const response = await axios.post(
          "https://server-nu-cyan.vercel.app/employees/signup",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer Hatoum1234`,
            },
          }
        );
        console.log(response.data);
        setSuccessMessage("Employee added successfully!");
      }
      setIsAddingEmployee(false);
      closeModal();
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
      fetchEmployees();
    } catch (error) {
      console.error("Error uploading employee:", error);
      setIsAddingEmployee(false);
    }
  };
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("https://server-nu-cyan.vercel.app/employees", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer Hatoum1234`,
        },
      });
      setEmployees(response.data);
      console.table(employees);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }
    try {
      await axios.delete(`https://server-nu-cyan.vercel.app/employees/${id}`, {
        headers: {
          Authorization: `Bearer Hatoum1234`,
        },
      });
      setSuccessMessage("Employee deleted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      setErrorMessage("Failed to delete employee.");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  return (
    <div className="">
      <main className="flex flex-col items-center px-4">
        <div className="max-w-sm w-full text-gray-600 space-y-5 mt-20 md:mt-12">
          <button
            onClick={() => openModal()}
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            + Add Employee
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
                      placeholder="name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div>
                    <select
                      className="w-full mt-2 px-4 md:px-8 py-3 text-gray-900 bg-transparent border-2 border-indigo-600 shadow-sm rounded-lg"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="administrator" className="text-gray-900">
                        administrator
                      </option>
                      <option value="developer" className="text-gray-900">
                        developer
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                    <input
                      type="email"
                      required
                      className="w-full mt-2 px-4 py-3 text-gray-900 bg-transparent border-2 border-indigo-600 shadow-sm rounded-lg"
                      placeholder="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      required
                      className="w-full mt-2 px-4 py-3 text-gray-900 bg-transparent border-2 border-indigo-600 shadow-sm rounded-lg"
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                
                <div>
                  <label
                    htmlFor="file-upload"
                    className="w-full mt-2 px-4 py-6 text-gray-900 bg-transparent border-2 border-indigo-600 shadow-sm rounded-lg cursor-pointer flex justify-center items-center"
                  >
                    {isFileSelected ? "Image Selected" : "Select employee Image"}
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
                  disabled={isAddingEmployee}
                  className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                  {isAddingEmployee ? (isEditing ? "Updating Employee..." : "Adding Employee...") : (isEditing ? "Update Employee" : "+ Add")}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      <div className="mt-10">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg ml-5">
            <h3 className="dark:text-gray-200 text-xl font-bold sm:text-2xl">All Employees</h3>
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
                <th className="py-3 px-6">name</th>
                <th className="py-3 px-6">email</th>
                <th className="py-3 px-6">role</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 text-gray-600 divide-y">
              {employees.map((item, idx) => (
                <tr key={idx}>
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img src={item.image} className="md:w-24 md:h-28 rounded-full" alt={item.name} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.role}</td>
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
                      onClick={() => deleteEmployee(item.id)}
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
export default Employees;
