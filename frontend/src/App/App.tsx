import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "../Map/Map";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import Sidebar from "../sidebar/Sidebar";
import PlusButton from "../plusButton/PlusButton";
import Search from "../Search/Search";
import MuralForm from "../muralForm/MuralForm";
import CollectionForm from "../CollectionForm/CollectionForm";
import SigninForm from "../SignInForm/SigninForm";
import Context from "../context";
import "firebase/auth";
import FirebaseAuth from "../firebase";
import SearchCard from "../SideBarSearch/searchCard";

function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [murals, setMurals] = useState<any>([]);
  const [searchResult, setSearchResult] = useState<any>([]);
  const [signInError, setSignInError] = useState<string>('');

  const handleSignin = (creds: any) => {
    setSignInError("")
    FirebaseAuth.signInWithEmailAndPassword(creds.email, creds.password)
      .then(() => {
        handleCancelSignin()
        setSignInError('')
      })
      .catch((error: any) => {
        console.log(error.message);
        if (error.code === "auth/network-request-failed") {
          setSignInError("Network error.")
        } else if (error.code === 'auth/wrong-password') {
          setSignInError("Incorrect password.")
        } else if (error.code === "auth/user-not-found") {
          setSignInError("No user record corresponding to this email.")
        }
      });
  };

  const handleSignout = async () => {
    await FirebaseAuth.signOut();
  };

  const handleSearch = (results: any) => {
    setSearchResult(results);
  }

  useEffect(() => {
    FirebaseAuth.onAuthStateChanged((user: any) => {
      setUser(user);
      setIsSignedIn(!!user);
      setSigningIn(false);
    });
  }, []);

  const openSignin = () => setSigningIn(true);

  const handleCancelSignin = () => setSigningIn(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getMural = async () => {
    const response = await fetch("http://localhost:3000/mural");
    const data = await response.json();

    setMurals(data.rows);
  };

  useEffect(() => {
    getMural();
  }, []);

  const sidebarTitle = "Create Mural";

  return (
    <div className="App">
      <Context.Provider value={{ user: user }}>
        <SigninForm
          signInClick={handleSignin}
          cancelClick={handleCancelSignin}
          error={signInError}
          open={signingIn} />
        <Search searchCallBack={handleSearch} />
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
          {
            !searchResult.length ?
              (<CollectionForm />) :
              (<SearchCard searchCards={searchResult} />)
          }
          {false && (<MuralForm />)}
        </Sidebar>
        <PlusButton isVisible={true} handleClick={toggleSidebar} />
      </Context.Provider>
    </div>
  );
}

export default App;
