import React, { useState, useEffect } from 'react';
import UserService from '../../Service/UserService';
import { Navigate, useNavigate } from 'react-router-dom';
import "../../Style/User/EditProfile.css";

export default function EditProfile() {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(true);
  const userId = localStorage.getItem('userId');
  const [isadmin, setisadmin] = useState(false);
  const Navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Step 1: State to store selected recipe

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setLoggedIn(false);
      return;
    } else {
      const fetchData = async () => {
        try {
          const userResponse = await UserService.getUserById(userId);
          const userData = userResponse.data;
          setUser(userResponse.data);
          setEditedUser(userResponse.data);
          if (userData.role === "admin") {
            setisadmin(true);
            return;
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchData();
    }
  }, []);

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isadmin) {
    return <Navigate to="/adminDashboard" replace />;
  }

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

    UserService.updateUser(formData, userId)
      .then(response => {
        console.log('Profile Updated Successfully:', response.data);
        setSuccessMessage('Profile Updated Successfully.');
        Navigate("/userProfile");
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

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  // Step 2: Render selected recipe in a card format
  const renderSelectedRecipe = () => {
    if (selectedRecipe) {
      return (
        <div className="recipe-card">
          <h3>{selectedRecipe.name}</h3>
          <p>Calories: {selectedRecipe.calories}</p>
        </div>
      );
    }
    return null;
  };

  // Step 3: Render table with recipe name and calories
  const renderRecipeTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Recipe Name</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {/* Render recipes here */}
        </tbody>
      </table>
    );
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      {renderSelectedRecipe()} {/* Render selected recipe card */}
      {renderRecipeTable()} {/* Render recipe table */}
      <form encType="multipart/form-data">
        {/* Form fields */}
        <button type="button" className="update" onClick={handleUpdateProfile}>Update Profile</button>
      </form>
      {/* Confirmation popup */}
      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Do you want to update your profile?</p>
          <button onClick={confirmUpdate}>Yes</button>
          <button onClick={cancelUpdate}>No</button>
        </div>
      )}
      {/* Success and error messages */}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}
