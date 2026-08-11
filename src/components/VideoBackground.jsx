import { useSelector } from "react-redux";
import useFetchMovieTrailer from "../hooks/useFetchMovieTrailer";
import { MESSAGES } from "../utils/message";

function VideoBackground({ movieId }) {
  const trailerKey = useSelector((state) => state.movies?.trailerVideo);
  useFetchMovieTrailer(movieId);

  if (!trailerKey) return null;

  return (
    <div className="w-full h-screen overflow-hidden">
      <iframe
        className="w-full h-full scale-125 sm:scale-150"
        src={`https://www.youtube.com/embed/${trailerKey.key}?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0&loop=1&playlist=${trailerKey.key}&iv_load_policy=3&disablekb=1&fs=0`}
        title={MESSAGES.YOUTUBE_VIDEO_PLAYER}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        frameBorder="0"
      ></iframe>
    </div>
  );
}
export default VideoBackground;
