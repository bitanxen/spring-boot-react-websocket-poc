import axios from "axios";

class ApplicationService {
  appUrl = () => {
    return !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "";
  };

  http = () => {
    const httpService = axios.create({
      baseURL: this.appUrl(),
    });

    const access_token = window.localStorage.getItem("chat_app_key");
    if (access_token) {
      httpService.defaults.headers.common["Authorization"] =
        "Bearer " + access_token;
    }
    return httpService;
  };

  get = (url) => {
    return new Promise((resolve, reject) => {
      return this.http()
        .get(url)
        .then((data) => {
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  post = (url, data, config) => {
    return new Promise((resolve, reject) => {
      return this.http()
        .post(url, data, config)
        .then((data) => {
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  put = (url, data, config) => {
    return new Promise((resolve, reject) => {
      return this.http()
        .put(url, data, config)
        .then((data) => {
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  delete = (url) => {
    return new Promise((resolve, reject) => {
      return this.http()
        .delete(url)
        .then((data) => {
          resolve(data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}

const instance = new ApplicationService();
export default instance;
