import React, { useState,useEffect } from 'react';
import FeedbackService from '../Service/FeedbackService';
import '../Style/Feedback.css';
import { Navigate,useNavigate   } from 'react-router-dom';
import UserService from '../Service/UserService';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isadmin, setisadmin] = useState(false);
  const navigate=useNavigate();


  // useEffect(() => {
  //   const userId = localStorage.getItem('userId');
  //   console.log(userId);
  //   if (!userId) {
  //     navigate("/login"); // Use push method of history to navigate
  //   }
  // }, [navigate]);

  useEffect(() => {
    const checkAdmin = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        navigate("/login");
        return;
      }
      try {
        const userResponse = await UserService.getUserById(userId);
        const userData = userResponse.data;
        if (userData.role === "admin") {
          setisadmin(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    checkAdmin();
  }, [navigate]);

  if (isadmin) {
    return <Navigate to="/adminDashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    try {
      await FeedbackService.addfeedback(feedback, userId);
      setFeedback('');
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };


  return (
    <div className="feedback-page">
      <h2>Feedback</h2>
      {submitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="feedback">Your Feedback</label>
            <textarea
              className="form-control"
              id="feedback"
              rows="5"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}