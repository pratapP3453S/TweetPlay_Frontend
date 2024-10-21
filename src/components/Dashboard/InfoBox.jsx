import React from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";

function InfoBox({ title, value, icon }) {
    const navigate = useNavigate();

    const handleStats = () => {
        switch (title) {
            case "Total Videos":
                navigate(`/video-stat-contain`)
                break;
            case "Total Views":
                navigate(`/user-views-stats`)
                break;
            case "Total Subscribers":
                navigate(`/user-subscribes-stats`)
                break;
            case "Total Likes":
                navigate(`/user-likes-stats`)
                break;
            default:
                return null;
        }
    }

    return (
        <div className="border p-4 transition transform hover:-translate-y-2 hover:shadow-lg hover:bg-pink-600 hover:border-pink-300 hover:text-white" onClick={handleStats}>
            <div className="mb-4 block">
                <span className="inline-block rounded-full bg-[#f8c3fa] p-1 text-pink-400">
                    {icon}
                </span>
            </div>
            <h6 className="text-white-500">{title}</h6>
            <p className="text-3xl font-semibold">{value}</p>
        </div>

    );
}

export default InfoBox;
