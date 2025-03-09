

import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserDetails from './UserDetails';
import UserEdit from './UserEdit';
import { getUserDetails } from '../selectors';
import * as actions from '../actions'


const UserPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUserDetails);
  const isLoading = useSelector(state => state.user.isLoading);
  const error = useSelector(state => state.user.error);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(actions.fetchUser({ userId }))
    }
  }, [dispatch, userId]);


  const handleUserEmailUpdate = (email) => {
    dispatch(actions.updateUser({ userId, email }));
    setIsEditMode(false);
  };


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const editParam = searchParams.get('edit');

  useEffect(() => {
    if (editParam === 'true') {
      setIsEditMode(true);
    }
  }, [editParam]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {isEditMode ? (
        <UserEdit user={user} onSubmit={handleUserEmailUpdate} />
      ) : (
        <UserDetails user={user} />
      )}

      <button onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? 'Cancel Edit' : 'Edit User'}
      </button>
    </div>
  );
};

export default UserPage;
