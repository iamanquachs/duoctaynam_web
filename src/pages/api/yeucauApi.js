import axiosClient_not_token from "./axiosClient_not_token";

const yeucauApi = {
  load_yeucau: (params) => {
    const url = "/yeucau/load_yeucau";
    return axiosClient_not_token.post(url, params);
  },
  add_yeucau: (params) => {
    const url = "/yeucau/add_yeucau";
    return axiosClient_not_token.post(url, params);
  },
  delete_yeucau: (params) => {
    const url = "/yeucau/delete_yeucau";
    return axiosClient_not_token.post(url, params);
  },
};

export default yeucauApi;
