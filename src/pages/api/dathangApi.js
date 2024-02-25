import axiosClient_not_token from "./axiosClient_not_token";

const dathangApi = {
  dathangline_add: (params) => {
    console.log(params);
    const url = "/dathang/dathangline_add";
    return axiosClient_not_token.post(url, params);
  },
  dathangline_delete: (params) => {
    const url = "/dathang/dathangline_delete";
    return axiosClient_not_token.post(url, params);
  },
  list_kt_mshh_dathangline: (params) => {
    const url = "/dathang/list_kt_mshh_dathangline";
    return axiosClient_not_token.post(url, params);
  },
  update_dathangline: (params) => {
    const url = "/dathang/update_dathangline";
    return axiosClient_not_token.post(url, params);
  },
  listdathanghead: (params) => {
    const url = "/dathang/listdathanghead";
    return axiosClient_not_token.post(url, params);
  },
  listdathangline: (params) => {
    const url = "/dathang/listdathangline";
    return axiosClient_not_token.post(url, params);
  },
  listChitietThuChiHistory: (params) => {
    const url = "/dathang/list_chitiet_thuchi_history";
    return axiosClient_not_token.post(url, params);
  },
  load_qr_thanhtoan: (params) => {
    const url = "/dathang/load_qr_thanhtoan";
    return axiosClient_not_token.post(url, params);
  },
  load_sct_thuchi: (params) => {
    const url = "/dathang/load_sct_thuchi";
    return axiosClient_not_token.post(url, params);
  },
  update_trangthaithanhtoan: (params) => {
    const url = "/dathang/update_trangthaithanhtoan";
    return axiosClient_not_token.post(url, params);
  },
  get_chuathanhtoan: (params) => {
    const url = "/dathang/get_chuathanhtoan";
    return axiosClient_not_token.post(url, params);
  },
  get_chitiet_tichluy: (params) => {
    const url = "/dathang/get_chitiet_tichluy";
    return axiosClient_not_token.post(url, params);
  },
};

export default dathangApi;
