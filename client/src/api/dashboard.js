// import axios from "axios";
import useSWR, { mutate } from "swr";
import axios from "axios";
import Cookies from "js-cookie";

export const useMostRated = () => {
  const token = Cookies.get("token");
  const response = useSWR(
    `${process.env.REACT_APP_BASE_URL}/capstone/dashboard/most_rated`,
    async (url) => {
      const res = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const d = await res.data;
      return d;
    }
  );

  return response;
};

export const useMostViewed = () => {
  const token = Cookies.get("token");
  const response = useSWR(
    `${process.env.REACT_APP_BASE_URL}/capstone/dashboard/most_view`,
    async (url) => {
      const res = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const d = await res.data;
      return d;
    }
  );

  return response;
};
