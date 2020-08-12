import { combineReducers } from "redux";
import settings from "./settings.reduers";

const commonReducers = combineReducers({
  settings,
});

export default commonReducers;
