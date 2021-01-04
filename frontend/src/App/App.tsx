import React, { useState } from "react";
import "./App.css";
import Map from "../Map/Map";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  function handleSigninClick() {
    setIsSignedIn(!isSignedIn);
  }

  return (
    <div className="App">
      <Map mapContainer={document.getElementById("root")} />
      <DropdownMenu isSignedIn={isSignedIn} signInClick={handleSigninClick} />
    </div>
  );
}

export default App;
