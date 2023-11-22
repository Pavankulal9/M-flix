import axios from 'axios';


const BASE_URL="https://api.themoviedb.org/3";
export const Img_URL = "https://image.tmdb.org/t/p/original/";

export const fetchMovie=async(category)=>{
    const {data}= await axios.get(`${BASE_URL}/movie/${category}?api_key=${process.env.REACT_APP_API_KEY}`);
    return data;
};

export const fetchMovieDetails=async(id)=>{
    const response= await axios.get(`${BASE_URL}/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`);
    return response;
};

export const fetchMovieList=async(category,page)=>{
    const {data}= await axios.get(`${BASE_URL}/movie/${category}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
    return data;
};

export const fetchSearch=async(searchTerm,page)=>{
    const {data}= await axios.get(`${BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}&language=india&page=${page}`);
    return data;
};


export const fetchGenresList=async()=>{
    const {data}= await axios.get(`${BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`);
    return data;
};

export const fetchGenreList=async(genres,page)=>{
    const {data}= await axios.get(`${BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genres}&page=${page}`);
    return data;
};

