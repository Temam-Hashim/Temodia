import { combineReducers } from "redux";

import AuthReducer  from "./AuthReducer";
import PostReducer from "./PostReducer";
import CommentReducer from "./CommentReducer";
import ChatReducer from "./ChatReducer";
 
export const reducers = combineReducers({AuthReducer,PostReducer,CommentReducer, ChatReducer}) 