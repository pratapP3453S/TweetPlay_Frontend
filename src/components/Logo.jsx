import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/TweetPlay_light.png";

function Logo({ className = "" , premium}) {
    return (
        <div
            className={`font-bold text-xl flex items-center justify-center w-full ${className} text-[#FFFFFF]`}
        >
            <img
                src={`${logo}`}
                alt="logo"
                className="w-10 h-10 inline-block mr-2 rounded-lg"
            />
            <div><span className="text-red-500">Tweet</span>Play {premium ? premium : null}</div>
        </div>
    );
}

export default Logo;
