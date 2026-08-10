import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import Netflix_Logo from "../../public/Netflix_Logo.png";
import { addGptToggle } from "../store/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLang } from "../store/languageSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.isGpt);
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  function handleGptSearchComp() {
    dispatch(addGptToggle());
  }
  function handleLanguageChange(e) {
    dispatch(changeLang(e.target.value));
  }

  return (
    <div className="absolute top-0 left-0 w-full px-4 sm:px-6 md:px-8 py-2 bg-linear-to-b from-black to-transparent z-50 flex justify-between items-center">
      <img className="w-28 sm:w-36 md:w-44" src={Netflix_Logo} alt="Netflix_Logo" />

      {user && (
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {showGptSearch && (
            <select
              className="bg-gray-800 text-white rounded-md py-1.5 sm:py-2 text-xs sm:text-sm px-1.5 sm:px-2"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.name} value={language.identifier}>
                  {language.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGptSearchComp}
            className="text-white rounded-lg bg-pink-700 text-xs sm:text-sm font-semibold px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 cursor-pointer hover:bg-pink-800 whitespace-nowrap"
          >
            {showGptSearch ? "Home Page" : "Gpt Search"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-semibold hover:bg-red-800 transition cursor-pointer whitespace-nowrap"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;