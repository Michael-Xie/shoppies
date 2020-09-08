import React, { useState } from "react";
import "./App.css";
import useAppState from "./hooks/useAppState";
import SearchBar from "material-ui-search-bar";

function App() {
  const [results, nominated, search, nominate, DeNominate] = useAppState();
  const [draft, setDraft] = useState("");
  return (
    <div className="App">
      <SearchBar
        value={draft}
        onChange={(newValue) => setDraft(newValue)}
        onRequestSearch={() => search(draft)}
      />
      <p>{JSON.stringify(results)}</p>
    </div>
  );
}

export default App;
