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
    config => {
      // 공연 목록 불러올 때만 로딩 => 추후 리팩토링 필요
      console.log(config.url);
      if (config.url === "/shows" || config.url.match(/shows[^/]/)) {
        console.log("loading?");
        app.isLoading = true;
      }

      const newConfig = {
        ...config,
        headers: {
          ...config.headers
        }
      };

      return newConfig;
    },
    function(error) {
      app.isLoading = false;
      return Promise.reject(error);
    }
  );

  // eslint-disable-next-line no-unused-vars
  const responseInterceptor = axiosInstance.interceptors.response.use(
    function(response) {
      console.log("response=", response);
      console.log("responseURL=", response.request.responseURL);

      if (response.request.responseURL.indexOf("/signup") > -1) {
        console.log("signup");
      } else if (response.request.responseURL.indexOf("/signout") > -1) {
        console.log("signout");
        app.removeCookie("access_token");
        delete axiosInstance.defaults.headers.common["x-access-token"];
      } else if (response.request.responseURL.indexOf("/signin") > -1) {
        console.log("signin");
        const accessToken = response.data.accessToken;
        axiosInstance.defaults.headers.common["x-access-token"] = accessToken;
        app.setCookie(accessToken);
      }

      app.isLoading = false;
      return response;
    },
    function(error) {
      app.isLoading = false;
      if (error.response.status === 403) {
        app.removeCookie("access_token");
        delete axiosInstance.defaults.headers.common["x-access-token"];
      }
      return Promise.reject(error);
    }
  );
}

create(instance);

export default instance;
