import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import userInfoReducer from "./slices/userInfoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    userInfo: userInfoReducer,
  },
});

export default store;