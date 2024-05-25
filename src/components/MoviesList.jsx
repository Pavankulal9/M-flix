import React, { useContext} from 'react';
import {Img_URL} from '../utils/fetchApi';
import PreLoadingImage from './PreLoadingImage';
import { MovieContext } from '../utils/context';


const MoviesList = ({MoviesListArray,title,ClassName="MoviesList",loadMoreRef=null}) => {

  const {setSelectedMovie}=useContext(MovieContext);
 

  return (
    <div className={ClassName}>
    <h1>{title}</h1>
    <div>
    {MoviesListArray?.map((item,index) => (
       item.poster_path!==null &&
        <div onClick={()=> setSelectedMovie(`${item.id}`)} className="card" key={index}>
          <PreLoadingImage src={`${Img_URL}${item.poster_path}`} alt={item.title}/>
        </div>
    ))}
    </div>
    {
     loadMoreRef!==null &&
     <div ref={loadMoreRef}></div>
    }
  </div>
  )
}

export default MoviesList
