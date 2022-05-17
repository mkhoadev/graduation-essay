import axiosClient from "./axiosClient";

const filterAPI = {
  sortBy(key) {
    const API_URL = `/api/manage/filter/sortby/${key}`;
    return axiosClient.get(API_URL);
  },

  sortBrand(key) {
    const API_URL = `/api/manage/filter/sortbrand/${key}`;
    return axiosClient.get(API_URL);
  },
  sortSize(key) {
    const API_URL = `/api/manage/filter/sortSize/${key}`;
    return axiosClient.get(API_URL);
  },

  search(key) {
    const API_URL = `/api/manage/filter/search/${key}`;
    return axiosClient.get(API_URL);
  },

  rangePrice(params) {
    const API_URL = "/api/manage/filter/range_price";
    return axiosClient.get(API_URL, {params});
  },
};

export default filterAPI;
