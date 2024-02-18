import React, { useEffect, useState } from 'react';
import { useParams, Link,Navigate } from 'react-router-dom';
import UserService from '../../Service/UserService';

export default function AdminViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isadmin, setisadmin] = useState(true);
 

  // useEffect(() => {
    
  //     const userId = localStorage.getItem('userId');
  //     if (!userId) {
  //       setLoggedIn(false);
  //     } else {
  //       const fetchUserDetails = async () => {
  //     try {
  //       const userResponse = await UserService.getUserById(id);
  //       const userData = userResponse.data;
  //       setUser(userData);
  //     } catch (error) {
  //       console.error('Error fetching User details:', error);
  //     }
  //   };
  //   fetchUserDetails();
  // }}, [id]);

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
        if (userData.role === "user") {
          setisadmin(false);
          return;
        }

        const userDetailResponse = await UserService.getUserById(id);
        setUser(userDetailResponse.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!loggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  if (!isadmin) {
    // Redirect to login if not logged in
    return <Navigate to="/adminDashboard" replace />;
  }

  return (
    <div className="container">
      {user ? (
        
        <div className="card">
          <div className="card-body">
            
            <h6 className="card-subtitle mb-2 text-muted">ID: {user.userId}</h6>
            <p><strong>Name:</strong> {user.firstname+" "+user.lastname}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phonenumber}</p>
            <p><strong>Username:</strong> {user.email}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Allergies:</strong> {user.allergies}</p>
            <p><strong>Preferences:</strong> {user.preferences}</p>
            <p><strong>Date Of Birth:</strong> {user.dateOfBirth}</p>
            {user.images && (
              <img src={`data:image/jpeg;base64,${user.images}`} alt={user.username} />
            )}
          </div>
          <Link to="/adminDashboard" className="btn btn-primary">Back</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )
      }
    </div>
  );
}