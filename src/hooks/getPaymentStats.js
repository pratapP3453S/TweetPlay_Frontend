import { useSelector } from "react-redux";
import axiosInstance from "../utils/axios.helper";
// import { setStats } from "../store/dashboardSlice";
import { toast } from "react-toastify";
import TweetPlay_light from "../assets/TweetPlay_light.png";

export const getPaymentStats = async (userData) => {
  try {
    const {
      data: { order },
    } = await axiosInstance.post(`/payment/checkout`);
    const {
      data: { key },
    } = await axiosInstance.get(`/getkeys`);
    // if (order) {
    //   console.log(order);
    // }
    // console.log(key);

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "TweetPlay Premium",
      description:
        "Fastest way to Pay and Enjoy the Premium version of TweetPlay",
      image: TweetPlay_light,
      order_id: order.id,
      callback_url: `https://tweetplay-b.onrender.com/api/v1/payment/paymentverification/${userData._id}`,
      prefill: {
        name: userData?.username,
        email: userData?.email,
        contact: "9090909090",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#5b5a59",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  } catch (error) {
    toast.error("Error price");
    console.log(error);
  }
};
