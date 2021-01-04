import React from 'react';
import './App.css';
import Map from '../Map/Map';
import SearchCard from '../components/SearchCard';

function App() {
  return (
    <div className="App">
      <Map mapContainer={document.getElementById("root")} />
      <div className="leftBar">
        <SearchCard />
      </div>
    </div>
  );
}

export default App;
