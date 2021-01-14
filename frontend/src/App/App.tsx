import React, { useState } from "react";
import "./App.css";
import Map from "../Map/Map";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import Sidebar from "../sidebar/Sidebar";
import PlusButton from "../plusButton/PlusButton";
import Search from "../Search/Search";
import MuralForm from "../muralForm/MuralForm";

function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  function handleSigninClick() {
    setIsSignedIn(!isSignedIn);
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarTitle = "Example Sidebar";

  return (
    <div className="App">
      <Search />
      <Map mapContainer={document.getElementById("root")} />
      <DropdownMenu isSignedIn={isSignedIn} signInClick={handleSigninClick} />
      <Sidebar
        name={sidebarTitle}
        isVisible={sidebarOpen}
        closeSidebar={toggleSidebar}
      >
        <MuralForm />
      </Sidebar>
      <PlusButton isVisible={true} handleClick={toggleSidebar} />
    </div>
  );
}

export default App;
