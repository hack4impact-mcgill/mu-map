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
import { CREATE_MURAL_API, FORM } from "constants/constants";
import LeaveWarning from "components/LeaveWarning";

function App() {

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const [signInError, setSignInError] = useState<string>("");
  const [user, setUser] = useState<any>({});

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<any>([]);
  const [activeForm, setActiveForm] = useState<FORM>(FORM.MURAL);
  const [formWarning, setFormWarning] = useState<boolean>(false);

  const [murals, setMurals] = useState<any>([]);
  const [selectedMural, setSelectedMural] = useState<any>(null);

  const handleSignin = (creds: any) => {
    setSignInError("");
    FirebaseAuth.signInWithEmailAndPassword(creds.email, creds.password)
      .then(() => {
        handleCancelSignin();
        setSignInError("");
      })
      .catch((error: any) => {
        console.log(error.message);
        if (error.code === "auth/network-request-failed") {
          setSignInError("Network error.");
        } else if (error.code === "auth/wrong-password") {
          setSignInError("Incorrect password.");
        } else if (error.code === "auth/user-not-found") {
          setSignInError("No user record corresponding to this email.");
        }
      });
  };

  const handleSignout = async () => {
    await FirebaseAuth.signOut();
  };

  const handleSearch = (results: any) => {
    setSearchResult(results);
  };

  useEffect(() => {
    FirebaseAuth.onAuthStateChanged((user: any) => {
      setUser(user);
      setIsSignedIn(!!user);
      setSigningIn(false);
    });
  }, []);

  const openSignin = () => setSigningIn(true);

  const handleCancelSignin = () => setSigningIn(false);

  const toggleSidebar = (formName: FORM = FORM.MURAL) => {
    if (sidebarOpen) return setFormWarning(true);
    setSidebarOpen(!sidebarOpen);
    formName && setActiveForm(formName);
  };

  const leaveForm = () => {
    setSidebarOpen(false);
    setFormWarning(false);
  };

  const getMural = async () => {
    const response = await fetch(CREATE_MURAL_API);
    const data = await response.json();

    setMurals(data.rows);
  };

  /**
   * When a mural marker is clicked, open the mural form
   */
  useEffect(() => {
    if (!selectedMural) return;
    toggleSidebar(FORM.MURAL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMural]);

  useEffect(() => {
    getMural();
  }, []);

  const sidebarTitle = "";

  return (
    <div className="App">
      <Context.Provider value={{ user: user }}>
        <SigninForm
          signInClick={handleSignin}
          cancelClick={handleCancelSignin}
          error={signInError}
          open={signingIn}
        />
        <Search searchCallBack={handleSearch} />
        <Map
          murals={murals}
          muralClick={(mural: any) => setSelectedMural(mural)}
        />
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
          {searchResult.length ? (
            <SearchCard searchCards={searchResult} />
          ) : activeForm === FORM.MURAL ? (
            <MuralForm mural={selectedMural} handleCancel={toggleSidebar} />
          ) : activeForm === FORM.COLLECTION ? (
            <CollectionForm handleCancel={toggleSidebar} />
          ) : null}
        </Sidebar>
        <LeaveWarning
          open={formWarning}
          handleStay={() => setFormWarning(false)}
          handleLeave={() => { leaveForm(); setSelectedMural(null) }} />
        <PlusButton isVisible={true} handleClick={toggleSidebar} />
      </Context.Provider>
    </div>
  );
}

export default App;
