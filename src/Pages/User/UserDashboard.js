import React, { useState, useEffect } from 'react';
import UserService from '../../Service/UserService';
import { Link,Navigate   } from 'react-router-dom';
import UserProfile from './UserProfile';

export default function UserDashboard() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(true);
  const [isadmin, setisadmin] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setLoggedIn(false);
    }
    else {
      const fetchUserData = async () => {
        try {
          const userResponse = await UserService.getUserById(userId);
          const userData = userResponse.data;
          setUser(userResponse.data);
          if (userData.role === "admin") {
            setisadmin(true);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, []);

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isadmin) {
    return <Navigate to="/adminDashboard" replace />;
  }

  return (
    <>
      
      <h2>Welcome, {`${user.firstname} ${user.lastname}`}</h2>
      <UserProfile/>
    </>
  );
}