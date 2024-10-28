import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { icons } from '../../../assets/Icons';
import { RiArrowGoBackLine } from "react-icons/ri";
import { resetDailyVideoViews } from '../../../store/videosStatSlice.js';

Chart.register(ChartDataLabels);

const Videos = () => {
  const dailyVideoViews = useSelector(state => state.videosStat.dailyVideoViews);  // Get the video stats from Redux store
  const { videoContainerId } = useParams();  // Get the ID from the route params
  const [loading, setLoading] = useState(true);
  const [filteredVideo, setFilteredVideo] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear dailyVideoViews when entering the component
    dispatch(resetDailyVideoViews());
  }, [dispatch]);

  useEffect(() => {
    if (videoContainerId && dailyVideoViews?.length > 0) {
      const video = dailyVideoViews.find(video => video._id === videoContainerId);
      setFilteredVideo(video);
      setLoading(false);  // Mark loading as false when data is ready
    }
  }, [videoContainerId, dailyVideoViews]);

  if (loading) {
    return <p className="text-center text-white"><span className="flex justify-center mt-20">{icons.bigLoading}</span></p>;
  }

  // Prepare data for chart
  const data = {
    labels: filteredVideo?.viewsPerDay.map(view => new Date(view.date).getDate()) || [],
    datasets: [
      {
        label: 'Views per day',
        data: filteredVideo?.viewsPerDay.map(view => view.count) || [],
        fill: true,
        backgroundColor: 'rgba(229, 3, 167, 0.1)',  // Light pink background fill under the line
        borderColor: '#e503a7',  // Bold pink line color
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',  // White point color
        pointBorderColor: '#e503a7',  // Pink border around points
        pointRadius: 5,
        pointHoverRadius: 7,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white'  // Change legend text color
        }
      },
      datalabels: {
        display: true,
        color: 'white',
        align: 'top',
        formatter: (value) => value,
        font: {
          size: 12,
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'  // Light grid lines for x-axis
        },
        ticks: {
          color: 'white'  // Change x-axis tick color
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'  // Light grid lines for y-axis
        },
        ticks: {
          color: 'white',  // Change y-axis tick color
          stepSize: 5  // Ensure Y-axis increments by 5 or 10
        }
      }
    },
    elements: {
      line: {
        tension: 0.4  // Smooth line curve
      }
    }
  };

  const handleGoBack = () => {
    navigate(`/video-stat-contain`)
  }

  const chartContainerStyle = 'w-3/4 mx-auto bg-gray-900 p-6 rounded-lg shadow-lg mt-8';  // Dark background and shadow for the chart container

  return (
    <div className="text-white">
      <button
        onClick={handleGoBack}
        className="mt-4 ml-4 inline-flex items-center gap-x-2 bg-pink-600 hover:bg-pink-600/90 border border-transparent rounded hover:border-white px-3 py-1.5 font-semibold text-white">
        <RiArrowGoBackLine />
        Go Back
      </button>
      <h2 className="text-2xl font-bold text-center mb-6">{`Daily Views On Video (Last 10 days)`}</h2>
      {filteredVideo ? (
        filteredVideo.viewsPerDay.length > 0 ? (
          <div className={chartContainerStyle}>
            <Line data={data} options={options} />
          </div>
        ) : (
          <p className="text-center">No views data available for this video</p>
        )
      ) : (
        <p className="text-center">No video found with the given ID</p>
      )}
    </div>
  );
};

export default Videos;
