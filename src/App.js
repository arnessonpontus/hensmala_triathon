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
firebase.initializeApp({
  apiKey: "AIzaSyCpmSUH4Vr4N9TP487Hxz3hQnoL_mKPhRI",
  authDomain: "hensmala-tri-proj.firebaseapp.com",
  databaseURL: "https://hensmala-tri-proj.firebaseio.com",
  projectId: "hensmala-tri-proj",
  storageBucket: "hensmala-tri-proj.appspot.com",
  messagingSenderId: "219062878367",
  appId: "1:219062878367:web:1121ccf32971d1ce63e2aa",
  measurementId: "G-99TRG33M08"
});

export default App;
