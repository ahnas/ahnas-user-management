import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions";
import { getUserDetails,getUserLoadingState } from "../selectors";

const UserList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getUserLoadingState);
  const users = useSelector(getUserDetails);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: { street: "", city: "" },
  });

  useEffect(() => {
    dispatch(actions.fetchUsers());
  }, []);

  if (isLoading) return <div>Loading...</div>;

  const openModal = (user = null, editMode = false) => {
    setIsEditMode(editMode);
    setIsModalOpen(true);
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        name: "",
        email: "",
        address: { street: "", city: "" },
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setFormData({
      ...formData,
      address: { ...formData.address, [e.target.name]: e.target.value },
    });
  };

  const handleSave = () => {
    if (isEditMode) {
      dispatch(actions.updateUser(formData));
    } else {
      dispatch(actions.createUser({ name: formData.name, email: formData.email, address: formData.address }));
    }
    closeModal();
  };

  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
        User List
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-md text-sm"
          onClick={() => openModal()}
        >
          Create User
        </button>
      </h2>
      <ul className="space-y-4">
        {users?.map((user) => (
          <li
            key={user.id}
            className="p-4 border border-gray-300 rounded-lg bg-gray-100 hover:shadow-md transition"
          >
            <button
              onClick={() => openModal(user, false)}
              className="block text-lg font-semibold text-black hover:underline"
            >
              {user.name} <span className="text-green-600 text-sm">({user.email})</span>
            </button>
            <div
              className="float-right text-sky-500 text-sm flex items-center cursor-pointer"
              onClick={() => openModal(user, true)}
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
              Edit
            </div>
            <p className="text-gray-700 mt-1">
              <span className="font-medium">Street: </span> {user.address.street}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">City: </span> {user.address.city}
            </p>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              {isEditMode ? "Edit User" : "Create User"}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="street"
                value={formData.address.street}
                onChange={handleAddressChange}
                placeholder="Enter Street"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                placeholder="Enter City"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
