import { useEffect } from "react";
import { fetchMoviesFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/pageNotFound";

const App = () => {
  const dispatch = useDispatch();
  const { genres } = useSelector((state) => state.home);
  console.log("genres", genres);

  useEffect(() => {
    fetchMoviesFromApi("/movie/popular").then((res) => {
      console.log(res);
      dispatch(getGenres(res));
    });
  }, []);

  return (
    <div className="App">
      App
      <h1>Movies App</h1>
      <h3>{genres?.total_pages}</h3>
    </div>
  );
};

export default App;
