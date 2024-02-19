import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../Service/UserService";
import "../../Style/LoginCred/Register.css";

export default function RegisterImage() {
  const [imageFile, setImageFile] = useState(null);
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phonenumber: "",
    gender: "",
    preferences: "",
    allergies: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/userdashboard");
    }
  }, []);

  const validateForm = () => {
    const errors = {};

    if (!formDetails.firstname.trim()) {
      errors.firstname = "First name is required";
    }
    if (!formDetails.lastname.trim()) {
      errors.lastname = "Last name is required";
    }
    if (!formDetails.username.trim()) {
      errors.username = "Username is required";
    }
    if (!formDetails.password.trim()) {
      errors.password = "Password is required";
    } else if (formDetails.password !== formDetails.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formDetails.confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm password";
    }
    if (!formDetails.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formDetails.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formDetails.phonenumber.trim()) {
      errors.phonenumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formDetails.phonenumber)) {
      errors.phonenumber = "Phone number should be at least 10 digits";
    }
    if (!formDetails.gender.trim()) {
      errors.gender = "Gender is required";
    }

    if (!formDetails.dateOfBirth.trim()) {
      errors.dateOfBirth = "Date of Birth is required";
    }

    if (!imageFile) {
      errors.image = "Image is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const formData = new FormData();

      Object.keys(formDetails).forEach((key) => {
        formData.append(key, formDetails[key]);
      });

      formData.append("image", imageFile);

      UserService.addUser(formData)
        .then(() => {
          setFormDetails({
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            phonenumber: "",
            gender: "",
            preferences: "",
            allergies: "",
            dateOfBirth: "",
          });
          setImageFile(null);
          navigate("/login");
        })
        .catch((err) => {
          console.log("Error occurred", err);
        });
    }
  };

  return (
    <div className="register-container">
      <form
        onSubmit={handleSubmit}
        className="register-form"
        encType="multipart/form-data"
      >
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            className={`form-control ${errors.firstname && "is-invalid"}`}
            value={formDetails.firstname}
            onChange={(e) =>
              setFormDetails({ ...formDetails, firstname: e.target.value })
            }
            required
          />
          {errors.firstname && (
            <div className="invalid-feedback">{errors.firstname}</div>
          )}
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            className={`form-control ${errors.lastname && "is-invalid"}`}
            value={formDetails.lastname}
            onChange={(e) =>
              setFormDetails({ ...formDetails, lastname: e.target.value })
            }
          />
          {errors.lastname && (
            <div className="invalid-feedback">{errors.lastname}</div>
          )}
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className={`form-control ${errors.username && "is-invalid"}`}
            value={formDetails.username}
            onChange={(e) =>
              setFormDetails({ ...formDetails, username: e.target.value })
            }
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className={`form-control ${errors.password && "is-invalid"}`}
            value={formDetails.password}
            onChange={(e) =>
              setFormDetails({ ...formDetails, password: e.target.value })
            }
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword && "is-invalid"}`}
            value={formDetails.confirmPassword}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                confirmPassword: e.target.value,
              })
            }
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className={`form-control ${errors.email && "is-invalid"}`}
            value={formDetails.email}
            onChange={(e) =>
              setFormDetails({ ...formDetails, email: e.target.value })
            }
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            className={`form-control ${errors.phonenumber && "is-invalid"}`}
            value={formDetails.phonenumber}
            onChange={(e) =>
              setFormDetails({ ...formDetails, phonenumber: e.target.value })
            }
          />
          {errors.phonenumber && (
            <div className="invalid-feedback">{errors.phonenumber}</div>
          )}
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            className={`form-control ${errors.gender && "is-invalid"}`}
            value={formDetails.gender}
            onChange={(e) =>
              setFormDetails({ ...formDetails, gender: e.target.value })
            }
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <div className="invalid-feedback">{errors.gender}</div>
          )}
        </div>

        <div className="form-group">
          <label>Preferences:</label>
          <textarea
            className="form-control"
            value={formDetails.preferences}
            onChange={(e) =>
              setFormDetails({ ...formDetails, preferences: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Allergies:</label>
          <textarea
            className="form-control"
            value={formDetails.allergies}
            onChange={(e) =>
              setFormDetails({ ...formDetails, allergies: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            className={`form-control ${errors.dateOfBirth && "is-invalid"}`}
            value={formDetails.dateOfBirth}
            onChange={(e) =>
              setFormDetails({ ...formDetails, dateOfBirth: e.target.value })
            }
          />
          {errors.dateOfBirth && (
            <div className="invalid-feedback">{errors.dateOfBirth}</div>
          )}
        </div>
        <div className="form-group">
          <label>Upload Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="form-control"
            accept="image/*"
            required
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
