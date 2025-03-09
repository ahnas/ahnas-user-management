// src/pages/user/components/UserList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest } from '../saga'; // Assuming you have an action to fetch users
import * as actions from '../actions'
import { Link } from 'react-router-dom';
import { getUserDetails } from '../selectors'

const UserList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);
  const error = useSelector(state => state.user.error);
  const users = useSelector(getUserDetails)
  // const users = useSelector((state)=>state.user.user)

  useEffect(() => {
    dispatch(actions.fetchUsers());
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold mb-4 flex justify-between items-center">
        User List
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded text-sm" onClick={() => console.log('clicked')}>
          Create User
        </button>
      </h1>
      <ul className="space-y-4">
        {users?.map((user) => (
          <li key={user.id} className="p-4 border border-gray-300 rounded-lg bg-gray-100 hover:shadow-md transition">
            <Link to={`/users/${user.id}`} className="block text-lg font-semibold text-black hover:underline">
              {user.name} <span className="text-green-600 text-sm">({user.email})</span>
              <div className="float-right text-sky-500 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Edit
              </div>
            </Link>
            <p className="text-gray-700 mt-1">
              <span className="font-medium">Street : </span> {user.address.street}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">City : </span> {user.address.city}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
