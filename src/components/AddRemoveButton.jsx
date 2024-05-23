import React from 'react'

const AddRemoveButton = ({favourite,movie,addToFavouriteHandler,removeFromFavourite}) => {
    const checkMovie = favourite.find((m)=> m.id === movie.id);
  return (
    checkMovie?  
    <button key={movie.id} onClick={(e)=> removeFromFavourite(e,movie)}>Remove From favourite</button>
    :
    <button key={movie.id} onClick={(e)=> addToFavouriteHandler(e,movie)}>Add as favourite</button>
   )
}

export default AddRemoveButton;
