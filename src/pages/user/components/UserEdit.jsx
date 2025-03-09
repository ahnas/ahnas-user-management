// src/pages/user/components/UserEdit.js
import React, { useState } from 'react';
import { useEffect } from 'react';

const UserEdit = ({ user, onSubmit }) => {
  const [email, setEmail] = useState(user.email);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {

  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);  // Submit the updated email
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserEdit;
