import axiosClient from "./axiosClient";

const userAPI = {
  login(data) {
    const API_URL = "/api/auth/signin";
    return axiosClient.post(API_URL, data);
  },

  register(data) {
    const API_URL = "/api/auth/signup";
    return axiosClient.post(API_URL, data);
  },
                              
  checkUser(email) {
    const API_URL = `/api/checkuser/email=${email}`;
    return axiosClient.get(API_URL);
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
};

export default userAPI;
