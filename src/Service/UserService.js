import axios from "axios";

const baseUrl = "https://flavourfeed-server-production.up.railway.app/";

axios.defaults.headers.post["Content-Type"] = "application/json";

class UserService {
  getAllUsers() {
    return axios.get(baseUrl + "users");
  }

  getUserById(userId) {
    return axios.get(baseUrl + "user/" + userId);
  }

  // addUser(user) {
  //     return axios.post(baseUrl + "user", user);
  // }

  addUser(formData) {
    return axios.post(baseUrl + "user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateAdmin(user, userId) {
    console.log(userId);
    return axios.put(baseUrl + "admin/" + userId, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateUser(user, userId) {
    console.log(userId);
    return axios.put(baseUrl + "user/" + userId, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  deleteUser(userId) {
    return axios.delete(baseUrl + "user/" + userId);
  }

  updateUserPassword(username, newPassword) {
    const requestBody = {
      username: username,
      password: newPassword,
    };
    return axios.put(
      baseUrl + "user/" + username + "/updatepassword",
      requestBody
    );
  }

  login(user) {
    return axios.post(baseUrl + "login", user);
  }

  logout() {
    return axios.get(baseUrl + "logout");
  }

  getUserRecipes(userId) {
    return axios.get(baseUrl + "user/" + userId + "/recipes");
  }

  getUserFeedbacks(userId) {
    return axios.get(baseUrl + "user/" + userId + "/feedbacks");
  }

  getUserComments(userId) {
    return axios.get(baseUrl + "user/" + userId + "/comments");
  }

  getUserAllergies(userId) {
    return axios.get(baseUrl + "user/" + userId + "/allergies");
  }

  getUserPreferences(userId) {
    return axios.get(baseUrl + "user/" + userId + "/preferences");
  }
}

export default new UserService();
