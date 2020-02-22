import { combineReducers } from "redux";

import counterReducer, { initalStateCounter } from "./counter/reducers";
import authenticateReducer, { initialStateAuth } from "./authenticate/reducers";

const rootReducer = combineReducers({ counterReducer, authenticateReducer });

export type RootState = ReturnType<typeof rootReducer>;

export const initialState: RootState = {
  counterReducer: initalStateCounter,
  authenticateReducer: initialStateAuth
};

export default rootReducer;
