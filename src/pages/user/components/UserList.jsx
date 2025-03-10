import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions";
import { getUserDetails, getUserLoadingState } from "../selectors";

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
  }, [dispatch]);

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
    console.log(!!formData.id)
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
      dispatch(actions.createUser({
        name: formData.name,
        email: formData.email,
        address: formData.address
      }));
    }
    closeModal();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-white text-lg font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white opacity-0 translate-y-4 animate-[fadeIn_0.7s_ease-out_forwards]">
            User Management
          </h1>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full flex items-center gap-2 shadow-lg transition-all duration-300 hover:shadow-indigo-500/30 transform hover:scale-105 active:scale-95 opacity-0 animate-[fadeIn_0.7s_ease-out_0.3s_forwards]"
            onClick={() => openModal()}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            New User
          </button>
        </div>

        {/* User List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 animate-[fadeIn_0.5s_ease-out_0.2s_forwards]">
          {users?.map((user, index) => (
            <div
              key={user.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-700 relative group transform transition-all duration-300 hover:-translate-y-1 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${index * 150 + 300}ms` }}
            >
              <div className="px-6 py-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {user.name}
                    </h3>
                    <p className="text-indigo-400">{user.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-300 transform hover:scale-110 active:scale-90"
                      onClick={() => openModal(user, false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button
                      className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors duration-300 transform hover:scale-110 active:scale-90"
                      onClick={() => openModal(user, true)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Street</p>
                      <p className="text-gray-200">{user.address.street}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">City</p>
                      <p className="text-gray-200">{user.address.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4 animate-[fadeIn_0.2s_ease-out_forwards]">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeModal}
            />

            <div
              className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md relative z-10 transform scale-95 opacity-0 animate-[scaleIn_0.3s_ease-out_forwards]"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {!(!isEditMode && formData.id) ? isEditMode ? "Edit User Detail" : "Create New User" : "View User Details"}
                </h2>

                <form action={handleSave} className="space-y-4">
                  <div className="opacity-0 translate-y-2 animate-[slideUp_0.3s_ease-out_0.1s_forwards]">
                    <label className="block text-gray-400 text-sm font-medium mb-1">Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                      disabled={!isEditMode && formData.id}

                    />
                  </div>

                  <div className="opacity-0 translate-y-2 animate-[slideUp_0.3s_ease-out_0.2s_forwards]">
                    <label className="block text-gray-400 text-sm font-medium mb-1">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                      disabled={!isEditMode && formData.id}

                    />
                  </div>

                  <div className="opacity-0 translate-y-2 animate-[slideUp_0.3s_ease-out_0.3s_forwards]">
                    <label className="block text-gray-400 text-sm font-medium mb-1">Street</label>
                    <input
                      required
                      type="text"
                      name="street"
                      value={formData.address.street}
                      onChange={handleAddressChange}
                      placeholder="Enter street address"
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                      disabled={!isEditMode && formData.id}
                    />
                  </div>

                  <div className="opacity-0 translate-y-2 animate-[slideUp_0.3s_ease-out_0.4s_forwards]">
                    <label className="block text-gray-400 text-sm font-medium mb-1">City</label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.address.city}
                      onChange={handleAddressChange}
                      placeholder="Enter city"
                      className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                      disabled={!isEditMode && formData.id}
                    />
                  </div>

                  {!(!isEditMode && formData.id) && <div className="flex justify-end gap-3 mt-8 opacity-0 animate-[fadeIn_0.3s_ease-out_0.5s_forwards]">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium rounded-lg transition-colors duration-200 transform hover:scale-105 active:scale-95"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-lg shadow-indigo-500/20 transition-all duration-200 transform hover:scale-105 active:scale-95"
                    >
                      {isEditMode ? "Update" : "Create"}
                    </button>
                  </div>}

                </form>



              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add keyframe animations to your style section */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div >
  );
};

export default UserList;