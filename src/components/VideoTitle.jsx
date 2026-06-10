function VideoTitle({ title, overview }) {
  return (
    <div className="w-full h-screen absolute top-0 left-0 flex flex-col justify-center px-4 sm:px-8 md:px-12 text-white bg-linear-to-r from-black via-black/50 to-transparent">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 mt-20 sm:mt-28 md:mt-32">
        {title}
      </h1>
      <p className="text-sm sm:text-base md:text-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mb-4 sm:mb-5 md:mb-6 line-clamp-3 sm:line-clamp-none">
        {overview}
      </p>
      <div className="flex gap-2 sm:gap-3 md:gap-4">
        <button className="bg-white py-1.5 sm:py-2 px-4 sm:px-5 md:px-6 text-black text-sm sm:text-base font-semibold cursor-pointer rounded hover:bg-opacity-80 flex items-center gap-1 sm:gap-2">
          <i className="ri-play-fill text-lg sm:text-xl"></i>
          Play
        </button>
        <button className="bg-gray-600 bg-opacity-70 py-1.5 sm:py-2 px-4 sm:px-5 md:px-6 text-white text-sm sm:text-base font-semibold cursor-pointer rounded hover:bg-opacity-50 flex items-center gap-1 sm:gap-2">
          <i className="ri-information-line text-lg sm:text-xl"></i>
          More Info About It
        </button>
      </div>
    </div>
  );
}

export default VideoTitle;
