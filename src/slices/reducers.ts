import { combineReducers } from "@reduxjs/toolkit";
import apprReducer from "./app";

const rootReducer = combineReducers({
  app: apprReducer,
});

export default rootReducer;
