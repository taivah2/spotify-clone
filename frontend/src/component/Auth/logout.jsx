import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import './logout.css';

const LogOut = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Xóa thông tin trong localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('isAdmin');

        // Callback để cập nhật giao diện nếu được truyền vào
        if (onLogout) onLogout();

        // Điều hướng về trang chủ
        navigate('/');
      } else {
        console.error('Failed to sign out');
      }
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <button onClick={handleLogOut} className="logout-btn">
      <FiLogOut />
    </button>
  );
};

export default LogOut;