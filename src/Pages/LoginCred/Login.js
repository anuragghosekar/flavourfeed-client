import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../Service/UserService';
import { useNavigate } from 'react-router-dom';
import '../../Style/LoginCred/Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    if (userId) {
      navigate("/userdashboard");
    }
  }, [navigate]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await UserService.login({ username, password });
      if (response.status === 200) {
        console.log('Login successful');
        const userData = response.data;
        localStorage.setItem('userId', userData.userId);
        navigate("/userdashboard");
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Incorrect Username or Password:', error);
      setError('An error occurred while logging in');
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter Username"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter Password"
            required
          />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      <Link to="/forgetpassword" onClick={handleForgotPassword} className="forgot-password">Forgot password?</Link>
    </div>
  );
}