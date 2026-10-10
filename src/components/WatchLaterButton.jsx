import React, { useEffect, useState } from "react";

const WatchLaterButton = ({ movie }) => {
  const [WatchLater, setWatchLater] = useState([]);

  useEffect(() => {
    const isWatchLaterMovie = JSON.parse(localStorage.getItem("WatchLater"));
    if (!isWatchLaterMovie) {
      return setWatchLater([]);
    } else {
      setWatchLater(isWatchLaterMovie);
    }
  }, []);

  const addToWatchLaterHandler = (e, movie) => {
    e.stopPropagation();
    const Movie = [movie];
    if (!WatchLater) {
      setWatchLater(Movie);
      localStorage.setItem("WatchLater", JSON.stringify(Movie));
    } else {
      const addNewWatchLater = [...WatchLater, movie];
      setWatchLater(addNewWatchLater);
      localStorage.setItem("WatchLater", JSON.stringify(addNewWatchLater));
    }
  };

  const removeFromWatchLater = (e, movie) => {
    e.stopPropagation();
    const newList = WatchLater.filter((m) => m.id !== movie.id);
    localStorage.setItem("WatchLater", JSON.stringify(newList));
    setWatchLater(newList);
  };

  const checkMovie = WatchLater.find((m) => m.id === movie.id);

  return checkMovie ? (
    <button key={movie.id} onClick={(e) => removeFromWatchLater(e, movie)}>
      Remove From Watch Later
    </button>
  ) : (
    <button key={movie.id} onClick={(e) => addToWatchLaterHandler(e, movie)}>
      Add as Watch Later
    </button>
  );
};

export default WatchLaterButton;
