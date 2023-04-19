import { useEffect } from "react";
import useFetch from "./hooks/useFetch"; //Custom hook
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { getApiConfiguration } from "./store/homeSlice";

const App = () => {
  const dispatch = useDispatch();
  const { genres } = useSelector((state) => state.home);
  console.log("genres", genres);

  useEffect(() => {
    fetchApiConfig();
    // fetchPopularMovies();
  }, []);

  const fetchApiConfig = () => {
    fetchMoviesFromApi("/configuration").then((res) => {
      console.log("config", res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const fetchPopularMovies = () => {
    fetchMoviesFromApi("/movie/popular").then((res) => {
      console.log(res);
      dispatch(getGenres(res));
    });
  };

  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
