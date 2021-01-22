import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "../Map/Map";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import Sidebar from "../sidebar/Sidebar";
import PlusButton from "../plusButton/PlusButton";
import Search from "../Search/Search";
import MuralForm from "../muralForm/MuralForm";
import SigninForm from "../SignInForm/SigninForm";
import "firebase/auth"
import firebaseAuth from "../firebase"

function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [signingIn, setSigningIn] = useState<boolean>(false)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [murals, setMurals] = useState<any>([]);

  const handleSignin = (creds: any) => {
    firebaseAuth.signInWithEmailAndPassword(creds.email, creds.password)
      .then((userCredential: any) => {
        let user = userCredential.user;
        // TODO: set this in Context
        console.log(user)
        setIsSignedIn(true)
        setSigningIn(false)
      })
      .catch((error: any) => console.log(error.message));
  };

  const openSignin = () => setSigningIn(!signingIn)

  const handleSignout = async () => {
    await firebaseAuth.signOut()
    setIsSignedIn(false)
  }

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
      <SigninForm signInClick={handleSignin} signingIn={signingIn} />
      <Search />
      <Map murals={murals} mapContainer={document.getElementById("root")} />
      <DropdownMenu
        isSignedIn={isSignedIn}
        signinClick={openSignin}
        signoutClick={handleSignout}
      />
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
