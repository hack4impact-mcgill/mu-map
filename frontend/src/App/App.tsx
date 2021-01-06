import React from "react";
import "./App.css";
import Map from "../Map/Map";
import Sidebar from "../sidebar/Sidebar";
import PlusButton from "../plusButton/PlusButton";

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);

  const plusButtonClick = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  return (
    <div className="App">
      <Map mapContainer={document.getElementById("root")} />
      <Sidebar
        name="Example Sidebar"
        isVisible={sidebarOpen}
        closeSidebar={closeSidebar}
      />
      <PlusButton isVisible={true} handleClick={plusButtonClick} />
    </div>
  );
}

export default App;
