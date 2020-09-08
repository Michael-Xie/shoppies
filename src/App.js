import React, { useState } from "react";
import "./App.css";
import useAppState from "./hooks/useAppState";
import SearchBar from "material-ui-search-bar";
import TitlebarGridList from "./components/TitleBarGridList";

function App() {
  const [
    results,
    nominated,
    error,
    search,
    nominate,
    DeNominate,
  ] = useAppState();
  const [draft, setDraft] = useState("");
  return (
    <div className="App">
      <SearchBar
        value={draft}
        onChange={(newValue) => setDraft(newValue)}
        onRequestSearch={() => search(draft)}
        onCancelSearch={() => setDraft("")}
      />
      <div className="details-container">
        <div className="search-results">
          <TitlebarGridList
            results={results}
            title={"Search Results"}
            handleClick={(value) => nominate(value)}
          />
        </div>
        <div className="nominations">
          <TitlebarGridList
            results={nominated}
            error={error}
            title={"Nominations"}
            type={"nominations"}
            handleClick={(value) => DeNominate(value)}
          />
        </div>
      </div>
      {/* <p>{JSON.stringify(nominated)}</p> */}
    </div>
  );
}

export default App;
