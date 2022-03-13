import React from "react";
import "./App.css";
import Media from "./components/media/Media";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import AboutALS from "./components/about/AboutALS";
import AboutHT from "./components/about/AboutHT";
import Videos from "./components/media/Videos";
import Photos from "./components/media/Photos";
import Register from "./components/register/Register";
import Articles from "./components/media/Articles";
import Radio from "./components/media/Radio";
import Sponsors from "./components/sponsor/Sponsors";
import Footer from "./components/Footer";
//import devConfig from "./config";
import firebase from "firebase/compat/app"; // Change to only import specific modules


import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import CoronaEdition from "./components/challenge/CoronaEdition";
import Fortrampet from "./components/Fortrampet";
import OrderShirt from "./components/register/OrderShirt";

const App = () => {
  ReactGA.initialize("UA-158085908-1");
  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Route path="/" exact component={Home} />
        <Route path="/anmalan" component={Register} />
        <Route path="/tshirt" component={OrderShirt} />
        <Route path="/corona-edition" component={CoronaEdition} />
        <Route path="/fortrampet" component={Fortrampet} />
        <Route path="/media" component={Media} />
        <Route path="/om-als" component={AboutALS} />
        <Route path="/videos" component={Videos} />
        <Route path="/foton" component={Photos} />
        <Route path="/artiklar" component={Articles} />
        <Route path="/radio" component={Radio} />
        <Route path="/sponsorer" component={Sponsors} />
        <Switch>
          <Route path="/om-ht/:id" component={AboutHT} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

const prodConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

const config = process.env.NODE_ENV === "production" ? prodConfig : prodConfig; // TODO: Change one

// Initialize Firebase
firebase.initializeApp(config);

export default App;
