import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { MESSAGES } from "../utils/message";

function MainContainer() {
  const movies = useSelector((state) => state.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <p className="text-white text-base sm:text-lg md:text-xl">{MESSAGES.LOADING}</p>
      </div>
    );
  }

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative h-screen w-full">
      <VideoBackground movieId={id} />
      <VideoTitle title={original_title} overview={overview} />
    </div>
  );
}

export default MainContainer;