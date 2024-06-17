import { API_OPTIONS } from "../utils/Constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(
    store => store.movies.nowPlayingMovies
  );

  const getNowPlayingMoviesList = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    dispatch(addNowPlayingMovies(data.results));
  };

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMoviesList();
  }, []); // Add dispatch to the dependency array
};

export default useNowPlayingMovies;
