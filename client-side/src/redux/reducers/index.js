import { combineReducers } from "redux";
import changeNumber from "./UpDown";
import isLoggedReducer from "./Auth";
import roomReducer from "./Room";
import employeeReducer from "./Employee"
import userAvatureReducer from "./User"
import UserReducer from "./UserRedux"

// import counterReducer from "./counterReducer";
// import isLoggedReducer from "./isLoggedReducer";

const rootReducer = combineReducers({
  changeNumber,
  isLoggedReducer,
  roomReducer,
  employeeReducer,
  userAvatureReducer,
  UserReducer
});

export default rootReducer;