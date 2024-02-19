import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
// import logo from '../../public/Images/Logo.png'
import "../../Style/User/LogNavbar.css";
import UserService from "../../Service/UserService";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function LogNavbar() {
  const [user, setUser] = useState(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isadmin, setisadmin] = useState(true);

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
        if (userData.role === "admin") {
          setisadmin(true);
        }
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
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

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  const confirmLogout = () => {
    UserService.logout()
      .then((response) => {
        localStorage.removeItem("userId");
        console.log("User Logged Out successfully:", response.data);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };
  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <>
      {showLogoutConfirmation && (
        <div className="confirmation-popup">
          <p>
            Are you sure you want to Logout your account? This action cannot be
            undone.
          </p>
          <button onClick={confirmLogout}>Yes</button>
          <button onClick={cancelLogout}>No</button>
        </div>
      )}
      <div className="main-div">
        <Navbar collapseOnSelect expand="lg">
          <Container>
            <div>
              <Navbar.Brand href="home">
                <img
                  src="\Images\logo2.png"
                  width="150px"
                  height="100px"
                  className="nav__logo"
                  alt="Brand logo"
                />
              </Navbar.Brand>
            </div>
            <div className="links">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/adminDashboard">Home</Nav.Link>
                  <Nav.Link href="/adminGetAllRecipes">All Recipes</Nav.Link>
                  <Nav.Link href="/adminGetAllFeedbacks">All Feedback</Nav.Link>
                  <Nav.Link href="/adminProfile">My Profile</Nav.Link>
                  <Nav.Link href="/adminGetAllUsers">All Users</Nav.Link>
                  <Nav.Link href="/adminGetAllFeedbacks">Feedback</Nav.Link>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Container>
        </Navbar>
      </div>
    </>
  );
}
