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

  changePass(email, password) {
    const API_URL = `/api/change_password/email=${email}`;
    return axiosClient.put(API_URL, password);
  },

  getOneUser(id_kh) {
    const API_URL = `/api/get_user/id_kh=${id_kh}`;
    return axiosClient.get(API_URL);
  },
};

export default userAPI;
