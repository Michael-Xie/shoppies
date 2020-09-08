import React, { useState } from "react";
import "./App.css";
import useAppState from "./hooks/useAppState";
import SearchBar from "material-ui-search-bar";
import TitlebarGridList from "./components/TitleBarGridList";

function App() {
  const [results, nominated, search, nominate, DeNominate] = useAppState();
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
            draft={draft}
            title={
              results.length > 0
                ? "Search Results"
                : draft.length > 0
                ? "No movies found. Try again."
                : ""
            }
            handleClick={(value) => nominate(value)}
          />
        </div>
        <div className="nominations"></div>
      </div>
      <p>{JSON.stringify(nominated)}</p>
    </div>
  );
}

export default App;
