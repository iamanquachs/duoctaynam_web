import axiosClient_not_token from "./axiosClient_not_token";

const danhmucApi = {
  listdanhmuc: (params) => {
    const url = "/danhmuc/listdanhmuc";
    return axiosClient_not_token.post(url, params);
  },
  listdanhmuc_nuocsx: (params) => {
    const url = "/danhmuc/listdanhmuc_nuocsx";
    return axiosClient_not_token.post(url, params);
  },
  listdanhmuc_nhasx: (params) => {
    const url = "/danhmuc/listdanhmuc_nhasx";
    return axiosClient_not_token.post(url, params);
  },
  listdanhmucnhom: (params) => {
    const url = "/danhmuc/list_danhmuc_nhom";
    return axiosClient_not_token.post(url, params);
  },
  sodienthoai: (params) => {
    const url = "/danhmuc/sodienthoai";
    return axiosClient_not_token.post(url, params);
  },
  checkMSDN: (params) => {
    const url = "/danhmuc/checkMSDN";
    return axiosClient_not_token.post(url, params);
  },
  
};

export default danhmucApi;
