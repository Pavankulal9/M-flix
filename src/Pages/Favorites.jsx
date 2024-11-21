import React, { useEffect, useState } from "react";
import { Img_URL } from "../utils/fetchApi";
import PreLoadingImage from "../components/PreLoadingImage";
import Movie from "../components/Movie";
import useSelectMovie from "../hooks/useSelectMovie";

const Favorites = () => {
  const [FavoritesMovies, setFavoritesMovies] = useState([]);
  const { selectedMovie, setSelectedMovie } = useSelectMovie();

  useEffect(() => {
    setFavoritesMovies(JSON.parse(localStorage.getItem("Favorites")));
  }, []);

  return (
    <div className={"movie-categorie"}>
      <div className="MoviesList">
        <h1>My Favorite List</h1>
        <div>
          {FavoritesMovies && FavoritesMovies.length > 0 ? (
            FavoritesMovies.map(
              (item, index) =>
                item.poster_path !== null && (
                  <div
                    onClick={() => setSelectedMovie(`${item.id}`)}
                    className="card"
                    key={index}
                  >
                    <PreLoadingImage
                      src={`${Img_URL}${item.poster_path}`}
                      alt={`${item.title} Poster`}
                    />
                  </div>
                )
            )
          ) : (
            <p>No Movie added!</p>
          )}
        </div>
        {selectedMovie.length > 0 && <Movie id={selectedMovie} />}
      </div>
    </div>
  );
};

export default Favorites;
