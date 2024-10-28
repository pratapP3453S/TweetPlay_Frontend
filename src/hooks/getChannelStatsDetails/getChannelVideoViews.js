import axiosInstance from "../../utils/axios.helper.js";
// import { setStats } from "../store/dashboardSlice";
import { toast } from "react-toastify";
import { videosStatReducer } from "../../store/videosStatSlice.js";

export const getChannelVideoViews = async (dispatch) => {
    try {
        const response = await axiosInstance.get(
            `/videos/get-videostats/last-ten-days`
        );
        if (response?.data?.success) {
            dispatch(videosStatReducer(response?.data?.data));
        }
    } catch (error) {
        toast.error("Error getting channel views details");
        console.log(error);
    }
};