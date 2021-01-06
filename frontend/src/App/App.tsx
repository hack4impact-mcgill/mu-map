import React from 'react';
import './App.css';
import Map from '../Map/Map';
import Sidebar from '../sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <Map mapContainer={document.getElementById("root")} />
      <Sidebar name="Example Sidebar" />
    </div>
  );
}

export default App;
