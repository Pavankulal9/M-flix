import React, { useEffect, useState } from "react";
import { Img_URL } from "../utils/fetchApi";
import PreLoadingImage from "../components/PreLoadingImage";
import Movie from "../components/Movie";
import useSelectMovie from "../hooks/useSelectMovie";

const WatchLater = () => {
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const { selectedMovie, setSelectedMovie } = useSelectMovie();

  useEffect(() => {
    setWatchLaterMovies(JSON.parse(localStorage.getItem("WatchLater")));
  }, []);

  return (
    <div className={"movie-categories"}>
      <div className="MoviesList">
        <h1>My Watch Later List</h1>
        <div className="card-box">
          {watchLaterMovies && watchLaterMovies.length > 0 ? (
            watchLaterMovies.map(
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
                ),
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

export default WatchLater;
