import React from 'react';
import './App.css';
import Map from '../Map/Map';

function App() {
  return (
    <div className="App">
      <Map mapContainer={document.getElementById("root")} />
    </div>
  );
}

export default App;
