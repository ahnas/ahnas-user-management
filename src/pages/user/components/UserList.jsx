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
  console.log(users)

  useEffect(() => {
    dispatch(actions.fetchUsers());
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">User List</h1>
      <ul className="space-y-4">
        {users?.map((user) => (
          <li key={user.id} className="p-4 border border-gray-300 rounded-lg bg-gray-100 hover:shadow-md transition">
            <Link to={`/users/${user.id}`} className="block text-lg font-semibold text-black hover:underline">
              {user.name} <span className="text-green-600 text-sm">({user.email})</span> 
              <div className='float-right text-blue-600 text-sm'>Edit</div>
            </Link>
            <p className="text-gray-700 mt-1">
              <span className="font-medium">Street:</span> {user.address.street}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">City:</span> {user.address.city}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
