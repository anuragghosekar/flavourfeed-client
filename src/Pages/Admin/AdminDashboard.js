import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../Style/Admin/AdminDashboard.css";
import UserService from "../../Service/UserService";

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isadmin, setisadmin] = useState(true);
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setLoggedIn(false);
          return;
        }

        const userResponse = await UserService.getUserById(userId);
        const userData = userResponse.data;
        setAdmin(userResponse.data);
        if (userData.role === "user") {
          setisadmin(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!loggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  if (!isadmin) {
    // Redirect to login if not logged in
    return <Navigate to="/userdashboard" replace />;
  }

  return (
    <>
      
      <div className="admin-dashboard">
      <h1 className="h1">Welcome, {`${admin.firstname} ${admin.lastname}`}</h1>
      <br></br>
      <br></br>
        <h2>Admin Dashboard</h2>
        <div className="button-container">
          <Link to="/adminGetAllUsers">
            <button className="dashboard-button">Get All Users</button>
          </Link>
          <Link to="/adminGetAllRecipes">
            <button className="dashboard-button">Get All Recipes</button>
          </Link>
          <Link to="/adminGetAllFeedbacks">
            <button className="dashboard-button">Get All Feedbacks</button>
          </Link>
          <Link to="/adminProfile">
            <button className="profile-button">View Profile</button>
          </Link>
          <Link to="/editAdminProfile">
            <button className="profile-button">Edit Profile</button>
          </Link>
        </div>
      </div>
    </>
  );
}
