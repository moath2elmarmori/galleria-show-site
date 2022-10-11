import React from "react";
import { AnimatePresence } from "framer-motion";
import "./app.css";
import Header from "./components/Header";
import ImagesGridPage from "./pages/ImagesGridPage";
import PalletPage from "./pages/PalletPage";
import { Route, Routes, useLocation } from "react-router-dom";
import AnimationContextProvider from "./context/context-api";

function App() {
  const location = useLocation();
  return (
    <AnimationContextProvider>
      <div className="App">
        <Header />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.key}>
            <Route path="/" element={<ImagesGridPage />}></Route>
            <Route path="galleria/:imageId" element={<PalletPage />} />
            <Route path="/:hehe" element={<h1>Hehe</h1>} />
          </Routes>
        </AnimatePresence>
      </div>
    </AnimationContextProvider>
  );
}

export default App;
