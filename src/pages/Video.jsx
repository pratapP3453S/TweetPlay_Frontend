

import React, { useEffect, useState } from "react";
import VideoPlayer from "../components/Video/VideoPlayer";
import axiosInstance from "../utils/axios.helper.js";
import { useSelector, useDispatch } from "react-redux";
import { setVideo } from "../store/videoSlice.js";
import { useParams } from "react-router-dom";
import VideoListCard from "../components/Video/VideoListCard.jsx";
import VideoInfo from "../components/Video/VideoInfo.jsx";
import Comments from "../components/Comments.jsx";
import { icons } from "../assets/Icons.jsx";

function Video() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { videoId } = useParams();
    const [videos, setVideos] = useState([]);
    const { video } = useSelector((state) => state.video);
    const authStatus = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData); // Get user data to check if user is logged in

    const fetchVideo = async () => {
        setError("");
        try {
            // Fetch the video details by videoId
            const response = await axiosInstance.get(`/videos/${videoId}`);
            if (response?.data?.data) {
                dispatch(setVideo(response.data.data));
            }

            // Post video view stats (this can be based on videoId)
            await axiosInstance.post(`/videos/${videoId}/views/last-ten-days`);
        } catch (error) {
            <VideoPlayer />
            
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchVideos = async () => {
        try {
            const response = await axiosInstance.get(`/videos?sortBy=views&limit=8`);
            if (response?.data?.data?.length > 0) {
                setVideos(response.data.data);
            }
        } catch (error) {
            console.log("Error fetching videos", error);
        }
    };

    useEffect(() => {
        fetchVideo();
        fetchVideos();
    }, [videoId, authStatus]);

    if (error) {
        return error;
    }

    return (
        <div>
            {loading ? (
                <span className="flex justify-center mt-20">
                    {icons.bigLoading}
                </span>
            ) : (
                <div className="flex">
                    <div className="w-[70%] p-4">
                        {/* Render the VideoPlayer component with ad logic */}
                        <VideoPlayer
                            key={video?._id}
                            videoFile={video?.videoFile}
                            userData={userData} // Pass userData to check if ads need to be shown
                        />
                        <VideoInfo video={video} />
                        <Comments video={video} />
                    </div>
                    <div className="w-[30%]">
                        {videos
                            ?.filter((v) => v?._id !== videoId)
                            .map((v) => (
                                <VideoListCard
                                    key={v?._id}
                                    video={v}
                                    imgWidth="w-[13vw]"
                                    imgHeight="h-[8vw]"
                                    titleWidth="w-[95%]"
                                    titleSize="text-[0.95rem]"
                                    titleFont=""
                                    showVideoDescription={false}
                                    paddingY="py-1"
                                    marginLeft="ml-2"
                                    marginLeft2="ml-2"
                                    avatarHeight="h-7"
                                    avatarWidth="w-7"
                                    textFont="text-[0.9rem]"
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Video;
