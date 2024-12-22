import { fetchMovieList } from "../../utils/fetchApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import MoviesList from "../../components/MoviesList";
import Movie from "../../components/Movie";
import withLoadingAndError from "../../HOC/withLoadingAndError";
import useSelectMovie from "../../hooks/useSelectMovie";
import useFetchInView from "../../hooks/useFetchInView";

const TopRated = () => {
  const {
    data: TopRated,
    status,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["TopRatedList"],
    queryFn: ({ pageParam }) =>
      fetchMovieList({ category: "top_rated", pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length ? allPage.length + 1 : undefined;
      return nextPage;
    },
  });

  const { selectedMovie } = useSelectMovie();
  const { ref: loadMoreRef } = useFetchInView(fetchNextPage);

  const isLoading = status === "pending";
  const isError = status === "error";

  return (
    <TopRatedComponentWithHandler
      isLoading={isLoading}
      isError={isError}
      selectedMovie={selectedMovie}
      TopRated={TopRated}
      loadMoreRef={loadMoreRef}
      hasNextPage={hasNextPage}
    />
  );
};

const TopRatedComponent = ({
  selectedMovie,
  TopRated,
  loadMoreRef,
  hasNextPage,
}) => {
  return (
    <div className="movie-categories">
      {selectedMovie.length > 0 && <Movie id={selectedMovie} />}
      <MoviesList
        MoviesListArray={TopRated}
        loadMoreRef={loadMoreRef}
        title={"Top-Rated Movies"}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

const TopRatedComponentWithHandler = withLoadingAndError(TopRatedComponent);

export default TopRated;
