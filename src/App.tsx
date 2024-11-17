import "./App.css";
import { Footer } from "./components/Footer";
import firebase from "firebase/compat/app"; // Change to only import specific modules
import { ErrorModalProvider } from "./context/ErrorModalContext";
import { ErrorModal } from "./components/ErrorModal";
import { AppRouter } from "./AppRouter";

const App = () => {
  return (
    <div className="App">
      <ErrorModalProvider>
        <ErrorModal />
        <AppRouter />
        <Footer />
      </ErrorModalProvider>
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
