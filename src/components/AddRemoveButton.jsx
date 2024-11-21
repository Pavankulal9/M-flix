import React, { useEffect, useState } from "react";

const AddRemoveButton = ({ movie }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const isFavoriteMovie = JSON.parse(localStorage.getItem("Favorites"));
    if (!isFavoriteMovie) {
      return setFavorites([]);
    } else {
      setFavorites(isFavoriteMovie);
    }
  }, []);

  const addToFavoritesHandler = (e, movie) => {
    e.stopPropagation();
    const Movie = [movie];
    if (!favorites) {
      setFavorites(Movie);
      localStorage.setItem("Favorites", JSON.stringify(Movie));
    } else {
      const addNewFavorites = [...favorites, movie];
      setFavorites(addNewFavorites);
      localStorage.setItem("Favorites", JSON.stringify(addNewFavorites));
    }
  };

  const removeFromFavorites = (e, movie) => {
    e.stopPropagation();
    const newList = favorites.filter((m) => m.id !== movie.id);
    localStorage.setItem("Favorites", JSON.stringify(newList));
    setFavorites(newList);
  };

  const checkMovie = favorites.find((m) => m.id === movie.id);

  return checkMovie ? (
    <button key={movie.id} onClick={(e) => removeFromFavorites(e, movie)}>
      Remove From favorite
    </button>
  ) : (
    <button key={movie.id} onClick={(e) => addToFavoritesHandler(e, movie)}>
      Add as favorite
    </button>
  );
};

export default AddRemoveButton;
