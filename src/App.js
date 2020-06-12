import React from "react";
import "./App.css";
import Media from "./components/Media";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import AboutALS from "./components/AboutALS";
import AboutHT from "./components/AboutHT";
import Videos from "./components/Videos";
import Photos from "./components/Photos";
import Register from "./components/Register";
import Articles from "./components/Articles";
import Radio from "./components/Radio";
import Sponsors from "./components/Sponsors";
import Footer from "./components/Footer";
import config from "./config";
import * as firebase from "firebase"; // Change to only import specific modules

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import Challenge from "./components/Challenge";

const App = () => {
  ReactGA.initialize("UA-158085908-1");
  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Route path="/" exact component={Home} />
        <Route path="/anmalan" component={Register} />
        <Route path="/utmaningen" component={Challenge} />
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

// Initialize Firebase
firebase.initializeApp(config);

export default App;
