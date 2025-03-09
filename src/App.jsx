// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './pages/user/components/UserList';
import UserPage from './pages/user/components';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} /> 
        <Route path="/users/:userId" element={<UserPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
