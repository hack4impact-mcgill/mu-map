import React from "react";
import "./App.css";
import Map from "../Map/Map";
import PlusButton from "../plusButton/PlusButton";

function App() {
  return (
    <div className="App">
      <Map mapContainer={document.getElementById("root")} />
      <PlusButton isVisible={true} />
    </div>
  );
}

export default App;
