import React from "react";
import "./App.css";
import Media from "./components/Media";
import Nav from "./components/Nav";
import Home from "./components/Home";
import AboutALS from "./components/AboutALS";
import AboutHT from "./components/AboutHT";
import Videos from "./components/Videos";
import Photos from "./components/Photos";
import Login from "./components/Login";
import { Route, HashRouter as Router } from "react-router-dom";
import config from "./config";
import * as firebase from "firebase";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route path="/" exact component={Home} />
        <Route path="/media" component={Media} />
        <Route path="/aboutHT" component={AboutHT} />
        <Route path="/aboutALS" component={AboutALS} />
        <Route path="/videos" component={Videos} />
        <Route path="/photos" component={Photos} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}
// Initialize Firebase
firebase.initializeApp(config);

export default App;
