import axiosClient_not_token from "./axiosClient_not_token";

const hangsxApi = {
  listhangsx: (params) => {
    const url = "/hangsx/listhangsx";
    return axiosClient_not_token.post(url, params);
  },
};

export default hangsxApi;
