import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const auth = getAuth(); 

  
  axiosSecure.interceptors.request.use(
    async (config) => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const token = await currentUser.getIdToken(); // 🔴 Firebase থেকে fresh ID token নেওয়া
        config.headers.Authorization = `Bearer ${token}`; // 🔴 Bearer format-এ header-এ বসানো
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosSecure;
};

export default useAxiosSecure;