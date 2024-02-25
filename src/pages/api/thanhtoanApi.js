import axiosClient_not_token from "./axiosClient_not_token";

const thanhtoanApi = {
  update_line_1: (params) => {
    const url = "/thanhtoan/update_line_1";
    return axiosClient_not_token.post(url, params);
  },
  dathangheader_add: (params) => {
    const url = "/thanhtoan/dathangheader_add";
    return axiosClient_not_token.post(url, params);
  },
  get_thanhtien: (params) => {
    const url = "/thanhtoan/get_thanhtien";
    return axiosClient_not_token.post(url, params);
  },
};

export default thanhtoanApi;
