import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserService from '../../Service/UserService';
import "../../Style/User/UserRecipies.css";

const AdminGetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setLoggedIn(false);
          return;
        }

        const userResponse = await UserService.getUserById(userId);
        const userData = userResponse.data;
        if (userData.role !== "admin") {
          setIsAdmin(false);
          return;
        }

        const response = await UserService.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/userdashboard" replace />;
  }

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await UserService.deleteUser(userId);
        setUsers(users.filter(user => user.userId !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="container">
      <h2>All Users</h2>
      <div className="user-recipes">
        {users.map(user => (
          <div key={user.userId} className="user-recipe">
            <h3>{user.firstname} {user.lastname}</h3>
            <p>Username: {user.username}</p>
            <p>Gender: {user.gender}</p>
            <div className="user-image">
              <img 
                src={`data:image/jpeg;base64,${user.images}`} 
                alt="User" 
                style={{ width: '150px', height: '150px' }} // Set fixed width and height
              />
            </div>
            <div className="recipe-actions">
              <Link to={`/adminviewuser/${user.userId}`}>
                <button className="view" style={{ backgroundColor: 'green', color: 'white' }}>View</button>
              </Link>
              <button className="delete" onClick={() => deleteUser(user.userId)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGetAllUsers;
