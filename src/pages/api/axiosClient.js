import axios from "axios";
import { parse, stringify } from "qs";

// const token =
//   "eyJ0eXAi.iJKV1QiLCJhbGci.iJIUzI1NiJ9OeyJtc2R2IjoiMjIwMjIwMTA1NDA2MzciLCJtc2RuIjoiMDkwNzY3.DIzNCIsInRlbmR2IjoiTkhcdTAwYzAgVEhVXHUxZWQwQyBBTiBUXHUwMGMyTSIsImV4cGlyZWQi.jE3MDQzMzI2MzR9Okb16o93E9eAX28s.27VZsj94vZ9L2Ts6Z6PBh8g8Rz8";

const token = localStorage.getItem("token");
const axiosClient = axios.create({
  baseURL: "https://api.duoctaynam.vn",
  // baseURL: "https://localhost/TPS_nextjs/Backend/api",
  headers: { Authorization: `bearer ` + token },
  paramsSerializer: {
    encode: parse,
    serialize: stringify,
  },
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
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
export default axiosClient;
