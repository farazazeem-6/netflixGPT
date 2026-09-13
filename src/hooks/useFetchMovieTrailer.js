import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../store/moviesSlice";
import { API_HEADER } from "../utils/apiHeader";

function useFetchMovieTrailer(movieId) {
  const dispatch = useDispatch();
  async function movieTrailer() {
    const data = await fetch(`${API_HEADER}${movieId}/videos?`, API_OPTIONS);
    const json = await data.json();
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  }
  useEffect(() => {
    movieTrailer();
  });
  return null;
}

export default useFetchMovieTrailer;
