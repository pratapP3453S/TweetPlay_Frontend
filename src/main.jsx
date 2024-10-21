import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store/store.js";
import { ThemeProvider } from "./components/Context/ThemeContext.jsx";
import Theme from "./Theme.jsx";
// import dotenv from 'dotenv';

// dotenv.config({
//     path: "./env",
// });

// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App />,
//         children: [
//             {
//                 path: "/",
//                 element: <Home />,
//             },
//             {
//                 path: "/login",
//                 element: <Login />,
//             },
//             {
//                 path: "/signup",
//                 element: <SignUp />,
//             },
//             {
//                 path: "/search/:query",
//                 element: <Search />,
//             },
//             {
//                 path: "/watchpage/:videoId",
//                 element: <Video />,
//             },
//             {
//                 path: "/liked-videos",
//                 element: <LikedVideos />,
//             },
//             {
//                 path: "/history",
//                 element: <History />,
//             },
//             {
//                 path: "/settings",
//                 element: <Settings />,
//             },
//             {
//                 path: "/support",
//                 element: <Support />,
//             },
//             {
//                 path: "/tweets",
//                 element: <Tweets />,
//             },
//             {
//                 path: "/paymentsuccess",
//                 element: <PaymentSuccess />
//             },
//             {
//                 path: "/paymentunsuccessful",
//                 element: <PaymentUnsuccessful />
//             },
//             {
//                 path: "/channel/:username",
//                 element: <Channel />,
//                 children: [
//                     {
//                         path: "/channel/:username",
//                         element: <ChannelVideos />,
//                     },
//                     {
//                         path: "/channel/:username/tweets",
//                         element: <ChannelTweets />,
//                     },
//                     {
//                         path: "/channel/:username/playlist",
//                         element: <ChannelPlaylist />,
//                     },
//                     {
//                         path: "/channel/:username/subscribed",
//                         element: <ChannelSubscribed />,
//                     },
//                     {
//                         path: "/channel/:username/about",
//                         element: <AboutChannel />,
//                     },
//                 ],
//             },
//             {
//                 path: "/playlist/:playlistId",
//                 element: <PlaylistVideos />,
//             },
//             {
//                 path: "/subscriptions",
//                 element: <Subscriptions />,
//             },
//             {
//                 path: "/admin/dashboard",
//                 element: <Dashboard />,
//             },
//             {
//                 path: "/admin/go-premium",
//                 element: <PremiumComponent />,
//             }
//         ],
//     },
//     {
//         path: "*",
//         element: <PageNotFound />,
//     },
// ]);

createRoot(document.getElementById("root")).render(
    <ThemeProvider>
        <Provider store={store}>
        {/* <div className={`${theme === "cupcake" ? "backgroundColorWhite" : "backgroundColorBlack" }`}>
            <RouterProvider router={router} />
        </div> */}
         <Theme />
        </Provider>
    </ThemeProvider>

);
