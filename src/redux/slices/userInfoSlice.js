import { createSlice } from "@reduxjs/toolkit";

const initialState = {firstName: "", lastName: "", imageUrl: ""};

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.imageUrl = action.payload.imageUrl;
        },
        resetUserInfo: (state) => {
            state.firstName = initialState.firstName;
            state.lastName = initialState.lastName;
            state.imageUrl = initialState.imageUrl;
        }
    }
})

export const { setUserInfo, resetUserInfo } = userInfoSlice.actions;

const userInfoReducer = userInfoSlice.reducer;

export default userInfoReducer;

