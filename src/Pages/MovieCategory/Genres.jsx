import React, { useContext, useEffect, useState } from 'react'
import { fetchGenreList, fetchGenresList } from '../../utils/fetchApi';
import { useQuery } from '@tanstack/react-query';
import MoviesList from '../../components/MoviesList';
import Loading from '../Loading';
import Error from '../Error';
import { MovieContext } from '../../utils/context';
import Movie from '../../components/Movie';


const Genres = () => {
  const[genreId,setGenreId]=useState(28);
  const [page,setPage]=useState(1);
  const [GenresList,setGenresList]=useState([]);
  const {selectedMovie,setSelectedMovie}=useContext(MovieContext);
 
  useEffect(()=>{
    return ()=>{
      setSelectedMovie("");
    }
  },[setSelectedMovie]);

  const loadMoreHandle=()=>{
   setPage((prev)=> {
    return prev=prev + 1;
   });
   setGenresList((prev)=> [...prev,...GenreList]);
   refetch();
 }

 const selectGenreHandler =(e)=>{
  setGenreId(+e.target.value); 
  setGenresList(GenreList); 
  setPage(1);
 }

  const { isLoading,isError,error ,data: GenreList,refetch} = useQuery({
      queryKey: ["GenreList"],
      queryFn: () =>
        fetchGenreList(`${genreId}`,`${page}`).then((res) => {
          if(page===1){
            setGenresList(res.results);
            setPage(2);
          }
          return res.results;
        }),
    });

    const {data:genre}=useQuery({
      queryKey:['genre'],
      queryFn:()=> fetchGenresList().then((res)=>
      {
        return res.genres;
      }),
    });
   

    useEffect(()=>{
      refetch();
    },[refetch,page,genreId]);

    if (isLoading) {
      return (
       <Loading type={'text'}/>
      );
    } else if (isError) {
      return (
        <Error error={error.message}/>
      );
    } else
return (
  <section className='genre-body'>
    <div className="genre-container">
        <aside  className="genre-list">
        {
            genre?.map((item)=>(
              <button key={item.id} value={item.id} onClick={(e)=>{ selectGenreHandler(e)}}
              style={{background: genreId===item.id ?'red':'black'}}>{item.name}</button>
            ))
        } 
         </aside>
          <MoviesList title={"Select Genre"} MoviesListArray={GenresList} loadMoreHandle={loadMoreHandle}/>
    </div>
    {
          selectedMovie.length > 0 && 
         <Movie id={selectedMovie}/> 
    }
   </section>
)
}

export default Genres