import axiosClient from "./axiosClient";

const detailImportInvoiceAPI = {
  createdetailImportInvoiceAPI(data) {
    const API_URL = "/api/manage/detailImportInvoice/add";
    return axiosClient.post(API_URL, data);
  },
  // getListdetailImportInvoiceAPI() {
  //   const API_URL = "/api/manage/importInvoice/list";
  //   return axiosClient.get(API_URL);
  // },
  // getId() {
  //   const API_URL = "/api/manage/importInvoice/id";
  //   return axiosClient.get(API_URL);
  // },
};

export default detailImportInvoiceAPI;
