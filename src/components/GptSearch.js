import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptSuggestions from "./GptSuggestions";
import { BG_IMG } from "../utils/Constants";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img src={BG_IMG} 
        alt="bgimage" />
      </div>
      <GptSearchBar />
      <GptSuggestions />
    </div>
  );
};

export default GptSearch;
