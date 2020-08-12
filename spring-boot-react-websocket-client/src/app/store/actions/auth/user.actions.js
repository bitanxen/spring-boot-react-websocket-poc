import authService from "app/service/AuthService";

export const LOAD_USER = "[USER] LOAD USER";

export function loadUser() {
  return (dispatch) => {
    authService.getUser().then((user) => {
      return dispatch({
        type: LOAD_USER,
        payload: user,
      });
    });
  };
}
