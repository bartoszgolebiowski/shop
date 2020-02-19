import { combineReducers } from "redux";

import counterReducer from './counter/reducers';
import authenticateReducer from './authenticate/reducers';

export default combineReducers({ counterReducer, authenticateReducer });
