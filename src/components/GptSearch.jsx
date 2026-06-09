import GptSearchBar from "./GptSearchBar";
import { HeroImg } from "../utils/Image";

const GptSearch = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed -z-10 w-full h-full">
        <img className="w-full h-full object-cover" src={HeroImg} alt="" />
      </div>
      <GptSearchBar />
    </div>
  );
};

export default GptSearch;