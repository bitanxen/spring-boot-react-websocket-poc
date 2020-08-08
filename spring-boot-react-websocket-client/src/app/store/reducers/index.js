import { combineReducers } from "redux";

import common from "./common";

const createReducer = () =>
  combineReducers({
    common,
  });

export default createReducer;
