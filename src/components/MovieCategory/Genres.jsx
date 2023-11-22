import React, { useEffect, useState } from 'react'
import { Img_URL, fetchGenreList, fetchGenresList } from '../../utils/fetchApi';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import  '../MovieCategory/genres.scss'

const Genres = () => {
  const[genreId,setGenreId]=useState('28');
  const [page,setPage]=useState(1);
  const [GenresList,setGenresList]=useState([])
 
  const loadMoreHandle=()=>{
   setPage((prev)=> {
    return prev=prev + 1;
   });
   setGenresList((prev)=> [...prev,...GenreList]);
   refetch();
 }

 const selectGenreHandler =(e)=>{
  setGenreId(e.target.value); 
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
          console.log(res.results);
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

  console.log(GenreList);
    if (isLoading) {
      return (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      );
    } else if (isError) {
      return (
        <div className="error">
          <p>{error.message}</p>
        </div>
      );
    } else
return (
  <section className='genre-body'>
    <h1>Select your genre</h1>
  <div className="genre-container">
        <aside  className="genre-list">
        {
            genre?.map((item)=>(
              <button key={item.id} value={item.id} onClick={(e)=>{ selectGenreHandler(e)}}
              style={{background: genreId==item.id ?'red':'black'}}>{item.name}</button>
            ))
          } 
          </aside>
        <div>
        {GenresList?.map((item,index) => (
           item.poster_path!==null &&
            <Link to={`/movie/${item.id}`} className="card" key={index}>
              <img src={`${Img_URL}${item.poster_path}`} alt="img" />
            </Link>
        ))}
        <div>
        </div>
        </div>
      </div>
        <button onClick={loadMoreHandle}>More</button>
      </section>
)
}

export default Genres