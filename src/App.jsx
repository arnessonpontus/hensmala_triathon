import React from "react";
import "./App.css";
import Media from "./components/media/Media";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import AboutALS from "./components/about/AboutALS";
import AboutHT from "./components/about/AboutHT";
import NewsDetail from "./components/news/NewsDetail";
import Videos from "./components/media/Videos";
import Photos from "./components/media/Photos";
import Register from "./components/register/Register";
import Articles from "./components/media/Articles";
import Radio from "./components/media/Radio";
import Sponsors from "./components/sponsor/Sponsors";
import Footer from "./components/Footer";
import firebase from "firebase/compat/app"; // Change to only import specific modules


import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import CoronaEdition from "./components/challenge/CoronaEdition";
import Fortrampet from "./components/fortrampet/Fortrampet";
import OrderShirt from "./components/register/OrderShirt";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Route path="/" exact component={Home} />
        <Route path="/anmalan" component={Register} />
        <Route path="/bestall-klader" component={OrderShirt} />
        <Route path="/corona-edition" component={CoronaEdition} />
        <Route path="/hentrampet" component={Fortrampet} />
        <Route path="/media" component={Media} />
        <Route path="/om-als" component={AboutALS} />
        <Route path="/videos" component={Videos} />
        <Route path="/foton" component={Photos} />
        <Route path="/artiklar" component={Articles} />
        <Route path="/radio" component={Radio} />
        <Route path="/sponsorer" component={Sponsors} />
        <Switch>
          <Route path="/om-ht/:id" component={AboutHT} />
          <Route path="/news/:id" component={NewsDetail} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

const prodConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};


const config = import.meta.env.MODE === "production" ? prodConfig : prodConfig; // TODO: Change one

// Initialize Firebase
firebase.initializeApp(config);

export default App;
