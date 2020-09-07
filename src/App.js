import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import useSearch from "./hooks/useSearch";

function App() {
  const [results, search] = useSearch();
  const [nominated, setNominated] = useState([]);

  return (
    <div className="App">
      <button onClick={() => search("snow white")}> Search </button>
      <p>{JSON.stringify(results)}</p>
    </div>
  );
}

export default App;
