import React, { useState } from "react";
import "./App.css";
import Map from "../Map/Map";
import SigninButton from "../SigninButton/SigninButton";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  function handleSigninClick() {
    setIsSignedIn(!isSignedIn);
  }

  return (
    <div className="App">
      <Map mapContainer={document.getElementById("root")} />
      <SigninButton isSignedIn={isSignedIn} onClick={handleSigninClick} />
      <DropdownMenu />
    </div>
  );
}

export default App;
