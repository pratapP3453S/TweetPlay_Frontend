import React, { useState, useRef, useEffect } from "react";
import adVideo1 from "../../assets/advertisments/advertisment1.mp4";
import adVideo2 from "../../assets/advertisments/advertisment2.mp4";
import adVideo3 from "../../assets/advertisments/advertisment3.mp4";
import adVideo4 from "../../assets/advertisments/advertisment4.mp4";
import adVideo5 from "../../assets/advertisments/advertisment5.mp4";
import { useSelector } from "react-redux";

const VideoPlayer = ({ videoFile }) => {
    const userData = useSelector((state) => state.auth.userData);
    const [isAdPlaying, setIsAdPlaying] = useState(!userData?.premium); // Only show the ad if the user is not premium
    const videoRef = useRef(null); // Ref to access the video element
    const [lastCurrentTime, setLastCurrentTime] = useState(0); // Track the last valid time to prevent skipping

    // List of available ad videos
    const adVideos = [adVideo1, adVideo2, adVideo3, adVideo4, adVideo5];

    // Randomly select an ad video when the component mounts
    const [selectedAdVideo, setSelectedAdVideo] = useState(adVideos[Math.floor(Math.random() * adVideos.length)]);

    useEffect(() => {
        if (!isAdPlaying) {
            // If no ad is playing, directly load the main video
            videoRef.current.src = videoFile;
            videoRef.current.play();
        }
    }, [isAdPlaying, videoFile]);

    const handleVideoEnd = () => {
        if (isAdPlaying) {
            setIsAdPlaying(false); // Switch to the main video when the ad finishes
            videoRef.current.src = videoFile; // Set the source to the second video
            videoRef.current.play(); // Automatically play the second video
        }
    };

    const handleTimeUpdate = () => {
        if (isAdPlaying) {
            setLastCurrentTime(videoRef.current.currentTime); // Keep track of the current time during the ad
        }
    };

    const handleSeeking = () => {
        if (isAdPlaying && videoRef.current.currentTime > lastCurrentTime) {
            // If the user tries to seek forward during the ad, revert the time
            videoRef.current.currentTime = lastCurrentTime;
        }
    };


    return (
        <div className="relative w-full max-h-[70vh]">
        <video
            ref={videoRef}
            className="rounded-xl w-full max-h-[70vh]"
            controls // Allow other controls like play/pause, volume, etc.
            autoPlay
            onEnded={handleVideoEnd} // Event listener for when the video ends
            onTimeUpdate={handleTimeUpdate} // Keep track of the current time
            onSeeking={handleSeeking} // Prevent seeking forward during the ad
        >
            <source src={isAdPlaying ? selectedAdVideo : videoFile} type="video/mp4" /> {/* Load random ad first if not premium */}
        </video>
                    {/* Show message during ad */}
            {isAdPlaying && (
                <div className="absolute bottom-8 right-8 bg-black bg-opacity-70 text-white py-2 px-4 rounded-lg">
                    Video will start after ad
                </div>
            )}
            </div>
    );
};

export default VideoPlayer;


// import React, { useState, useRef, useEffect } from "react";
// import adVideo1 from "../../assets/advertisments/advertisment1.mp4";
// import adVideo2 from "../../assets/advertisments/advertisment2.mp4";
// import adVideo3 from "../../assets/advertisments/advertisment3.mp4";
// import adVideo4 from "../../assets/advertisments/advertisment4.mp4";
// import adVideo5 from "../../assets/advertisments/advertisment5.mp4";
// import { useSelector } from "react-redux";
// import '../../index.css';

// const VideoPlayer = ({ videoFile }) => {
//     const userData = useSelector((state) => state.auth.userData);
//     const [isAdPlaying, setIsAdPlaying] = useState(!userData?.premium); // Only show the ad if the user is not premium
//     const videoRef = useRef(null); // Ref to access the video element
//     const [lastCurrentTime, setLastCurrentTime] = useState(0); // Track the last valid time to prevent skipping

//     // List of available ad videos
//     const adVideos = [adVideo1, adVideo2, adVideo3, adVideo4, adVideo5];

//     // Randomly select an ad video when the component mounts
//     const [selectedAdVideo, setSelectedAdVideo] = useState(adVideos[Math.floor(Math.random() * adVideos.length)]);

//     useEffect(() => {
//         if (!isAdPlaying) {
//             // If no ad is playing, directly load the main video
//             videoRef.current.src = videoFile;
//             videoRef.current.play();
//         }
//     }, [isAdPlaying, videoFile]);

//     const handleVideoEnd = () => {
//         if (isAdPlaying) {
//             setIsAdPlaying(false); // Switch to the main video when the ad finishes
//             videoRef.current.src = videoFile; // Set the source to the second video
//             videoRef.current.play(); // Automatically play the second video
//         }
//     };

//     const handleTimeUpdate = () => {
//         if (isAdPlaying) {
//             setLastCurrentTime(videoRef.current.currentTime); // Keep track of the current time during the ad
//         }
//     };

//     const handleSeeking = () => {
//         if (isAdPlaying && videoRef.current.currentTime > lastCurrentTime) {
//             // If the user tries to seek forward during the ad, revert the time
//             videoRef.current.currentTime = lastCurrentTime;
//         }
//     };

//     return (
//         <div className="relative w-full max-h-[70vh]">
//             <video
//                 ref={videoRef}
//                 className={`rounded-xl w-full ${isAdPlaying ? 'custom-ad-progress' : ''}`} // Add custom class for ad progress
//                 controls
//                 autoPlay
//                 onEnded={handleVideoEnd} // Event listener for when the video ends
//                 onTimeUpdate={handleTimeUpdate} // Keep track of the current time
//                 onSeeking={handleSeeking} // Prevent seeking forward during the ad
//             >
//                 <source src={isAdPlaying ? selectedAdVideo : videoFile} type="video/mp4" /> {/* Load random ad first if not premium */}
//             </video>

//             {/* Show message during ad */}
//             {isAdPlaying && (
//                 <div className="absolute bottom-8 right-8 bg-black bg-opacity-70 text-white py-2 px-4 rounded-lg">
//                     Video will start after ad
//                 </div>
//             )}
//         </div>
//     );
// };

// export default VideoPlayer;
