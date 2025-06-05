import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3/movie",
});

// request 에 권한을 승인하고 요청하는 것
axiosInstance.interceptors.request.use((config) =>{
    config.headers.Authorization = `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;
    config.headers.accept = "application/json";
    return config;
})


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    },
);

export default axiosInstance;