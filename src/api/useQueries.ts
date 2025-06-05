import {useQuery} from "@tanstack/react-query";
import {fetchMovies, getMovieById} from "./apiFunc";


export function useGetMovies() {
    return useQuery({
        queryFn : fetchMovies,
        queryKey : ["movies"],
    })
}
export function useGetMovieById(id:string) {
    return useQuery({
        queryFn: () => getMovieById(id),
        queryKey: ["movie", id],
        enabled: !!id,
    });
}