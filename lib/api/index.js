import axios from "axios";
import config from "../config";

export const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!config.headers) return config;

    // localStorage는 client side에서 접근가능
    if (!(typeof window === "undefined")) {
      if (localStorage.getItem("accessToken")) {
        config.headers.Authorization = `bearer ${localStorage.getItem(
          "accessToken"
        )}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiBase = {
  get: async (url, config) => {
    const res = await axiosInstance.get(url, config);
    return res.data;
  },

  post: async (url, data, config) => {
    const res = await axiosInstance.post(url, data, config);
    return res.data;
  },

  delete: async (url, config) => {
    const res = await axiosInstance.delete(url, config);
    return res.data;
  },

  patch: async (url, data, config) => {
    const res = await axiosInstance.patch(url, data, config);
    return res.data;
  },
};

export default apiBase;
