import { combineReducers } from "redux";

import counterReducer from "./counter/reducers";
import authenticateReducer from "./authenticate/reducers";

const rootReducer = combineReducers({ counterReducer, authenticateReducer });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
