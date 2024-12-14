import "./App.css";
import { Footer } from "./components/Footer";
import firebase from "firebase/compat/app"; // Change to only import specific modules
import { ErrorModalProvider } from "./context/ErrorModalContext";
import { ErrorModal } from "./components/ErrorModal";
import { AppRouter } from "./AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { getViteEnvVariable } from "./utils";
import { ConsentBannerProvider } from "./features/consent/context/ConsentBannerContext";
import ConsentBanner from "./features/consent/components/ConsentBanner";

const App = () => {
  return (
    <div className="App">
      <ErrorModalProvider>
        <ConsentBannerProvider>
          <ErrorModal />
          <Router>
            <ConsentBanner />
            <Navigation />
            <AppRouter />
          </Router>
          <Footer />
        </ConsentBannerProvider>
      </ErrorModalProvider>
    </div>
  );
};

const prodConfig = {
  apiKey: getViteEnvVariable("VITE_FIREBASE_APIKEY"),
  authDomain: getViteEnvVariable("VITE_FIREBASE_AUTHDOMAIN"),
  databaseURL: getViteEnvVariable("VITE_FIREBASE_DATABASE_URL"),
  projectId: getViteEnvVariable("VITE_FIREBASE_PROJECTID"),
  storageBucket: getViteEnvVariable("VITE_FIREBASE_STORAGEBUCKET"),
  messagingSenderId: getViteEnvVariable("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: getViteEnvVariable("VITE_FIREBASE_APPID"),
  measurementId: getViteEnvVariable("VITE_FIREBASE_MEASUREMENTID"),
};

const config = getViteEnvVariable("MODE") === "production" ? prodConfig : prodConfig; // TODO: Change one

// Initialize Firebase
firebase.initializeApp(config);

export default App;
