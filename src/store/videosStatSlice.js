import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dailyVideoViews: []
}

const videosStatSlice = createSlice({
    name: "videosStat",
    initialState,
    reducers: {
        videosStatReducer(state, action){
            state.dailyVideoViews = [...state.dailyVideoViews, ...action.payload];
        },
        resetDailyVideoViews(state){
            state.dailyVideoViews = [];
        }
    }
})

export const { videosStatReducer, resetDailyVideoViews } = videosStatSlice.actions;

export default videosStatSlice.reducer;