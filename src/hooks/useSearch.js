import React, { useState } from "react";
import axios from "axios";

const RESULT_PER_PAGE = 10;
const BASE_URL = "http://www.omdbapi.com";

const useSearch = (resultsPerPage = RESULT_PER_PAGE) => {
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);
  const search = async (term, type = "movie") => {
    const searchResponse = await axios.get(
      `${BASE_URL}/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${term}&type=${type}&page=1`
    );
    const rawResults = searchResponse.data.Search;
    setCount(searchResponse.data.totalResults);
    setResults(rawResults);
  };

  return [results, search];
};

export default useSearch;
