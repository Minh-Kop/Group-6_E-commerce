import axios from "axios";
import config from "../config/config";

const { storageKeys } = config;

const api = axios.create({
  baseURL: config.SERVER_PATH,
});

api.interceptors.request.use(async (currentConfig) => {
  const customHeaders = {};

  const accessToken = localStorage.getItem(storageKeys.ACCESS_KEY);
  if (accessToken) {
    customHeaders["x-access-token"] = accessToken;
  }

  console.log("a " + accessToken + " a");

  return {
    ...currentConfig,
    headers: {
      ...customHeaders, // Attach token
      ...currentConfig.headers, // The remain data
    },
  };
});

api.interceptors.response.use(
  (res) => {
    alert(JSON.stringify(res));
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (
      originalConfig.url !== "/auth/login" &&
      originalConfig.url !== "/auth/loginGoogle" &&
      err.response
    ) {
      if (err.response.status === 401) {
        console.log("can not authorized");
        localStorage.removeItem(config.storageKeys.ACCESS_KEY);
        window.location.assign(`/login`);
      }
    }
  }
);

export default api;
