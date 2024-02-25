import axios from "axios";
import { parse, stringify } from "qs";

const axiosClient_not_token = axios.create({
  baseURL: "https://api.duoctaynam.vn/",
  // baseURL: "http://localhost/2023/TPSPharma/TPS_nextjs/Backend",
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});

axiosClient_not_token.interceptors.request.use(async (config) => {
  return config;
});

axiosClient_not_token.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
export default axiosClient_not_token;
