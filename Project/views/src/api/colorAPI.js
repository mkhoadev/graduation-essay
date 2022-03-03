import axiosClient from "./axiosClient";

const colorAPI = {
  createColor(data) {
    const API_URL = "/api/manage/color/add";
    return axiosClient.post(API_URL, data);
  },
  getColor(id) {
    const API_URL = `/api/manage/color/id=${id}`;
    return axiosClient.get(API_URL);
  },

  getList() {
    const API_URL = "/api/manage/color/list";
    return axiosClient.get(API_URL);
  },
};

export default colorAPI;
