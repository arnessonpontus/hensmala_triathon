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

import { Route, HashRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
}

export default App;
