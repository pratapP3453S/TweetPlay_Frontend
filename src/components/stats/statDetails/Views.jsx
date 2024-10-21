import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../../../utils/axios.helper.js';
import { icons } from '../../../assets/Icons.jsx';
import { useNavigate } from 'react-router-dom';
import { userStatReducer } from '../../../store/userStatSlice.js';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { RiArrowGoBackLine } from "react-icons/ri";
import { FaRegPlayCircle } from "react-icons/fa";
import GuestComponent from '../../GuestPages/GuestComponent.jsx';

const load = () => {
    return (
        <span className="flex justify-center mt-20">
            {icons.bigLoading}
        </span>
    );
}

function Views() {
    const dailyUserViews = useSelector(state => state.userStat.dailyUserViews);
    const dispatch = useDispatch();
    const [statsloading, setStatsloading] = useState(true);
    const navigate = useNavigate();

    // Helper function to aggregate views by date
    function aggregateViewsByDate(videos) {
        const viewCountsByDate = {};

        videos.forEach(video => {
            video.viewsPerDay.forEach(dayView => {
                const dateKey = new Date(dayView.date).getDate();
                if (!viewCountsByDate[dateKey]) {
                    viewCountsByDate[dateKey] = 0;
                }
                viewCountsByDate[dateKey] += dayView.count;
            });
        });

        // Convert the object to an array of objects for Recharts and sort by date (oldest to newest)
        return Object.entries(viewCountsByDate)
            .map(([date, totalViews]) => ({ date, totalViews }))
            .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sorting by date
    }

    async function fetchUserVideos() {
        try {
            const response = await axiosInstance.get(`/videos/get-videostats/last-ten-days`);
            console.log(response.data.data);
            if (Array.isArray(response.data.data)) {
                dispatch(userStatReducer(response.data.data));
            }
        } catch (error) {
            console.error('Error fetching user videos:', error);
        }
    }

    useEffect(() => {
        fetchUserVideos();
        setStatsloading(false);
    }, []);

    const handleGoBack = () => {
        navigate(`/admin/dashboard`);
      }

    if (statsloading) {
        return (
            <span className="flex justify-center mt-20">
                {icons.bigLoading}
            </span>
        );
    } else {
        const aggregatedViews = aggregateViewsByDate(dailyUserViews);

        return (
        <>
        {Array.isArray(dailyUserViews) && dailyUserViews.length > 0 ? (
            <div className='text-white mt-16'>
                <button
                    onClick={handleGoBack}
                    className="mt-4 ml-4 inline-flex items-center gap-x-2 bg-pink-600 hover:bg-pink-600/90 border border-transparent rounded hover:border-white px-3 py-1.5 font-semibold text-white">
                    <RiArrowGoBackLine />
                    Go Back
                </button>
                <center><h2 className='text-lg font-bold'>{`Daily Views On Channel (Last ${dailyUserViews.length} days)`}</h2></center>
                <center>
                    <ResponsiveContainer width="80%" height={400} >
                        <LineChart
                            data={aggregatedViews}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" /> {/* Dark grid */}
                            <XAxis
                                dataKey="date"
                                stroke="#ffffff"  // White axis labels 
                                tick={{ fill: '#fff' }}  // White text on X-axis 
                                reversed={false}  // Ensure oldest on left and latest on right
                            />
                            <YAxis
                                stroke="#ffffff"  // White axis labels 
                                tick={{ fill: '#fff' }}  // White text on Y-axis 
                                tickCount={10}  // Adjust this value as needed for increments of 5 or 10
                                domain={['auto', 'auto']}  // Automatically adjusts the min and max values
                                interval="preserveStartEnd"  // Ensure steps in multiples of 5 or 10
                            />
                            <Tooltip contentStyle={{ backgroundColor: '#333', borderRadius: '5px', border: 'none', color: '#fff' }} /> {/* Dark tooltip */}
                            <Legend wrapperStyle={{ color: '#fff' }} /> {/* White legend */}
                            <Line
                                type="monotone"
                                dataKey="totalViews"
                                stroke="#4caf50"  // Green line
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </center>
            </div> ) : (

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
            )
    }
            </>
        );
    }
}

