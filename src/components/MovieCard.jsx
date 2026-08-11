import { IMG_CDN_URL } from "../utils/Image";
import { MESSAGES } from "../utils/message";

function MovieCard({ posterPath }) {
  return (
    <div className="min-w-[140px] sm:min-w-40 md:min-w-[180px] lg:min-w-[200px]">
      <img
        className="w-full h-[200px] sm:h-[230px] md:h-[260px] object-cover rounded"
        src={IMG_CDN_URL + posterPath}
        alt={MESSAGES.MOVIE_POSTER}
      />
    </div>
  );
}

export default MovieCard;
