import axiosClient from "./axiosClient";

const employeeAPI = {
  register(data) {
    const API_URL = "/api/auth/manage/signup";
    return axiosClient.post(API_URL, data);
  },

  login(data) {
    const API_URL = "/api/auth/manage/signin";
    return axiosClient.post(API_URL, data);
  },

  checkEmployee(email) {
    const API_URL = `/api/manage/checkEmployee/email=${email}`;
    return axiosClient.get(API_URL);
  },
};

export default employeeAPI;
