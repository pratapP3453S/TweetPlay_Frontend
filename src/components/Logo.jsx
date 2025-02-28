import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/TweetPlay_light.png";

function Logo({ className = "", premium }) {
    return (
        <div className={`flex items-center ${className} text-white`}>
            {/* Logo section */}
            <div className="w-14 h-14 flex items-center justify-center">
                <img
                    src={logo}
                    alt="logo"
                    className="w-10 h-10 rounded-lg"
                />
            </div>

            {/* Text section */}
            <div className="ml-3">
                <div className="text-3xl font-bold">
                    <span className="text-red-500">Tweet</span>Play {premium ? premium : null}
                </div>
                <div className="italic text-sm text-gray-400">- powered by ByteBridges</div>
            </div>
        </div>
    );
}

export default Logo;
