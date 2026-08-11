import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import { MESSAGES } from "../utils/message";

function SecondaryContainer() {
  const movies = useSelector((state) => state.movies);
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="-mt-22 relative z-50 pl-4 sm:pl-8 md:pl-12 pr-4">
          <MovieList title={MESSAGES.NOW_PLAYING} movies={movies.nowPlayingMovies} />
          <MovieList title={MESSAGES.UP_COMING} movies={movies.upComingMovies} />
          <MovieList title={MESSAGES.POPULAR} movies={movies.popularMovies} />
          <MovieList title={MESSAGES.TOP_RATED} movies={movies.topRatedMovies} />
          <MovieList title={MESSAGES.HORROR} movies={movies.nowPlayingMovies} />
        </div>
      </div>
    )
  );
}

export default SecondaryContainer;