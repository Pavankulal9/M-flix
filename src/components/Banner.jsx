import React, { useContext, useEffect, useState } from "react";
import { Img_URL } from "../utils/fetchApi";
import { MovieContext } from "../context/MovieContext";

const Banner = ({ Popular }) => {
  const { setSelectedMovie } = useContext(MovieContext);
  const [backgroundImage, setBackgroundImage] = useState(0);

  useEffect(() => {
    return () => {
      setSelectedMovie("");
    };
  }, [setSelectedMovie]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (backgroundImage >= 9) {
        setBackgroundImage(0);
      } else {
        setBackgroundImage((prev) => prev + 1);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [backgroundImage]);

  const nextBanner = () => {
    if (backgroundImage >= 9) {
      setBackgroundImage(0);
    } else {
      setBackgroundImage((prev) => prev + 1);
    }
  };

  const previousBanner = () => {
    if (backgroundImage <= 0) {
      setBackgroundImage(9);
    } else {
      setBackgroundImage((prev) => prev - 1);
    }
  };

  return (
    <div className="banner_box">
      <div className="banner">
        {Popular.map((movie, i) => (
          <img
            key={movie.id}
            className={i !== backgroundImage ? "hidden" : ""}
            src={`${Img_URL}${movie.backdrop_path}`}
            alt={"Background_image"}
          />
        ))}
        <div className="prev-banner" onClick={() => previousBanner()}></div>
        <div className="next-banner" onClick={() => nextBanner()}></div>
        <div className="movie-details">
          <h1>{Popular[backgroundImage]?.title}</h1>
          <p>{Popular[backgroundImage]?.overview}</p>
          <div>
            <button
              onClick={() => setSelectedMovie(`${Popular[backgroundImage].id}`)}
            >
              Know More
            </button>
          </div>
        </div>
        <div className="carosel">
          {Popular.map((movie, i) => (
            <div
              key={movie.id}
              className={i === backgroundImage ? "selected" : "unSelected"}
              onClick={() => setBackgroundImage(i)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
