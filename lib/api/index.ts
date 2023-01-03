import axios, { AxiosRequestConfig } from "axios";
import config from "../config";

export const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
});

axiosInstance.interceptors.request.use(
  async (request) => {
    request.headers = request.headers ?? {};

    if (
      sessionStorage.getItem("accessToken") &&
      "Authorization" in request.headers
    ) {
      request.headers.Authorization = `Bearer ${sessionStorage.getItem(
        "accessToken"
      )}`;
    }
    return request;
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
  get: async (url: string, config?: AxiosRequestConfig<any>) => {
    const res = await axiosInstance.get(url, config);
    return res.data;
  },

  post: async (url: string, data: any, config?: AxiosRequestConfig<any>) => {
    const res = await axiosInstance.post(url, data, config);
    return res.data;
  },
};

export default apiBase;
