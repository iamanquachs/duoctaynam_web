import axiosClient_not_token from "./axiosClient_not_token";

const userApi = {
  login: (params) => {
    const url = "/login";
    return axiosClient_not_token.post(url, params);
  },
  login_direct: (params) => {
    const url = "/login_direct";
    return axiosClient_not_token.post(url, params);
  },
};

export default userApi;
