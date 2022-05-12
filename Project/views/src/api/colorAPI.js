import axiosClient from "./axiosClient";

const colorAPI = {
  createColor(data) {
    const API_URL = "/api/color/add";
    return axiosClient.post(API_URL, data);
  },
  getColor(id) {
    const API_URL = `/api/color/id=${id}`;
    return axiosClient.get(API_URL);
  },

  getOneColor(idms) {
    const API_URL = `/api/color/idms=${idms}`;
    return axiosClient.get(API_URL);
  },

  getListColor() {
    const API_URL = "/api/color/list";
    return axiosClient.get(API_URL);
  },
};

export default colorAPI;