export default Views;

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import axiosInstance from '../../../utils/axios.helper.js';
// import { icons } from '../../../assets/Icons.jsx';
// import { useNavigate } from 'react-router-dom';
// import { userStatReducer } from '../../../store/userStatSlice.js';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
// } from 'recharts';

// function Views() {
//     const dailyUserViews = useSelector(state => state.userStat.dailyUserViews);
//     const dispatch = useDispatch();
//     const [statsloading, setStatsloading] = useState(true);
//     const navigate = useNavigate();

//     // Helper function to aggregate views by date
//     function aggregateViewsByDate(videos) {
//         const viewCountsByDate = {};

//         videos.forEach(video => {
//             video.viewsPerDay.forEach(dayView => {
//                 const dateKey = new Date(dayView.date).toLocaleDateString();
//                 if (!viewCountsByDate[dateKey]) {
//                     viewCountsByDate[dateKey] = 0;
//                 }
//                 viewCountsByDate[dateKey] += dayView.count;
//             });
//         });

//         // Convert the object to an array of objects for Recharts and sort by date (oldest to newest)
//         return Object.entries(viewCountsByDate)
//             .map(([date, totalViews]) => ({ date, totalViews }))
//             .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sorting by date
//     }

//     async function fetchUserVideos() {
//         try {
//             const response = await axiosInstance.get(`/videos/get-videostats/last-ten-days`);
//             console.log(response.data.data);
//             if (Array.isArray(response.data.data)) {
//                 dispatch(userStatReducer(response.data.data));
//             }
//         } catch (error) {
//             console.error('Error fetching user videos:', error);
//         }
//     }

//     useEffect(() => {
//         fetchUserVideos();
//         setStatsloading(false);
//     }, []);

//     if (statsloading) {
//         return (
//             <span className="flex justify-center mt-20">
//                 {icons.bigLoading}
//             </span>
//         );
//     } else {
//         const aggregatedViews = aggregateViewsByDate(dailyUserViews);

//         return (
//             <div className='text-white mt-16'>
//                 <center><h2 className='text-lg font-bold'>Total Views Per Day (Line Graph)</h2></center>
//                 <center>
//                 <ResponsiveContainer width="70%" height={400} >
//                     <LineChart
//                         data={aggregatedViews}
//                         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                     >
//                         <CartesianGrid strokeDasharray="3 3" stroke="#444" /> {/* Dark grid */}
//                         <XAxis
//                             dataKey="date"
//                             stroke="#ffffff"  {/* White axis labels */}
//                             tick={{ fill: '#fff' }}  {/* White text on X-axis */}
//                             reversed={false}  // Ensure oldest on left and latest on right
//                         />
//                         <YAxis
//                             stroke="#ffffff"  {/* White axis labels */}
//                             tick={{ fill: '#fff' }}  {/* White text on Y-axis */}
//                             tickCount={10}  // Adjust this value as needed for increments of 5 or 10
//                             domain={['auto', 'auto']}  // Automatically adjusts the min and max values
//                             interval="preserveStartEnd"  // Ensure steps in multiples of 5 or 10
//                         />
//                         <Tooltip contentStyle={{ backgroundColor: '#333', borderRadius: '5px', border: 'none', color: '#fff' }} /> {/* Dark tooltip */}
//                         <Legend wrapperStyle={{ color: '#fff' }} /> {/* White legend */}
//                         <Line
//                             type="monotone"
//                             dataKey="totalViews"
//                             stroke="#4caf50"  // Green line
//                             strokeWidth={2}
//                             activeDot={{ r: 8 }}
//                         />
//                     </LineChart>
//                 </ResponsiveContainer>
//                 </center>
//             </div>
//         );
//     }
// }

// export default Views;

