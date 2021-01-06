import React, { useState } from "react";
import "./App.css";
import Map from "../Map/Map";
import Sidebar from "../sidebar/Sidebar";
import PlusButton from "../plusButton/PlusButton";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarTitle = "Example Sidebar";

  return (
    <div className="App">
      <Map mapContainer={document.getElementById("root")} />
      <Sidebar
        name={sidebarTitle}
        isVisible={sidebarOpen}
        closeSidebar={toggleSidebar}
      />
      <PlusButton isVisible={true} handleClick={toggleSidebar} />
    </div>
  );
}

export default App;
