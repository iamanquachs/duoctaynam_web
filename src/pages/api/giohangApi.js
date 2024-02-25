import axiosClient_not_token from "./axiosClient_not_token";

const giohangApi = {
  listgiohang: (params) => {
    const url = "/giohang/listgiohang";
    return axiosClient_not_token.post(url, params);
  },
  cart_delete_all: (params) => {
    const url = "/giohang/cart_delete_all";
    return axiosClient_not_token.post(url, params);
  },
  listthongtinnhanhang: (params) => {
    const url = "/giohang/listthongtinnhanhang";
    return axiosClient_not_token.post(url, params);
  },
  kt_thongtinnhanhang: (params) => {
    const url = "/giohang/kt_thongtinnhanhang";
    console.log(params);
    return axiosClient_not_token.post(url, params);
  },
  addThongTinNhanHang: (params) => {
    const url = "/giohang/add_thongtinnhanhang";
    return axiosClient_not_token.post(url, params);
  },
  listchitietthongtinnhanhang: (params) => {
    const url = "/giohang/chitietthongtinnhanhang";
    return axiosClient_not_token.post(url, params);
  },
  loadDMTinh: (params) => {
    const url = "/giohang/load_danhmuc_tinh";
    return axiosClient_not_token.post(url, params);
  },
  loadDMHuyen: (params) => {
    const url = "/giohang/load_danhmuc_huyen";
    return axiosClient_not_token.post(url, params);
  },
  loadDMXa: (params) => {
    const url = "/giohang/load_danhmuc_xa";
    return axiosClient_not_token.post(url, params);
  },
  listVoucher: (params) => {
    const url = "/giohang/list_voucher";
    return axiosClient_not_token.post(url, params);
  },
  load_tien_tichluy: (params) => {
    const url = "/giohang/load_tien_tichluy";
    return axiosClient_not_token.post(url, params);
  },
  load_diachi: (params) => {
    const url = "/giohang/load_diachi";
    return axiosClient_not_token.post(url, params);
  },
  deleteThongTin: (params) => {
    const url = "/giohang/delete_thongtin";
    return axiosClient_not_token.post(url, params);
  },
  editThongTin: (params) => {
    const url = "/giohang/edit_thongtin";
    return axiosClient_not_token.post(url, params);
  },
  add_hanghoa_km: (params) => {
    const url = "/giohang/add_hanghoa_km";
    return axiosClient_not_token.post(url, params);
  },
};

export default giohangApi;
