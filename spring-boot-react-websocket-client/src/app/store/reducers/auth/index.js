import { combineReducers } from "redux";
import user from "./user.reducers";
import login from "./login.reducers";

const authReducers = combineReducers({ login, user });

export default authReducers;
