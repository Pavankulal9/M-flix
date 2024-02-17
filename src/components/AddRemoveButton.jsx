import React from 'react'

const AddRemoveButton = ({favourite,movie,addToFavouriteHandler,removeFromFavourite}) => {
    const checkMovie = favourite.filter((m)=> m.id === movie.id);
  return (
    checkMovie.length === 0?  
    <button key={movie.id} onClick={()=> addToFavouriteHandler(movie)}>Add as favourite</button>
    :
    checkMovie.map((movie)=>(
    <>
               <button key={movie.id} onClick={()=> removeFromFavourite(movie)}>Remove From favourite</button>
    </>
   )))
}

export default AddRemoveButton;
