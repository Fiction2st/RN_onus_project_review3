import React, {useEffect, useState} from 'react';
import {useRoute} from "@react-navigation/native";
import axios from "axios";
import {ActivityIndicator, SafeAreaView, View, Text} from "react-native";
import {useGetMovieById, useGetMovies} from "../../api/apiFunc";

const MovieDetail = () => {
    const route = useRoute();
    const {id} = route.params; // id 라는 변수에 route.params 를 저장

    const {data : movieDetail, isLoading, isError, error} = useGetMovieById(id);
    // const [isLoading, setIsLoading] = React.useState(false);
    // const [movieDetail, setMovieDetail] = useState(null);
    //
    // useEffect(()=>{
    //     fetchMovieDetails();
    // }, [])
    //
    // const fetchMovieDetails = async () => {
    //     console.log('@@@@@@@@id',id);
    //     try {
    //         setIsLoading(!isLoading);
    //         const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    //         const options = {
    //             method : 'GET',
    //             headers: {
    //                 accept : 'application/json',
    //                 Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODcwYjcyMGNmNmFmNTViZjI2ZTk5YjA0NjBkMjljMyIsIm5iZiI6MTc0NzM1OTAxMS44NDUsInN1YiI6IjY4MjY5NTIzZThhYjJlYzM4YjRiNThlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X5z6bQ_4d9d9MASFzAregzMaYJQWtmf2nnXlgZvz9NU'
    //             },
    //         };
    //         const response = await axios(url, options);
    //         setMovieDetail(response?.data); // response? : response 에 값이 있을 때만 data를 담는다.
    //         setIsLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //         setIsLoading(!isLoading);
    //     }
    // }

    if(isLoading){
        return <ActivityIndicator size = "large" color = "#0000ff"/>
    }

    if(!movieDetail){
        return <Text>영화 상세정보 없음!</Text>
    }

    return (
        <SafeAreaView>
            <View>
                <Text>{movieDetail.title}</Text>
                <Text>관람객 평점 : {movieDetail.vote_average}점</Text>
                <Text>투표수 : {movieDetail.vote_count}</Text>
                <Text>요약 : {movieDetail.overview}</Text>
            </View>
        </SafeAreaView>
    );
};

export default MovieDetail;