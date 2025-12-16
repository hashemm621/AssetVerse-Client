import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://asset-verse-server-rust.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //  Request interceptor (always fresh token)
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async config => {
        if (user) {
          const token = await user.getIdToken(true); // 🔥 force refresh
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    //  Response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      response => response,
      error => {
        const statusCode = error.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
