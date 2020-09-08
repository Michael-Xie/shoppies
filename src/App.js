import React, { useState } from "react";
import "./App.css";
import useAppState from "./hooks/useAppState";
import SearchBar from "material-ui-search-bar";
import TitlebarGridList from "./components/TitleBarGridList";
import Banner from "./components/Banner";

function App() {
  const [results, nominated, error, search, nominate, DeNominate] = useAppState(
    JSON.parse(localStorage.getItem("nominations")) || []
  );
  const [draft, setDraft] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="App">
      <Banner open={open} handleClose={handleClose} />
      <SearchBar
        value={draft}
        onChange={(newValue) => setDraft(newValue)}
        onRequestSearch={() => search(draft)}
        onCancelSearch={() => setDraft("")}
      />
      <div
        className="details-container"
        // style={{
        //   display: "flex",
        //   flexDirection: "row",
        //   justifyContent: "space-between",
        // }}
      >
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
      {/* <p>{JSON.stringify(nominated)}</p> */}
    </div>
  );
}

export default App;
