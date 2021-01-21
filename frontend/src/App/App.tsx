import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "../Map/Map";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import Sidebar from "../sidebar/Sidebar";
import PlusButton from "../plusButton/PlusButton";
import Search from "../Search/Search";
import MuralForm from "../muralForm/MuralForm";
import "firebase/auth"
import firebaseAuth from "../firebase"

function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [murals, setMurals] = useState<any>([]);

  const handleSigninClick = (creds: any) => {
    firebaseAuth.signInWithEmailAndPassword(creds.email, creds.password)
      .then((userCredential: any) => {
        let user = userCredential.user;
        console.log(user)
        setIsSignedIn(true)
      })
      .catch((error: any) => console.log(error.message));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getMural = async () => {
    const response = await fetch("http://localhost:3000/mural");
    const data = await response.json();

    setMurals(data.murals.rows);
  };

  useEffect(() => {
    getMural();
  }, []);

  const sidebarTitle = "Example Sidebar";

  return (
    <div className="App">
      <Search />
      <Map murals={murals} mapContainer={document.getElementById("root")} />
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
