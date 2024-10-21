import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dailyVideoViews: []
}

const videosStatSlice = createSlice({
    name: "videosStat",
    initialState,
    reducers: {
        videosStatReducer(state, action){
            state.dailyVideoViews = action.payload;
        }
    }
})

export const { videosStatReducer } = videosStatSlice.actions;

export default videosStatSlice.reducer;