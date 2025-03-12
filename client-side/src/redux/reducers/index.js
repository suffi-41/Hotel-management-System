import { combineReducers } from "redux";
import changeNumber from "./UpDown";
import isLoggedReducer from "./Auth";

// import counterReducer from "./counterReducer";
// import isLoggedReducer from "./isLoggedReducer";

const rootReducer = combineReducers({
  changeNumber,
 isLoggedReducer
});

export default rootReducer;