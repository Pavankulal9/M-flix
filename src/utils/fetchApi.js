import axios from 'axios';

const Axios= axios.create({
    baseURL:"https://api.themoviedb.org/3"
}); 
export const Img_URL = "https://image.tmdb.org/t/p/original/";

export const fetchMovie=async(category)=>{
    try {
        const {data}= await Axios.get(`/movie/${category}?api_key=${process.env.REACT_APP_API_KEY}`);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchMovieDetails=async(id)=>{
    try {
        const response= await Axios.get(`/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`);
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchMovieList=async(category,page)=>{
    try {
        const {data}= await Axios.get(`/movie/${category}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchSearch=async(searchTerm,page,abortContorller)=>{
    abortContorller.currnet?.abort();
    abortContorller.current = new AbortController();
    try {
        const {data}= await Axios.get(`/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}&language=india&page=${page}`,{signal: abortContorller.current?.signal});
        return data;
    } catch (error) {
        console.log(error.message);
    }
};


export const fetchGenresList=async()=>{
    try {
        const {data}= await Axios.get(`/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchGenreList=async(genres,page)=>{
    try {
        const {data}= await Axios.get(`/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genres}&page=${page}`);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

