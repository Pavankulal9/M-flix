import axios from 'axios';

const BASE_URL="https://api.themoviedb.org/3";
export const Img_URL = "https://image.tmdb.org/t/p/original/";

export const fetchMovie=async(category)=>{
    try {
        const {data}= await axios.get(`${BASE_URL}/movie/${category}?api_key=${process.env.REACT_APP_API_KEY}`);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchMovieDetails=async(id)=>{
    try {
        const response= await axios.get(`${BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`);
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchMovieList=async(category,page)=>{
    try {
        const {data}= await axios.get(`${BASE_URL}/movie/${category}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchSearch=async(searchTerm,page)=>{
    try {
        const {data}= await axios.get(`${BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}&language=india&page=${page}`);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};


export const fetchGenresList=async()=>{
    try {
        const {data}= await axios.get(`${BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchGenreList=async(genres,page)=>{
    try {
        const {data}= await axios.get(`${BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genres}&page=${page}`);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

