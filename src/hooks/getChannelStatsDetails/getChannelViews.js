import axiosInstance from "../utils/axios.helper";
import { setStats } from "../store/dashboardSlice";
import { toast } from "react-toastify";

export const getChannelStats = async (dispatch, videoId) => {
    try {
        const response = await axiosInstance.get(
            `/videos/${videoId}/views/last-10-days`
        );
        if (response?.data?.success) {
            dispatch(setStats(response.data.data));
        }
    } catch (error) {
        toast.error("Error getting channel views details");
        console.log(error);
    }
};