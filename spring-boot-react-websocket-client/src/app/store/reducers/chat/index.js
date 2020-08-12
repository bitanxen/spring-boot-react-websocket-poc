import { combineReducers } from "redux";
import chat from "./chat.reducers";

const chatReducers = combineReducers({ chat });

export default chatReducers;
