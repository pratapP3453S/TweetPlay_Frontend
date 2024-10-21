import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../../utils/axios.helper.js';
import { videosStatReducer } from '../../store/videosStatSlice.js';
import getTimeDistanceToNow from '../../utils/getTimeDistance.js';
import { icons } from '../../assets/Icons.jsx';
import { useNavigate } from 'react-router-dom';
import GuestComponent from '../GuestPages/GuestComponent.jsx';
import { FaRegPlayCircle } from "react-icons/fa";

const VideoStatContainer = () => {
  const dailyVideoViews = useSelector(state => state.videosStat.dailyVideoViews);
  const dispatch = useDispatch();
  const [statsloading, setStatsloading] = useState(true);
  const navigate = useNavigate();

  async function fetchUserVideos() {
    try {
      const response = await axiosInstance.get(`/videos/get-videostats/last-ten-days`);
      // console.log(response.data.data);
      dispatch(videosStatReducer(response.data.data));
    } catch (error) {
      console.error('Error fetching user videos:', error);
    }
  }

  useEffect(() => {
    fetchUserVideos();
    setStatsloading(false);
  }, []);

  const handleStats = (videoContainerId) => {
      navigate(`/user-videos-stats/${videoContainerId}`)
  }
  if (statsloading) {
    return (
        <span className="flex justify-center mt-20">
            {icons.bigLoading}
        </span>
    );
}
else {

  return (
    <div className="p-4">
      {Array.isArray(dailyVideoViews) && dailyVideoViews.length > 0 ? (
        dailyVideoViews.map((video, videoIndex) => (
          <div key={videoIndex} className="flex bg-gray-800 text-white rounded-lg mb-4 p-4 cursor-pointer" onClick={() => handleStats(video._id)}>
            {/* Thumbnail Section */}
            <div className="relative w-48 h-28 mr-4">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover rounded-lg" />
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between">
              {/* Video Title */}
              <h3 className="text-lg font-bold">{video.title}</h3>

              {/* Owner Details */}
              {Array.isArray(video.ownerDetails) && video.ownerDetails.length > 0 ? (
                <p className="text-gray-400">
                  {video.ownerDetails[0].fullName} <span>•</span> {video.views} views <span>•</span> {getTimeDistanceToNow(video.createdAt)}
                </p>
              ) : (
                <p>No owner details available</p>
              )}

              {/* Additional Information (optional) */}
              <p className="text-sm text-gray-400">Video Type : {video.isPublished ? "Public" : "Private"}</p>
            </div>

            {/* Menu Section (Optional) */}
            <div className="ml-auto">
              <button className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                </svg>
              </button>
            </div>
          </div>
        ))
      ) : (
        <GuestComponent
        icon={
            <span className="w-full h-full flex items-center p-4">
                <FaRegPlayCircle className="w-32 h-32" />
            </span>
        }
        title="No Videos Available"
        subtitle="Looks like You didn't Upload any Video in you channel."
        guest={false}
    />
      )}
    </div>
  );
}
};


export default VideoStatContainer;
