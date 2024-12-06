import axios from 'axios';

const Axios= axios.create({
    baseURL: process.env.REACT_APP_URL,
}); 

export const Img_URL = "https://image.tmdb.org/t/p/original/";

export const fetchMovie=async(category)=>{
    try {
        const {data}= await Axios.get(`/movie/category/${category}`);
        return data.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchMovieDetails=async(id)=>{
    try {
        const {data}= await Axios.get(`/movie/${id}`);
        return data.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchMovieList=async({category,pageParam})=>{
    try {
        const {data}= await Axios.get(`/movie/category/${category}?page=${pageParam}`);
        return data.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchSearch=async(searchTerm,page)=>{
    try {
        // const abort = new AbortController();
        //  if(abort.signal){
        //     abort.abort();
        //  }

        const {data} = await Axios.get(`/movie/search/${searchTerm}?page=${page}`);

        return data.data;
    } catch (error) {
        console.error(error.message);
        throw new Error("Failed to fetch search results");
    }
};


export const fetchGenresList=async()=>{
    try {
        const {data}= await Axios.get(`/movie/genre/list`);
        return data.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const fetchGenres=async({genreId,pageParam})=>{
    try {
        const {data}= await Axios.get(`/movie/discover/${genreId}?page=${pageParam}`);
        return data.data;
    } catch (error) {
        console.log(error.message);
    }
};

