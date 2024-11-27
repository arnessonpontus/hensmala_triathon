import { Media } from "./features/media/pages/Media";
import { Home } from "./features/home/pages/Home";
import { AboutALS } from "./features/about/pages/AboutALS";
import { AboutHT } from "./features/about/pages/AboutHT";
import { NewsDetail } from "./features/news/pages/NewsDetail";
import { Videos } from "./features/media/pages/Videos";
import { Photos } from "./features/media/pages/Photos";
import { Register } from "./features/register/pages/Register";
import { Articles } from "./features/media/pages/Articles";
import { Radio } from "./features/media/pages/Radio";
import { Sponsors } from "./features/sponsor/pages/Sponsors";
import { Route, Routes, useLocation } from "react-router-dom";
import CoronaEdition from "./features/challenge/pages/CoronaEdition";
import { Fortrampet } from "./features/fortrampet/pages/Fortrampet";
import { OrderShirt } from "./features/register/pages/OrderShirt";
import PaymentCancelled from "./features/register/pages/PaymentCancelled";
import PaymentSuccess from "./features/register/pages/PaymentSuccess";
import { useEffect } from "react";
import { Results } from "./features/media/pages/Results";
import { MainLayout } from "./components/MainLayout";

export const AppRouter = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anmalan" element={<Register />} />
        <Route path="/bestall-klader" element={<OrderShirt />} />
        <Route path="/corona-edition" element={<CoronaEdition />} />
        <Route path="/hentrampet" element={<Fortrampet />} />
        <Route path="/media" element={<Media />} />
        <Route path="/om-als" element={<AboutALS />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/foton" element={<Photos />} />
        <Route path="/artiklar" element={<Articles />} />
        <Route path="/radio" element={<Radio />} />
        <Route path="/results" element={<Results />} />
        <Route path="/sponsorer" element={<Sponsors />} />
        <Route path="/payment-cancelled" element={<PaymentCancelled />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/om-ht/:id" element={<AboutHT />} />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>
    </MainLayout>
  );
};
