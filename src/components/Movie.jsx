import { useQuery } from "@tanstack/react-query";
import { Img_URL, fetchMovieDetails } from "../utils/fetchApi";
import { AiFillStar } from "react-icons/ai";
import PreLoadingImage from "./PreLoadingImage";
import AddRemoveButton from "./AddRemoveButton";
import useSelectMovie from "../hooks/useSelectMovie";
import withLoadingAndError from "../HOC/withLoadingAndError";

const Movie = ({ id }) => {
  const { setSelectedMovie } = useSelectMovie();

  const {
    isError,
    isLoading,
    data: Movie,
    error,
  } = useQuery({
    queryKey: ["Movie", `${id}`],
    queryFn: () => fetchMovieDetails(`${id}`),
  });

  const MovieCompWithHandler = withLoadingAndError(MovieComponent);

  return (
    <section className="movie" onClick={() => setSelectedMovie("")}>
      <MovieCompWithHandler
        isLoading={isLoading}
        isError={isError}
        errorMessage={error}
        Movie={Movie}
      />
    </section>
  );
};

const MovieComponent = ({ Movie }) => {
  return (
    <div
      className="movie-box"
      style={{
        backgroundImage:
          Movie.backdrop_path && Movie.backdrop_path !== null
            ? `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(${`${Img_URL}${Movie.backdrop_path}`})`
            : "rgb(0,0,0)",
      }}
    >
      <div key={Movie.id}>
        <div className="movie-poster">
          <PreLoadingImage
            src={`${Img_URL}${Movie.poster_path}`}
            alt={`${Movie.title} image`}
          />
        </div>
        <div className="movie-description">
          <div className="movie-title">
            <h1>{Movie?.title}</h1>
            <h4>{Movie?.tagline}</h4>
          </div>
          <p>{Movie?.overview}</p>
          <p>
            Ratings:{" "}
            <span style={{ color: Movie.vote_average > "7" ? "gold" : "red" }}>
              {Movie?.vote_average} <AiFillStar />
            </span>
          </p>
          <div className="movie-details">
            <div>
              <p>
                Release Date: <strong>{Movie.release_date}</strong>
              </p>
              <p>
                Status:{" "}
                <span
                  style={{
                    color: Movie.status === "Released" ? "greenyellow" : "red",
                  }}
                >
                  {" "}
                  {Movie?.status}
                </span>
              </p>
            </div>
            <div className="button">
              <AddRemoveButton movie={Movie} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
