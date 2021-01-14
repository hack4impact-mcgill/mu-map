import React from "react";
import "./App.css";
import Map from "../Map/Map";
import PlusButton from "../plusButton/PlusButton";
import Search from "../Search/Search"

function App() {
  return (
    <div className="App">
      <Search />
      <Map mapContainer={document.getElementById("root")} />
      <PlusButton isVisible={true} />
    </div>
  );
}

export default App;
