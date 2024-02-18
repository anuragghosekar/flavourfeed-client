import React, { useState, useEffect } from 'react';
import UserService from '../../Service/UserService';
import { Navigate   } from 'react-router-dom';

export default function EditAdminProfile() {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(true);
  const userId = localStorage.getItem('userId');
  const [isadmin, setisadmin] = useState(true);

  // useEffect(() => {
  //   const userId = localStorage.getItem('userId');
  //   if (!userId) {
  //     setLoggedIn(false);
  //   } else { 
  //   UserService.getUserById(userId)
  //     .then(response => {
  //       setUser(response.data);
  //       setEditedUser(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching user data:', error);
  //     });
  // }}, []);

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

        setUser(userData);
        setEditedUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleUpdateProfile = () => {
    setShowConfirmation(true);
  };

  const confirmUpdate = () => {
    const formData = new FormData();
    formData.append('profileImage', profileImage);
    Object.keys(editedUser).forEach((key) => {
      formData.append(key, editedUser[key]);
    });

    UserService.updateAdmin(formData,userId)
      .then(response => {
        console.log('Profile Updated Successfully:', response.data);
        setSuccessMessage('Profile Updated Successfully.');
        setShowConfirmation(false);
      })
      .catch(error => {
        console.error('Error Updating Profile:', error);
        setErrorMessage('An error occurred. Profile cannot be updated.');
        setShowConfirmation(false);
      });
  };

  const cancelUpdate = () => {
    setShowConfirmation(false);
  };

  if (!loggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  if (!isadmin) {
    // Redirect to login if not logged in
    return <Navigate to="/adminDashboard" replace />;
  }

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

        return (
          <div className="edit-profile">
            <h2>Edit Profile</h2>
            <form>
              <div className="form-group">
                <label htmlFor="firstname">First Name:</label>
                <input type="text" name="firstname" value={editedUser.firstname} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name:</label>
                <input type="text" name="lastname" value={editedUser.lastname} onChange={handleInputChange} />
              </div>
              <div className="form-group">
              <label htmlFor="profileImage">Profile Image:</label>
              <input type="file" name="profileImage" onChange={handleImageChange} />
            </div>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" value={editedUser.username} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" value={editedUser.password} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" value={editedUser.email} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input type="date" name="dateOfBirth" value={editedUser.dateOfBirth} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input type="text" name="address" value={editedUser.address} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role:</label>
                <input type="text" name="role" readOnly value={"admin"} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select name="gender" value={editedUser.gender} onChange={handleInputChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="phonenumber">Phone Number:</label>
                <input type="text" name="phonenumber" value={editedUser.phonenumber} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="preferences">Preferences:</label>
                <input type="text" name="preferences" value={editedUser.preferences} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="allergies">Allergies:</label>
                <input type="text" name="allergies" value={editedUser.allergies} onChange={handleInputChange} />
              </div>
              <button type="button" onClick={handleUpdateProfile}>Update Profile</button>
            </form>
            {showConfirmation && (
              <div className="confirmation-popup">
                <p>Do you want to update your profile?</p>
                <button onClick={confirmUpdate}>Yes</button>
                <button onClick={cancelUpdate}>No</button>
              </div>
            )}
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
    );
}