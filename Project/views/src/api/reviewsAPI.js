import axiosClient from "./axiosClient";

const reviewAPI = {
  createreview(data) {
    const API_URL = "/api/manage/review/add";
    return axiosClient.post(API_URL, data);
  },

  getListReview() {
    const API_URL = "/api/manage/review/list";
    return axiosClient.get(API_URL);
  },

  getReview(idhdx) {
    const API_URL = `/api/manage/review/idhdx=${idhdx}`;
    return axiosClient.get(API_URL);
  },

  getReviewProduct(idsp) {
    const API_URL = `/api/manage/review/idsp=${idsp}`;
    return axiosClient.get(API_URL);
  }
};

export default reviewAPI;
