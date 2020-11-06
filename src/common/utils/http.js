import axios from "axios";
import config from "../../../config";
import app from "../../main";

const instance = axios.create({
  baseURL: config.serverBaseUrl,
  withCredentials: true
});

function create(axiosInstance) {
  // eslint-disable-next-line no-unused-vars
  const requestInterceptor = axiosInstance.interceptors.request.use(
    function(config) {
      app.isLoading = true;
      return config;
    },
    function(error) {
      app.isLoading = false;
      return Promise.reject(error);
    }
  );

  // eslint-disable-next-line no-unused-vars
  const responseInterceptor = axiosInstance.interceptors.response.use(
    function(response) {
      if (response.request.responseURL.indexOf("/api/auth/sign-up") > -1) {
        console.log('');
      } else if (
        response.request.responseURL.indexOf("/api/auth/logout") > -1
      ) {
        app.removeCookie("access_token");
        delete axiosInstance.defaults.headers.common["Authorization"];
      } else {
        axiosInstance.defaults.headers.common["Authorization"] =
          response.headers.authorization;
        app.setCookie(response.headers.authorization);
        app.isLoggedIn = true;
      }

      app.isLoading = false;
      return response;
    },
    function(error) {
      app.isLoading = false;
      if (error.response.status === 403) {
        app.removeCookie("access_token");
        delete axiosInstance.defaults.headers.common["Authorization"];
      }
      return Promise.reject(error);
    }
  );
}

create(instance);

export default instance;
