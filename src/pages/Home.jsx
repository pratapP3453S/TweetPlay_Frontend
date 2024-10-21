import React, { useContext } from "react";
import VideoContainer from "../components/Video/VideoContainer";
import { ThemeContext } from "../components/Context/ThemeContext";



function Home() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className="size-full">
            <VideoContainer />
        </div>
    );
}

export default Home;
