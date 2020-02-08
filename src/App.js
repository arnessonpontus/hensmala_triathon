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

import { Route, HashRouter as Router } from "react-router-dom";
import ReactGA from "react-ga";

const App = () => {
  ReactGA.initialize("UA-158085908-1");
  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/media" component={Media} />
        <Route path="/aboutHT" component={AboutHT} />
        <Route path="/aboutALS" component={AboutALS} />
        <Route path="/videos" component={Videos} />
        <Route path="/photos" component={Photos} />
        <Route path="/articles" component={Articles} />
        <Route path="/radio" component={Radio} />
        <Route path="/sponsors" component={Sponsors} />
      </Router>
      <Footer />
    </div>
  );
};

export default App;
