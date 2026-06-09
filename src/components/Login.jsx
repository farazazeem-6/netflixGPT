import Header from "./Header";
import {
  facebookImg,
  githubImg,
  googleImg,
  HeroImg,
  twitterImg,
} from "../utils/Image";
import { useRef, useState } from "react";
import { emailRegex, validateSignIn, validateSignUp } from "../utils/Validations";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import {
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
  signInWithTwitter,
} from "../utils/socialAuth";
import { addUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [isResponseError, setIsResponseError] = useState(null);

  // use ref hooks
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const dispatch = useDispatch();

  // toggle beween signup and sign in form function
  function toggle() {
    setIsSignIn(!isSignIn);
    setIsError(null);
  }
  // Clear error for specific field when user types
  function handleInputChange(field) {
    if ((isError && isError.field === field) || isResponseError) {
      setIsError(null);
      setIsResponseError(null);
    }
  }

  // login function which check validations also
  function handleButtonClick() {
    const validationResult = isSignIn
      ? validateSignIn(email.current.value, password.current.value)
      : validateSignUp(
          email.current.value,
          password.current.value,
          name.current.value
        );
    setIsError(validationResult);
    if (validationResult) return;
    setIsApiLoading(true);
    if (isSignIn) {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorMessage = error.message;
          setIsResponseError(errorMessage);
          // console.log("errorCode:", errorCode, "errorMessage:", errorMessage);
        })
        .finally(() => {
          setIsApiLoading(false);
        });
    } else {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, displayName, email } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, firstName: displayName, email: email })
              );
            })
            .catch((error) => {
              setIsResponseError(error.message);
            });

        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          setIsResponseError(errorMessage);
        })
        .finally(() => {
          setIsApiLoading(false);
        });
    }
  }

  // Social Login Handler (Reusable for all providers)
  async function handleSocialLogin(provider) {
    setIsApiLoading(true);
    setIsResponseError(null);

    let result;
    switch (provider) {
      case "google":
        result = await signInWithGoogle();
        break;
      case "facebook":
        result = await signInWithFacebook();
        break;
      case "github":
        result = await signInWithGithub();
        break;
      case "twitter":
        result = await signInWithTwitter();
        break;
      default:
        return;
    }

    if (result.success) {
      // console.log(`${provider} login successful:`, result.user);
    } else {
      setIsResponseError(result.error);
    }

    setIsApiLoading(false);
  }
  // reset or forget password api:

  function resetPassword() {
    if (!email.current.value || !emailRegex.test(email.current.value)) {
      setIsResponseError("Empty or Invalid email");
    } else {
      sendPasswordResetEmail(auth, email.current.value)
        .then(() => {
          setIsResponseError(
            "Reset Password link have been sent to your email."
          );
        })
        .catch((error) => {
          // console.error("Error:", error);
          setIsResponseError(error);
        });
    }
  }
  return (
    <div
      style={{
        background: `url(${HeroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full min-h-screen flex flex-col items-center justify-center"
    >
      {/* //a dim black background wrapper div  */}
      <div className="fixed z-10 bg-black/50 w-full inset-0"></div>
      {/* called header component here */}
      <div className="absolute top-0 left-8 sm:left-20 md:left-40 w-[150px] sm:w-[180px] md:w-[200px] z-20">
        <Header />
      </div>

      <div className="bg-black/70 flex items-center flex-col justify-center z-40 py-8 sm:py-10 px-6 sm:px-10 md:px-15 mt-20 sm:mt-24 md:mt-28 w-full max-w-[90%] sm:max-w-[400px] md:max-w-[450px] mx-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-3 sm:gap-4 w-full"
        >
          <h1 className="text-[28px] sm:text-[30px] md:text-[32px] font-bold text-white text-left">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>

          {/* name input for sign up form  */}
          {!isSignIn && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              onChange={() => handleInputChange("name")}
              className="border border-[rgb(110,98,98)] mt-2 px-3 sm:px-4 py-3 sm:py-4 rounded bg-black/40 text-white placeholder-gray-400 w-full text-sm sm:text-base"
            />
          )}
          {isError?.field === "name" && (
            <p className="text-red-500 text-[12px] flex items-center">
              <i className="ri-close-circle-line px-1 text-lg sm:text-xl"></i>
              {isError.message}.
            </p>
          )}

          <input
            ref={email}
            type="text"
            placeholder="Enter email"
            onChange={() => handleInputChange("email")}
            className="border border-[rgb(110,98,98)] mt-2 px-3 sm:px-4 py-3 sm:py-4 rounded bg-black/40 text-white placeholder-gray-400 w-full text-sm sm:text-base"
          />
          {isError?.field === "email" && (
            <p className="text-red-500 text-[12px] flex items-center">
              <i className="ri-close-circle-line px-1 text-lg sm:text-xl"></i>
              {isError.message}
            </p>
          )}

          <input
            ref={password}
            type="password"
            placeholder="Password"
            onChange={() => handleInputChange("password")}
            className="border border-[rgb(110,98,98)] mt-2 px-3 sm:px-4 py-3 sm:py-4 rounded bg-black/40 text-white placeholder-gray-400 w-full text-sm sm:text-base"
          />
          {isError?.field === "password" && (
            <p className="text-red-500 text-[12px] flex ">
              <i className="ri-close-circle-line px-1 text-lg sm:text-xl"></i>
              {isError.message}
            </p>
          )}

          {isSignIn && (
            <p
              onClick={resetPassword}
              className="cursor-pointer underline text-white font-bold text-right text-[13px] hover:text-[#c7b4b4]"
            >
              Forgot password?
            </p>
          )}

          <button
            onClick={handleButtonClick}
            disabled={isApiLoading}
            className="text-white cursor-pointer w-full bg-red-600 py-2 px-8 sm:px-12 font-bold rounded text-[15px] sm:text-[16px] hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-red-600"
          >
            {isSignIn
              ? isApiLoading
                ? "Signing In..."
                : "Sign In"
              : isApiLoading
              ? "Signing Up..."
              : "Sign Up"}
          </button>
          {isResponseError && (
            <p className="text-red-500 text-[12px] flex items-center">
              <i className="ri-close-circle-line px-1 text-lg sm:text-xl"></i>
              {isResponseError}
            </p>
          )}
        </form>
        <p className="text-[#bbb] text-center mt-3 sm:mt-4 text-sm">OR</p>
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full">
          <div
            onClick={() => handleSocialLogin("google")}
            className="bg-black/70 py-2 px-3 sm:px-4 md:px-6 rounded-xl cursor-pointer my-2 hover:bg-black/90 hover:-translate-y-1 transition duration-500 flex justify-center"
            title="Continue with Google"
          >
            <img
              className="w-[26px] sm:w-7 md:w-[30px]"
              src={googleImg}
              alt=""
            />
          </div>
          <div
            onClick={() => handleSocialLogin("facebook")}
            className="bg-black/70 py-2 px-3 sm:px-4 md:px-6 rounded-xl cursor-pointer my-2 hover:bg-black/90 hover:-translate-y-1 transition duration-500 flex justify-center"
            title="Continue with Facebook"
          >
            <img
              className="w-[26px] sm:w-7 md:w-[30px]"
              src={facebookImg}
              alt=""
            />
          </div>
          <div
            onClick={() => handleSocialLogin("github")}
            className="bg-black/70 py-2 px-3 sm:px-4 md:px-6 rounded-xl cursor-pointer my-2 hover:bg-black/90 hover:-translate-y-1 transition duration-500 flex justify-center"
            title="Continue with Github"
          >
            <img
              className="w-[26px] sm:w-7 md:w-[30px]"
              src={githubImg}
              alt=""
            />
          </div>
          <div
            onClick={() => handleSocialLogin("twitter")}
            className="bg-black/70 py-2 px-3 sm:px-4 md:px-6 rounded-xl cursor-pointer my-2 hover:bg-black/90 hover:-translate-y-1 transition duration-500 flex justify-center"
            title="Continue with Twitter"
          >
            <img
              className="w-[26px] sm:w-7 md:w-[30px]"
              src={twitterImg}
              alt=""
            />
          </div>
        </div>
        <div className="flex gap-1 mt-2 text-sm flex-wrap justify-center">
          <p className="text-[#c7b4b4]">
            {isSignIn ? "New to Netflix?" : "Already have an account?"}
          </p>
          <p
            onClick={() => toggle()}
            className="text-white font-bold cursor-pointer hover:text-[#c7b4b4] hover:underline"
          >
            {isSignIn ? "Sign Up." : "Sign In now."}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
