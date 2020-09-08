import React, { useState } from "react";
import useAppState from "./hooks/useAppState";
import SearchBar from "material-ui-search-bar";
import TitlebarGridList from "./components/TitleBarGridList";

function App() {
  const [results, nominated, error, search, nominate, DeNominate] = useAppState(
    JSON.parse(localStorage.getItem("nominations")) || []
  );
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
        {nominated.length >= 5 && (
          <div
            style={{ background: "yellow" }}
          >{`You have nominated the maximum of 5 movies!`}</div>
        )}
        <span className="search-results">
          <TitlebarGridList
            results={results}
            title={"Search Results"}
            handleClick={(value) => {
              if (nominated.length < 5) {
                nominate(value);
              }
            }}
          />
        </span>
        <span className="nominations">
          <TitlebarGridList
            results={nominated}
            error={error}
            title={"Nominations"}
            type={"nominations"}
            handleClick={(value) => DeNominate(value)}
          />
        </span>
      </div>
    </div>
  );
}

export default App;
