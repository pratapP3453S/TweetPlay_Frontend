import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/TweetPlay_light.png";

function OpenLogo({ className = "" }) {
    return (
        <div
            className={`font-bold text-xl flex items-center justify-center w-full ${className} text-[#FFFFFF]`}
        >
            <img
                src={`${logo}`}
                alt="logo"
                className="size-32 inline-block mr-2 rounded-lg"
            />
            {/* <div><span className="text-red-500">Tweet</span>Play {premium ? premium : null}</div> */}
        </div>
    );
}

export default OpenLogo;
