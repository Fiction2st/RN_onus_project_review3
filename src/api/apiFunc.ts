import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const MOVIE_URL:string = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const AXIOS_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODcwYjcyMGNmNmFmNTViZjI2ZTk5YjA0NjBkMjljMyIsIm5iZiI6MTc0NzM1OTAxMS44NDUsInN1YiI6IjY4MjY5NTIzZThhYjJlYzM4YjRiNThlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X5z6bQ_4d9d9MASFzAregzMaYJQWtmf2nnXlgZvz9NU'
    },
};

export async function fetchMovies() {
    const { data } = await axios.get(MOVIE_URL, AXIOS_OPTIONS);
    return data.results;
}

export function useGetMovies() {
    return useQuery({
        queryFn : fetchMovies,
        queryKey : ["movies"],
    })
}

export async function getMovieById(id : string){
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, AXIOS_OPTIONS)
    return data;
}

export function useGetMovieById(id:string){
    return useQuery({
        queryFn : () => getMovieById(id),
        queryKey : ["movie", id],
        enabled: !!id,
    });
}