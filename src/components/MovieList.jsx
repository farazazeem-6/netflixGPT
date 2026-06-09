import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="pt-6">
      <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
        {title}
      </h1>

      <div className="flex overflow-x-auto pt-6 hide-scrollbar">
        <div className="flex gap-3 sm:gap-4">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
