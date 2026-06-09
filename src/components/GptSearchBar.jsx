import React, { useRef } from "react";
import { lang } from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const languageKey = useSelector((store) => store.language.lang);
  const inputRef = useRef(null);

  return (
    <div className="w-full px-4 absolute left-0 flex justify-center top-[10%] sm:top-20 md:top-24 lg:top-32">
      <form
        className="bg-black w-full sm:w-3/4 md:w-2/3 lg:w-1/2 grid grid-cols-12 gap-2 rounded-2xl py-6 px-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder={lang[languageKey].placerHolderText}
          className="col-span-12 sm:col-span-9 py-2 px-4 rounded-lg text-black bg-white"
        />
        <button className="col-span-12 sm:col-span-3 bg-red-700 text-white text-sm font-semibold rounded-lg py-2 px-4 cursor-pointer hover:bg-red-800">
          {lang[languageKey].searchText}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
