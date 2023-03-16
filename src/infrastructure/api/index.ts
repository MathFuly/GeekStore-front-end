import axios from "axios";
import { getUserLocalStorage } from "../../context/AuthProvider/util";

export const Api = axios.create({
  baseURL: "http://localhost:3000/",
});

Api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();

    config.headers.Authorization = user?.token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
