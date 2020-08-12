import { combineReducers } from "redux";

import common from "./common";
import auth from "./auth";
import chat from "./chat";

const createReducer = () =>
  combineReducers({
    auth,
    common,
    chat,
  });

export default createReducer;
