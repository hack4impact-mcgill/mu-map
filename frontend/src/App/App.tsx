import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Map from "../Map/Map";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import Sidebar from "../sidebar/Sidebar";
import PlusButton from "../plusButton/PlusButton";
import MuralForm from "../muralForm/MuralForm";
import CollectionForm from "../CollectionForm/CollectionForm";
import SigninForm from "../SignInForm/SigninForm";
import Context from "../context";
import "firebase/auth";
import FirebaseAuth from "../firebase";
import { CREATE_MURAL_API, FORM, GET_ALL_TOUR } from "constants/constants";
import LeaveWarning from "components/LeaveWarning";
import TourForm from "TourForm/TourForm";
import SearchMenu from "SearchMenu/SearchMenu";
import SearchButton from "SearchButton/SearchButton";
import DonationModal from "DonationModal/DonationModal";
import WelcomeModal from "WelcomeModal/WelcomeModal";

function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const [signInError, setSignInError] = useState<string>("");
  const [user, setUser] = useState<any>({});

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeForm, setActiveForm] = useState<FORM>(FORM.MURAL);
  const [formWarning, setFormWarning] = useState<boolean>(false);
  const [donateOpen, setDonateOpen] = useState<boolean>(false);
  const [welcomeOpen, setWelcomeOpen] = useState<boolean>(true);

  const [murals, setMurals] = useState<any>([]);
  const [selectedMural, setSelectedMural] = useState<any>(null);
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [selectedCollection, setSelectedCollection] = useState<any>(null);

  const [tours, setTours] = useState<any>([]);

  const mapRef: any = useRef(null);

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

  const toggleSidebarNoWarning = () => {
    setSidebarOpen(!sidebarOpen);
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

  const getTour = async () => {
    const response = await fetch(GET_ALL_TOUR);
    const data = await response.json();

    setTours(data.tours);
  };

  /**
   * Zooms the map to the coordiantes of the clicked searched mural
   * @param long longitude
   * @param lat latitude
   */
  const handleSearchedMuralZoom = (long: number, lat: number) => {
    mapRef.current.setLongLat(long, lat);
  };

  /**
   * When a mural marker is clicked, open the mural form
   */
  useEffect(() => {
    if (!selectedMural) return;
    toggleSidebar(FORM.MURAL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMural]);

  /**
   * When a tour marker is clicked, open the tour form
   */
     useEffect(() => {
      if (!selectedTour) return;
      toggleSidebar(FORM.TOUR);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTour]);

  /**
   * When a collection marker is clicked, open the collection form
   */
  useEffect(() => {
    if (!selectedCollection) return;
    toggleSidebar(FORM.COLLECTION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCollection]);

  useEffect(() => {
    getMural();
    getTour();
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
        <SearchButton toggleSidebar={toggleSidebar} />
        <WelcomeModal
          open={welcomeOpen}
          handleClose={() => setWelcomeOpen(false)}
        />
        <DonationModal
          open={donateOpen}
          handleClose={() => setDonateOpen(false)}
        />
        <Map
          tours={tours}
          murals={murals}
          muralClick={(mural: any) => setSelectedMural(mural)}
          ref={mapRef}
        />
        <DropdownMenu
          isSignedIn={isSignedIn}
          signinClick={openSignin}
          signoutClick={handleSignout}
          donateClick={() => setDonateOpen(true)}
        />
        <Sidebar
          name={sidebarTitle}
          isVisible={sidebarOpen}
          closeSidebar={toggleSidebar}
        >
          {activeForm === FORM.MURAL ? (
            <MuralForm mural={selectedMural} handleCancel={toggleSidebar} />
          ) : activeForm === FORM.COLLECTION ? (
            <CollectionForm collection={selectedCollection} muralsData={murals} handleCancel={toggleSidebar} />
          ) : activeForm === FORM.TOUR ? (
            <TourForm tour={selectedTour} muralsData={murals} handleCancel={toggleSidebar} />
          ) : (
            <SearchMenu
              handleMuralClick={handleSearchedMuralZoom}
              handleCancel={toggleSidebarNoWarning}
              setSelectedMural={setSelectedMural}
              setSelectedTour={setSelectedTour}
              setSelectedCollection={setSelectedCollection}
            />
          )}
        </Sidebar>
        <LeaveWarning
          open={formWarning}
          handleStay={() => setFormWarning(false)}
          handleLeave={() => {
            leaveForm();
            setSelectedMural(null);
            setSelectedTour(null);
            setSelectedCollection(null);
          }}
        />
        <PlusButton isVisible={true} handleClick={toggleSidebar} />
      </Context.Provider>
    </div>
  );
}

export default App;
