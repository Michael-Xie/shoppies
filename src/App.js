import React from "react";
import "./App.css";
import useAppState from "./hooks/useAppState";

function App() {
  const [results, search, nominate] = useAppState();

  return (
    <div className="App">
      <button onClick={() => search("snow white")}> Search </button>
      <p>{JSON.stringify(results)}</p>
    </div>
  );
}

export default App;
