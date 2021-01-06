import React from "react";
import "./App.css";
import Map from "../Map/Map";
import Sidebar from "../sidebar/Sidebar";
import PlusButton from "../plusButton/PlusButton";

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  
  return (
    <div className="App">
      <Map mapContainer={document.getElementById("root")} />
      <Sidebar
        name="Example Sidebar"
        isVisible={sidebarOpen}
        closeSidebar={toggleSidebar}
      />
      <PlusButton isVisible={true} handleClick={toggleSidebar} />
    </div>
  );
}

export default App;
