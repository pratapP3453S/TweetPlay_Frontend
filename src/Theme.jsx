import React, { useContext } from 'react'
import { ThemeContext } from './components/Context/ThemeContext'
// import { router } from './main';
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Video from "./pages/Video.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import LikedVideos from "./pages/LikedVideos.jsx";
import History from "./pages/History.jsx";
import Settings from "./pages/Settings.jsx";
import Support from "./pages/Support.jsx";
import Channel from "./pages/Channel.jsx";
import ChannelVideos from "./components/Channel/ChannelVideos.jsx";
import ChannelTweets from "./components/Channel/ChannelTweets.jsx";
import AboutChannel from "./components/Channel/AboutChannel.jsx";
import ChannelSubscribed from "./components/Channel/ChannelSubscribed.jsx";
import ChannelPlaylist from "./components/Channel/ChannelPlaylist.jsx";
import PlaylistVideos from "./components/Playlist/PlaylistVideos.jsx";
import Tweets from "./pages/Tweets.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import PremiumComponent from "./components/PremiumPage/PremiumComponent.jsx";
import PaymentSuccess from "./components/PremiumPage/PaymentSuccess.jsx";
import PaymentUnsuccessful from "./components/PremiumPage/PaymentUnsuccessful.jsx";
import { useSelector } from 'react-redux';
import { ProtectedRoute, ProtectedRoute2 } from './ProtectedRoute.jsx';
import Videos from './components/stats/statDetails/Videos.jsx';
import Views from './components/stats/statDetails/Views.jsx';
import Likes from './components/stats/statDetails/Likes.jsx';
import Subscribes from './components/stats/statDetails/Subscribes.jsx';
import VideoStatContainer from './components/stats/VideoStatContainer.jsx';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/search/:query",
                element: <Search />,
            },
            {
                path: "/watchpage/:videoId",
                element: <Video />,
            },
            {
                path: "/liked-videos",
                element: <LikedVideos />,
            },
            {
                path: "/history",
                element: <History />,
            },
            {
                path: "/settings",
                element: <Settings />,
            },
            {
                path: "/support",
                element: <Support />,
            },
            {
                path: "/paymentsuccess",
                element: <PaymentSuccess />,
            },
            {
                path: "/paymentunsuccessful",
                element: <PaymentUnsuccessful />,
            },
            {
                path: "/channel/:username",
                element: <Channel />,
                children: [
                    {
                        path: "/channel/:username",
                        element: <ChannelVideos />,
                    },
                    {
                        path: "/channel/:username/tweets",
                        element: (
                            <ProtectedRoute><ChannelTweets />, </ProtectedRoute>
                        )
                    },
                    {
                        path: "/channel/:username/playlist",
                        element: <ChannelPlaylist />,
                    },
                    {
                        path: "/channel/:username/subscribed",
                        element: <ChannelSubscribed />,
                    },
                    {
                        path: "/channel/:username/about",
                        element: <AboutChannel />,
                    },
                ],
            },
            {
                path: "/video-stat-contain",
                element: <ProtectedRoute2><VideoStatContainer /></ProtectedRoute2>
            },
            {
                path: "/playlist/:playlistId",
                element: <PlaylistVideos />,
            },
            {
                path: "/subscriptions",
                element: <Subscriptions />,
            },
            {
                path: "/admin/dashboard",
                element: (<ProtectedRoute2><Dashboard /></ProtectedRoute2>),
            },
            {
                path: "/user-views-stats",
                element: (<ProtectedRoute2><Views /></ProtectedRoute2>)
            },
            {
                path: "/user-videos-stats/:videoContainerId",
                // Component:{Videos},
                element: (<ProtectedRoute2><Videos /></ProtectedRoute2>)
            },
            {
                path: "/user-likes-stats",
                element: (<ProtectedRoute2><Likes /></ProtectedRoute2>)
            },
            {
                path: "/user-subscribes-stats",
                element: (<ProtectedRoute2><Subscribes /></ProtectedRoute2>)
            },
            {
                path: "/admin/go-premium",
                element: <PremiumComponent />,
            },
            // Protect the "/tweets" route
            {
                path: "/tweets",
                element: (
                    <ProtectedRoute>
                        <Tweets /> {/* Only accessible to premium users */}
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]);

function Theme() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`${theme === "cupcake" ? "bg-white text-black" : "bg-black text-white"}`}>
            <RouterProvider router={router} />
        </div>
    )
}

export default Theme
