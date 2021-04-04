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
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const [tours, setTours] = useState<any>([]);

  const mapRef: any = useRef(null);

  /**
   * Use the Firebase Auth sign-in method email and password to
   * attempt to authorize the user. If unsuccessful, relay an error
   * message to the user.
   * @param creds Email and password passed to the sign-in form
   */
  const handleSignin = (creds: any) => {
    setSignInError("");
    FirebaseAuth.signInWithEmailAndPassword(creds.email, creds.password)
      .then(() => {
        setSigningIn(false);
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

  /**
   * Sign the user out of Firebase Auth
   */
  const handleSignout = async () => {
    await FirebaseAuth.signOut();
  };

  /**
   * On app startup, add a listener to Firebase Auth to set the
   * user object and auth status in local state when they change.
   */
  useEffect(() => {
    FirebaseAuth.onAuthStateChanged((user: any) => {
      setUser(user);
      setIsSignedIn(!!user);
      setSigningIn(false);
    });
  }, []);

  /**
   * If opening the sidebar, set the appropriate form type.
   * If closing the sidebar and signed in, warn the admin
   * to save progress.
   * @param formName Type of form to be opened in the sidebar
   */
  const toggleSidebar = (formName: FORM = FORM.MURAL) => {
    if (sidebarOpen && isSignedIn) return setFormWarning(true);
    else if (sidebarOpen) return leaveForm();
    setSidebarOpen(!sidebarOpen);
    formName && setActiveForm(formName);
  };

  /**
   * After confirmation, close the form and reset state
   */
  const leaveForm = () => {
    console.log("naw")
    setSidebarOpen(false);
    setFormWarning(false);
    setSelectedResource(null);
  };

  /**
   * Fetch and set murals in local state
   */
  const getMural = async () => {
    const response = await fetch(CREATE_MURAL_API);
    const data = await response.json();

    setMurals(data.rows);
  };

  /**
   * Fetch and set tours in local state
   */
  const getTour = async () => {
    const response = await fetch(GET_ALL_TOUR);
    const data = await response.json();

    setTours(data.tours);
  };

  /**
   * Zooms the map to the coordinates of the clicked searched mural
   * @param long longitude
   * @param lat latitude
   */
  const handleSearchedMuralZoom = (long: number, lat: number) => {
    mapRef.current.setLongLat(long, lat);
  };

  /**
   * The mural form supplied with a mural and cancel handler
   */
  const muralForm = (
    <MuralForm mural={selectedResource} handleCancel={toggleSidebar} />
  );

  /**
   * The collection form supplied with a collection, all murals,
   * and handlers for cancellation and mural click
   */
  const collectionForm = (
    <CollectionForm
      collection={selectedResource}
      muralsData={murals}
      handleCancel={toggleSidebar}
      handleMuralClick={handleSearchedMuralZoom}
      setSelectedResource={setSelectedResource}
      setResourceType={setActiveForm}
    />
  );

  /**
   * The tour form supplied with a tour, all murals,
   * and handlers for cancellation and mural click
   */
  const tourForm = (
    <TourForm
      tour={selectedResource}
      muralsData={murals}
      handleCancel={toggleSidebar}
      handleMuralClick={handleSearchedMuralZoom}
      setSelectedResource={setSelectedResource}
      setResourceType={setActiveForm}
    />
  );

  /**
   * The search component which gets passed into the sidebar
   */
  const searchMenu = (
    <SearchMenu
      handleMuralClick={handleSearchedMuralZoom}
      handleCancel={leaveForm}
      setSelectedResource={setSelectedResource}
      setResourceType={setActiveForm}
    />
  );

  /**
   * When a resource marker is clicked, open its respective form
   */
  useEffect(() => {
    if (selectedResource && !sidebarOpen) toggleSidebar(activeForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedResource]);

  /**
   * On app startup, load murals and tours to be rendered on the map
   */
  useEffect(() => {
    getMural();
    getTour();
  }, []);

  return (
    <div className="App">
      <Context.Provider value={{ user: user, getMural }}>
        <SigninForm
          signInClick={handleSignin}
          cancelClick={() => setSigningIn(false)}
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
          muralClick={(mural: any) => {
            setActiveForm(FORM.MURAL);
            setSelectedResource(mural);
          }}
          ref={mapRef}
        />
        <DropdownMenu
          isSignedIn={isSignedIn}
          signinClick={() => setSigningIn(true)}
          signoutClick={handleSignout}
          donateClick={() => setDonateOpen(true)}
        />
        <Sidebar
          isVisible={sidebarOpen}
          closeSidebar={toggleSidebar}
        >
          {
            activeForm === FORM.MURAL ? muralForm
            : activeForm === FORM.COLLECTION ? collectionForm
            : activeForm === FORM.TOUR ? tourForm
            : searchMenu
          }
        </Sidebar>
        <LeaveWarning
          open={formWarning}
          handleStay={() => setFormWarning(false)}
          handleLeave={leaveForm}
        />
        <PlusButton isVisible={isSignedIn} handleClick={toggleSidebar} />
      </Context.Provider>
    </div>
  );
}

export default App;
