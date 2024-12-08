import React, { useEffect, useState } from "react";
import { Img_URL } from "../utils/fetchApi";
import useSelectMovie from "../hooks/useSelectMovie";
import Loading from "../Pages/Loading";

const Banner = ({ Popular }) => {
  const { setSelectedMovie } = useSelectMovie();
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (backgroundImage >= 9) {
        setBackgroundImage(0);
      } else {
        setBackgroundImage((prev) => prev + 1);
      }
    }, 5000);

    if (backgroundImage === null) {
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [backgroundImage]);

  const handleKnowMore = (id) => {
    setSelectedMovie(`${id}`);
  };

  const handleLoadImage = () => {
    setBackgroundImage(0);
  };

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
        {backgroundImage === null && (
          <>
            <img
              className={"hidden"}
              src={`${Img_URL}${Popular[0].backdrop_path}`}
              alt={"Background_image"}
              onLoad={handleLoadImage}
            />
            <Loading type="spinner" />
          </>
        )}
        {backgroundImage >= 0 &&
          Popular.map((movie, i) => (
            <>
              <img
                className={i !== backgroundImage ? "hidden" : ""}
                src={`${Img_URL}${movie.backdrop_path}`}
                alt={"Background_image"}
              />
              <div
                className="prev-banner"
                onClick={() => previousBanner()}
              ></div>
              <div className="next-banner" onClick={() => nextBanner()}></div>
              <div
                className={
                  i !== backgroundImage
                    ? "hide-movie-details"
                    : "show-movie-details"
                }
              >
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
                <div>
                  <button onClick={() => handleKnowMore(movie.id)}>
                    Know More
                  </button>
                </div>
              </div>
            </>
          ))}
        <div className="carousel">
          {Popular.map((movie, i) => (
            <div
              key={movie.id}
              className={i === backgroundImage ? "selected" : "unSelected"}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
