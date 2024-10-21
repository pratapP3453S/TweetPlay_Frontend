import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import userSlice from "./userSlice.js";
import videoSlice from "./videoSlice.js";
import tweetsSlice from "./tweetsSlice.js";
import playlistSlice from "./playlistSlice.js";
import playlistsSlice from "./playlistsSlice.js";
import dashboardSlice from "./dashboardSlice.js";
import videosStatSlice from "./videosStatSlice.js";
import userStatSlice from "./userStatSlice.js"

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    video: videoSlice,
    tweets: tweetsSlice,
    playlist: playlistSlice,
    playlists: playlistsSlice,
    dashboard: dashboardSlice,
    videosStat: videosStatSlice,
    userStat: userStatSlice,
  },
});

export default store;
