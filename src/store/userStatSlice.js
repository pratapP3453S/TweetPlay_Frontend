import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dailyUserViews: []
}

const userStatSlice = createSlice({
    name: "userStat",
    initialState,
    reducers: {
        userStatReducer(state, action){
            state.dailyUserViews = action.payload;
        }
    }
})

export const { userStatReducer } = userStatSlice.actions;

export default userStatSlice.reducer;