import axios from "axios";

const provinceAPI = {
  getListProvince() {
    return axios.get("https://provinces.open-api.vn/api/p/");
  },
  getProvince(provinceCode) {
    return axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
  },
  getDistricts(districtCode) {
    return axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
  },
  getWards(wardCode) {
    return axios.get(`https://provinces.open-api.vn/api/w/${wardCode}?depth=2`);
  },
};

export default provinceAPI;
