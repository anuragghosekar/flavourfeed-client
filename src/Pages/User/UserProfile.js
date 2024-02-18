import React, { useState, useEffect } from "react";
import UserService from "../../Service/UserService";
import { Link, Navigate } from "react-router-dom";
import "../../Style/User/UserProfile.css";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isadmin, setisadmin] = useState(false);

  // useEffect(() => {
  //   const userId = localStorage.getItem('userId');
  //   if (!userId) {
  //     setLoggedIn(false);
  //   } else {
  //     const userResponse=UserService.getUserById(userId)
  //     .then(response => {
  //       setUser(response.data);
  //       setImageURL(response.data.imageBase64); // Set image URL directly from base64 data
  //     })
  //     .catch(error => {
  //       console.error('Error fetching user data:', error);
  //     });
  //  }},[]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setLoggedIn(false);
        } else {
          const response = await UserService.getUserById(userId);
          const userData = response.data;
          setUser(response.data);
          setImageURL(response.data.imageBase64);
          if (userData.role === "admin") {
            setisadmin(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isadmin) {
    return <Navigate to="/adminDashboard" replace />;
  }

  const handleDeleteAccount = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    UserService.deleteUser(user.userId)
      .then((response) => {
        localStorage.removeItem("userId");
        console.log("User deleted successfully:", response.data);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleLogout = () => {
    setShowLogoutConfirmation(true);
  };

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

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      {/* <div className="user-profile">
      <br></br>
      <h2>My Profile</h2>
      <div className="user-details">
      <p>{imageURL && <img src={`data:image/jpeg;base64,${imageURL}`} alt="User" />}<strong>Profile Photo: </strong> </p>
        <p><strong>Name:</strong> {user.firstname+" "+user.lastname}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone Number:</strong> {user.phonenumber}</p>
        <p><strong>Username:</strong> {user.email}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Allergies:</strong> {user.allergies}</p>
        <p><strong>Preferences:</strong> {user.allergies}</p>
        <p><strong>Date Of Birth:</strong> {user.dateOfBirth}</p>
      </div>
      <div className="user-actions">
        <div>
          <Link to="/editprofile">
            <button className="edit-btn">Edit Profile</button>
          </Link>
        </div>
          <div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
          <div>
          <button className="delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
          </div>
        {showLogoutConfirmation && (
        <div className="confirmation-popup">
          <p>Are you sure you want to Logout your account? This action cannot be undone.</p>
          <button onClick={confirmLogout}>Yes</button>
          <button onClick={cancelLogout}>No</button>
        </div>
      )}
      </div>
      {showDeleteConfirmation && (
        <div className="confirmation-popup">
          <p>Are you sure you want to delete your account? This action cannot be undone!</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
    </> */}

      <div class="container">
        <div class="main-body">
          <div class="row">
            <div class="col-lg-4">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    <img
                      src={`data:image/jpeg;base64,${imageURL}`}
                      alt="Admin"
                      class=""
                      width="110"
                    ></img>
                    <div class="mt-3">
                      <h5>{user.username}</h5>
                    </div>
                  </div>
                  <hr class="my-4" />
                  <div>
                    <button className="logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                  <br></br>
                  <div>
                    <button
                      className="delete-btn"
                      onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </button>
                  </div>
                  <br></br>
                  <div>
                    <Link to="/editprofile">
                      <button className="edit-btn">Edit Profile</button>
                    </Link>
                  </div>
                  <br></br>
                  <Link to="/userrecipes">
                    <button className="add-btn">My Recipes</button>
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="card">
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-sm-3">
                      <h5 class="mb-0">Firstname</h5>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input
                        type="text"
                        class="form-control"
                        value={`${user.firstname}`}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-3">
                      <h5 class="mb-0">Lastname</h5>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input
                        type="text"
                        class="form-control"
                        value={`${user.lastname}`}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-3">
                      <h5 class="mb-0">Email Id</h5>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input
                        type="text"
                        class="form-control"
                        value={`${user.email}`}
                        readonly
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-3">
                      <h5 class="mb-0">Birth Date</h5>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input
                        type="text"
                        class="form-control"
                        value={`${user.dateOfBirth}`}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-3">
                      <h5 class="mb-0">Gender</h5>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input
                        type="text"
                        class="form-control"
                        value={`${user.gender}`}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-3">
                      <h5 class="mb-0">Phone</h5>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input
                        type="text"
                        class="form-control"
                        value={`${user.phonenumber}`}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-3">
                      <h5 class="mb-0">Preferences</h5>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input
                        type="text"
                        class="form-control"
                        value={`${user.preferences}`}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-sm-3">
                      <h5 class="mb-0">Allergies</h5>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      <input
                        type="text"
                        class="form-control"
                        value={`${user.allergies}`}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {showLogoutConfirmation && (
            <div className="confirmation-popup">
              <p>
                Are you sure you want to Logout your account? This action cannot
                be undone.
              </p>
              <button onClick={confirmLogout}>Yes</button>
              <button onClick={cancelLogout}>No</button>
            </div>
          )}
        </div>
        {showDeleteConfirmation && (
          <div className="confirmation-popup">
            <h3>
              <p>
                Are you sure you want to delete your account? This action cannot
                be undone!
              </p>
            </h3>
            <button onClick={confirmDelete}>Yes</button>
            <br></br>
            <button onClick={cancelDelete}>No</button>
          </div>
        )}
      </div>
    </>
  );
}
