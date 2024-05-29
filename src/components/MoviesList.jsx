import React, { useContext } from "react";
import { Img_URL } from "../utils/fetchApi";
import PreLoadingImage from "./PreLoadingImage";
import { MovieContext } from "../context/MovieContext";

const MoviesList = ({
  MoviesListArray,
  title,
  ClassName = "MoviesList",
  loadMoreRef = null,
  hasNextPage = false,
}) => {
  const { setSelectedMovie } = useContext(MovieContext);

  return (
    <div className={ClassName}>
      <h1>{title}</h1>
      <div>
        {MoviesListArray.pages
          ? MoviesListArray.pages.map((movie) =>
              movie.map(
                (item) =>
                  item.poster_path !== null && (
                    <div
                      onClick={() => setSelectedMovie(`${item.id}`)}
                      className="card"
                      key={item.id}
                    >
                      <PreLoadingImage
                        src={`${Img_URL}${item.poster_path}`}
                        alt={item.title}
                      />
                    </div>
                  )
              )
            )
          : MoviesListArray.map(
              (item) =>
                item.poster_path !== null && (
                  <div
                    onClick={() => setSelectedMovie(`${item.id}`)}
                    className="card"
                    key={item.id}
                  >
                    <PreLoadingImage
                      src={`${Img_URL}${item.poster_path}`}
                      alt={item.title}
                    />
                  </div>
                )
            )}
        {loadMoreRef !== null && hasNextPage && <div ref={loadMoreRef}></div>}
      </div>
    </div>
  );
};

export default MoviesList;
