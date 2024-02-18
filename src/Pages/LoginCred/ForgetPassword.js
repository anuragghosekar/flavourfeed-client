import React, { useState } from 'react';
import UserService from '../../Service/UserService';
import '../../Style/LoginCred/ForgotPassword.css';

export default function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [newPassword, setPassword] = useState('');
  const [confirmnewPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

  try {
    if (newPassword !== confirmnewPassword) {
      setError('Passwords do not match');
      return;
      }
    const response = await UserService.updateUserPassword(username,newPassword);
    if (response.status === 200) {
      console.log('Password updated successfully');
      } else {
        setError('Invalid Username');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setError('An error occurred while updating password');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={confirmnewPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit" className="btn">Reset Password</button>
      </form>
    </div>
  );
}