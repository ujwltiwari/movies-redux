import { useState } from "react";
import { fetchMoviesFromApi } from "../utils/api";
import { useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);

    fetchMoviesFromApi(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something Went Wrong....");
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
