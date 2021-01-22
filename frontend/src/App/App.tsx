import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "../Map/Map";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import Sidebar from "../sidebar/Sidebar";
import PlusButton from "../plusButton/PlusButton";
import Search from "../Search/Search";
import MuralForm from "../muralForm/MuralForm";
import SigninForm from "../SignInForm/SigninForm";
import Context from "../context"
import "firebase/auth"
import FirebaseAuth from "../firebase"

function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [signingIn, setSigningIn] = useState<boolean>(false)
  const [user, setUser] = useState<any>({})
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [murals, setMurals] = useState<any>([]);

  const handleSignin = (creds: any) => {
    FirebaseAuth.signInWithEmailAndPassword(creds.email, creds.password)
      .catch((error: any) => console.log(error.message));
  }

  const handleSignout = async () => {
    await FirebaseAuth.signOut()
  }

  useEffect(() => {
    FirebaseAuth.onAuthStateChanged((user: any) => {
      setUser(user)
      setIsSignedIn(!!user)
      setSigningIn(false)
    });
  }, [])

  const openSignin = () => setSigningIn(true)

  const handleCancelSignin = () => setSigningIn(false)

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
      <Context.Provider value={{ user: user }}>
        <SigninForm
          signInClick={handleSignin}
          cancelClick={handleCancelSignin}
          open={signingIn} />
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
      </Context.Provider>
    </div>
  );
}

export default App;
