import * as Actions from "../../actions/auth";

const initialState = {
  userId: null,
  fullName: null,
};

const user = function (state = initialState, action) {
  switch (action.type) {
    case Actions.LOAD_USER: {
      return {
        userId: action.payload.userId,
        fullName: action.payload.fullName,
      };
    }
    default:
      return state;
  }
};

export default user;
