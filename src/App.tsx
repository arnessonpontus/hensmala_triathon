import "./App.css";
import { Footer } from "./components/Footer";
import { ErrorModalProvider } from "./context/ErrorModalContext";
import { ErrorModal } from "./components/ErrorModal";
import { AppRouter } from "./AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { ConsentBannerProvider } from "./features/consent/context/ConsentBannerContext";
import ConsentBanner from "./features/consent/components/ConsentBanner";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className="App">
      <ErrorModalProvider>
        <ConsentBannerProvider>
          <ErrorModal />
          <Router>
            <ConsentBanner />
            <Navigation />
            <CartProvider>
              <AppRouter />
              <ToastContainer />
            </CartProvider>
          </Router>
          <Footer />
        </ConsentBannerProvider>
      </ErrorModalProvider>
    </div>
  );
};

export default App;
