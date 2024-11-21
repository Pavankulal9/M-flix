import axios from 'axios';

const Axios= axios.create({
    baseURL:"https://api.themoviedb.org/3",
}); 

export const Img_URL = "https://image.tmdb.org/t/p/original/";

export const fetchMovie=async(category)=>{
    try {
        const {data}= await Axios.get(`/movie/${category}?api_key=${process.env.REACT_APP_API_KEY}`);
        return data.results;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchMovieDetails=async(id)=>{
    try {
        const {data}= await Axios.get(`/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchMovieList=async({category,pageParam})=>{
    try {
        const {data}= await Axios.get(`/movie/${category}?api_key=${process.env.REACT_APP_API_KEY}&page=${pageParam}`);
        return data.results;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchSearch=async(searchTerm,page)=>{
    try {
        const abort = new AbortController();
         if(abort.signal){
            abort.abort();
         }
        const {data}= await Axios.get(`/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}&page=${page}`,{
            signal: abort.signal,
        });
        return data.results;
    } catch (error) {
        console.log(error.message);
    }
};


export const fetchGenresList=async()=>{
    try {
        const {data}= await Axios.get(`/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`);
        return data.genres;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchGenres=async({genreId,pageParam})=>{
    try {
        const {data}= await Axios.get(`/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genreId}&page=${pageParam}`);
        return data.results;
    } catch (error) {
        console.log(error.message);
    }
};

