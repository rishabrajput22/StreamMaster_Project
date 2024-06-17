import { API_OPTIONS } from "../utils/Constants";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    dispatch(addUpcomingMovies(data.results));
  };

  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  }, []); // Add dispatch to the dependency array
};

export default useUpcomingMovies;
