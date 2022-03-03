import axiosClient from "./axiosClient";

const importInvoiceAPI = {
  createImportInvoiceAPI(data) {
    const API_URL = "/api/manage/importInvoice/add";
    return axiosClient.post(API_URL, data);
  },
  getListImportInvoiceAPI() {
    const API_URL = "/api/manage/importInvoice/list";
    return axiosClient.get(API_URL);
  },
  getId() {
    const API_URL = "/api/manage/importInvoice/id";
    return axiosClient.get(API_URL);
  },
  deleteImportInvoice(id) {
    const API_URL = `/api/manage/importInvoice/delete/id=${id}`;
    return axiosClient.delete(API_URL);
  },
};

export default importInvoiceAPI;
