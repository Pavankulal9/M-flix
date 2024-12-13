import React, { useEffect, useState } from "react";
import { Img_URL } from "../utils/fetchApi";
import useSelectMovie from "../hooks/useSelectMovie";
import Loading from "../Pages/Loading";

const Banner = ({ Popular }) => {
  const { setSelectedMovie } = useSelectMovie();
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage((prev) => (prev >= 9 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImage]);

  const handleKnowMore = (e) => {
    if (e.target.className === "know-more-button") {
      const movieId = e.target.dataset.id;
      setSelectedMovie(movieId);
    } else if (e.target.id === "carousel-button") {
      const movieIndex = Number(e.target.dataset.index);
      setBackgroundImage(movieIndex);
    }
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
      <div className="banner" onClick={(e) => handleKnowMore(e)}>
        {backgroundImage === null && (
          <>
            <div className="hide_banner_details">
              <img
                src={`${Img_URL}${Popular[0].backdrop_path}`}
                alt={"Background_image"}
                onLoad={handleLoadImage}
              />
            </div>
            <div className="show_banner_details">
              <Loading type="spinner" />
            </div>
          </>
        )}
        {backgroundImage >= 0 &&
          Popular.map((movie, i) => (
            <div
              className={
                i !== backgroundImage
                  ? "hide_banner_details"
                  : "show_banner_details"
              }
              key={movie.id}
            >
              <img
                src={`${Img_URL}${movie.backdrop_path}`}
                alt={"Background_image"}
              />

              <div className={"movie-details"}>
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
                <div>
                  <button className="know-more-button" data-id={movie.id}>
                    Know More
                  </button>
                </div>
              </div>
            </div>
          ))}
        <div className="carousel">
          {backgroundImage !== null && (
            <>
              <button className="prev-banner" onClick={previousBanner}>
                {" "}
                &#10092;
              </button>

              <div>
                {Popular.map((movie, i) => (
                  <div
                    key={movie.id}
                    data-index={i}
                    className={
                      i === backgroundImage ? "selected" : "unSelected"
                    }
                    id="carousel-button"
                  ></div>
                ))}
              </div>

              <button className="next-banner" onClick={nextBanner}>
                {" "}
                &#10093;
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
