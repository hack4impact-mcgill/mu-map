import React from 'react';
import './App.css';
import Map from '../Map/Map';
import Sidebar from '../sidebar/Sidebar';
import PlusButton from "../plusButton/PlusButton";

function App() {
  return (
    <div className="App">
      <Map mapContainer={document.getElementById("root")} />
      <Sidebar name="Example Sidebar" />
      <PlusButton isVisible={true} />
    </div>
  );
}

export default App;
