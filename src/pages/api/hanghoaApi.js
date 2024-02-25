import axiosClient_not_token from "./axiosClient_not_token";

const hanghoaApi = {
  list: (params) => {
    const url = "/hanghoa/list";
    return axiosClient_not_token.post(url, params);
  },
  listchitietsp: (params) => {
    const url = "/hanghoa/listchitietsp";
    return axiosClient_not_token.post(url, params);
  },
  list_toanbo_hanghoa_theonhom: (params) => {
    const url = "/hanghoa/list_toanbo_hanghoa_theonhom";
    return axiosClient_not_token.post(url, params);
  },
  list_sanphamcungnhom: (params) => {
    const url = "/hanghoa/list_sanphamcungnhom";
    return axiosClient_not_token.post(url, params);
  },
  list_motasp: (params) => {
    const url = "/hanghoa/listmotasp";
    return axiosClient_not_token.post(url, params);
  },
  list_theonhom: (params) => {
    const url = "/hanghoa/listtheonhom";
    return axiosClient_not_token.post(url, params);
  },
  list_search: (params) => {
    const url = "/hanghoa/list_search";
    return axiosClient_not_token.post(url, params);
  },
  list_filter: (params) => {
    const url = "/hanghoa/list_filter";
    return axiosClient_not_token.post(url, params);
  },
  list_hot_items: (params) => {
    const url = "/hanghoa/list_hot_items";
    return axiosClient_not_token.post(url, params);
  },
  post_luotxem: (params) => {
    const url = "/hanghoa/post_luotxem";
    return axiosClient_not_token.post(url, params);
  },
  get_tim: (params) => {
    const url = "/hanghoa/get_tim";
    return axiosClient_not_token.post(url, params);
  },
  update_tim: (params) => {
    const url = "/hanghoa/update_tim";
    return axiosClient_not_token.post(url, params);
  },
  list_all_hanghoa: (params) => {
    const url = "/hanghoa/list_all_hanghoa";
    return axiosClient_not_token.post(url, params);
  },
  list_hanghoa_noibat: (params) => {
    const url = "/hanghoa/list_hanghoa_noibat";
    return axiosClient_not_token.post(url, params);
  },
  load_hosogiaban: (params) => {
    const url = "/hanghoa/load_hosogiaban";
    return axiosClient_not_token.post(url, params);
  },
  load_giaban_chitu: (params) => {
    const url = "/hanghoa/load_giaban_chitu";
    return axiosClient_not_token.post(url, params);
  },
};

export default hanghoaApi;
