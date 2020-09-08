import React, { useState } from "react";
import axios from "axios";

const RESULT_PER_PAGE = 10;
const BASE_URL = "http://www.omdbapi.com";

const useAppState = (resultsPerPage = RESULT_PER_PAGE) => {
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);
  const [nominated, setNominated] = useState([]);
  const [error, setError] = useState("");

  const search = async (term, type = "movie", page = 1) => {
    console.log("enters search");
    const searchResponse = await axios.get(
      `${BASE_URL}/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${term}&type=${type}&page=${page}`
    );
    console.log(searchResponse);
    if (searchResponse.data.Response === "True") {
      const rawResults = searchResponse.data.Search.map((result) => {
        if (nominated.findIndex((item) => item.imdbID === result.imdbID) >= 0) {
          return { ...result, selected: true };
        } else {
          return { ...result, selected: false };
        }
      });
      setCount(searchResponse.data.totalResults);
      setResults(rawResults);
      setError("");
    } else {
      setCount(0);
      setResults([]);
      setError(searchResponse.data.Error);
    }
  };

  const nominate = (id) => {
    const resultIndex = results.findIndex((result) => result.imdbID === id);
    const newResults = [...results];
    newResults[resultIndex].selected = true;
    setResults(newResults);
    setNominated((prev) => [...prev, newResults[resultIndex]]);
  };

  const deNominate = (id) => {
    setNominated((prev) => {
      const newNominated = [...prev];
      // find movie in nominated list
      const index = newNominated.findIndex((item) => item.imdbID === id);
      // remove movie from nominated list
      newNominated.splice(index, 1);
      return newNominated;
    });
    setResults((prev) => {
      const newResults = [...prev];
      // find movie id in results
      const index = newResults.findIndex((item) => item.imdbID === id);
      // update selected status for movie, if it exists
      if (index > 0) {
        newResults[index].selected = false;
        return newResults;
      }
      return prev;
    });
  };
  return [results, nominated, error, search, nominate, deNominate];
};

export default useAppState;
