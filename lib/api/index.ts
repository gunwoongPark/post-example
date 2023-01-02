import axios, { AxiosRequestConfig } from "axios";
import config from "../config";

export const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
});

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
