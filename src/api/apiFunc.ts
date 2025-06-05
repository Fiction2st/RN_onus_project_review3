// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import axiosInstance from "./axiosInstance";
//
//
//
// export async function fetchMovies() {
//     const { data } = await axiosInstance.get("/now_playing", { params : });
//     return data.results;
// }
//
//
// export async function getMovieById(id : string){
//     const { data } = await axiosInstance.get(`/${id}?language=en-US`);
//     return data;
// }



import axiosInstance from "./axiosInstance";

export const fetchMovies= async (page: number = 1) => {
    const {data} = await axiosInstance.get(`/now_playing`);
    return data.results;
};

export const getMovieById = async (movieId: string) => {
    const {data} = await axiosInstance.get(`/${movieId}`);
    return data;
};