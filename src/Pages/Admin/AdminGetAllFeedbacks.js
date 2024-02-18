import React, { useState, useEffect } from 'react';
import { Link,Navigate } from 'react-router-dom';
import FeedbackService from '../../Service/FeedbackService';
import '../../Style/Admin/AdminGetAllFeedbacks.css';
import UserService from '../../Service/UserService';

const AdminGetAllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isadmin, setisadmin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);


  // useEffect(() => {
  //   fetchAllFeedbacks();
  // }, []);

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

        const response = await FeedbackService.getAllFeedbacks();
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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

  // const fetchAllFeedbacks = async () => {
  //   try {
  //     const response = await FeedbackService.getAllFeedbacks();
  //     setFeedbacks(response.data);
  //   } catch (error) {
  //     console.error('Error fetching feedbacks:', error);
  //   }
  // };

  const deleteFeedback = async (feedbackId) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await FeedbackService.deletefeedback(feedbackId);
        setFeedbacks(feedbacks.filter(feedback => feedback.feedbackId !== feedbackId));
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };

  return (
    <div className="container">
      <h2>All Feedbacks</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Feedback</th>
            {/* Add more fields as needed */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(feedback => (
            <tr key={feedback.feedbackId}>
              <td>{feedback.feedbackId}</td>
              <td>{feedback.user.username}</td>
              <td>{feedback.feedback}</td>
              {/* Add more fields as needed */}
              <td>
                {/* <Link to={`/admin/feedbacks/${feedback.feedbackId}`}>
                  <button className="btn btn-info">View</button>
                </Link> */}
                <button className="btn btn-danger" onClick={() => deleteFeedback(feedback.feedbackId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminGetAllFeedbacks;
