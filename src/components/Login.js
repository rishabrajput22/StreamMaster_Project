import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidation } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const fullnameRef = useRef(null);

  const handleButtonClick = () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const fullname = fullnameRef.current?.value;

    if (!email || !password || (!isSignInForm && !fullname)) {
      setErrorMessage("All fields are required");
      return;
    }

    const message = checkValidation(email, password);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullname,
          })
            .then(() => {
              const { uid, email, displayName } = user;
              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} - ${errorMessage}`);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(
            addUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            })
          );
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} - ${errorMessage}`);
        });
    }
  };

  const toggleSignUpForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="relative h-screen">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dd4dfce3-1a39-4b1a-8e19-b7242da17e68/86742114-c001-4800-a127-c9c89ca7bbe4/IN-en-20240527-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bgimage"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-3/12 p-12 bg-black bg-opacity-80 text-white rounded-lg"
          >
            <h1 className="font-bold text-3xl py-4">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && (
              <input
                type="text"
                placeholder="Full Name"
                className="p-4 my-4 w-full bg-gray-700"
                ref={fullnameRef}
              />
            )}
            <input
              type="text"
              placeholder="Email Address"
              className="p-4 my-4 w-full bg-gray-700"
              ref={emailRef}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-4 my-4 w-full bg-gray-700"
              ref={passwordRef}
            />
            <p className="text-red-600 font-bold text-lg py-2">
              {errorMessage}
            </p>
            <button
              className="p-4 my-6 bg-red-700 w-full rounded-lg"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p
              className="py-4 font-bold cursor-pointer"
              onClick={toggleSignUpForm}
            >
              {isSignInForm
                ? "New to Netflix? Sign Up Now"
                : "Already a User? Sign In Now"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
