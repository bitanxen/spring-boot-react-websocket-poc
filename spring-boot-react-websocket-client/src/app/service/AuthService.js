import applicationService from "./ApplicationService";

class AuthService {
  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      const token = this.getToken();

      if (!token || token == null) {
        return reject(true);
      }

      this.getUser(token)
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject("Authentication Failed.");
        });
    });
  };

  getUser = (token) => {
    return applicationService.get("/api/user");
  };

  getToken = () => {
    return window.localStorage.getItem("chat_app_key");
  };

  createAccount = (model) => {
    return applicationService.post("/common/register", model);
  };

  signIn = (model) => {
    return applicationService.post("/common/login", model);
  };

  setSession = (token) => {
    return window.localStorage.setItem("chat_app_key", token);
  };

  searchUser = (searchTerm) => {
    return applicationService.get("/api/search?searchTerm=" + searchTerm);
  };
}

const instance = new AuthService();
export default instance;
