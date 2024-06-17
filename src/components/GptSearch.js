import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptSuggestions from "./GptSuggestions";
import { BG_IMG } from "../utils/Constants";

const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img
          className="h-screen md:h-auto object-cover w-full"
          src={BG_IMG}
          alt="logo"
        />
      </div>
      <div className="">
        <GptSearchBar />
        <GptSuggestions />
      </div>
    </>
  );
};

export default GptSearch;
