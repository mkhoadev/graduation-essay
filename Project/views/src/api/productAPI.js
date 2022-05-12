import axiosClient from "./axiosClient";

const productAPI = {
  createProduct(data) {
    const API_URL = "/api/manage/product/add";
    return axiosClient.post(API_URL, data);
  },

  getProduct(id) {
    const API_URL = `/api/manage/product/id=${id}`;
    return axiosClient.get(API_URL);
  },

  getListProducts() {
    const API_URL = "/api/manage/product/list";
    return axiosClient.get(API_URL);
  },

  getProductList() {
    const API_URL = "/api/manage/product/product_list";
    return axiosClient.get(API_URL);
  },

  getId() {
    const API_URL = "/api/manage/product/id";
    return axiosClient.get(API_URL);
  },

  updateProduct(idnv, data) {
    const API_URL = `/api/manage/product/update/${idnv}`;
    return axiosClient.put(API_URL, data);
  },

  deleteProduct(id) {
    const API_URL = `/api/manage/product/delete/id=${id}`;
    return axiosClient.delete(API_URL);
  },
};

export default productAPI;
