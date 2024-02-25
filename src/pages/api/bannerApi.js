import axiosClient_not_token from "./axiosClient_not_token";

const bannerApi = {
  load_banner: (params) => {
    const url = "/banner/load_banner";
    return axiosClient_not_token.post(url, params);
  },
};

export default bannerApi;
