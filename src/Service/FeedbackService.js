import axios from "axios";

const baseUrl = "https://flavourfeed-server-production.up.railway.app/";

class FeedbackService {
  addfeedback(feedback, userId) {
    return axios.post(baseUrl + "feedback?userId=" + userId, feedback);
  }

  getAllFeedbacks() {
    return axios.get(baseUrl + "feedbacks");
  }

  deletefeedback(feedbackid) {
    return axios.delete(baseUrl + "feedback/" + feedbackid);
  }
}

export default new FeedbackService();
