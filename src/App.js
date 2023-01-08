import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Intro from "./components/Intro/Intro";
import SingleMovie from "./components/SingleMovie/SingleMovie";
import Tracks from "./components/Tracks";
import useGlobalContext from './hooks/useGlobalContext';

const App = () => {

  
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Intro />
                <Tracks />
              </>
            }
          />
          <Route path="/movie/:movieId" element={<SingleMovie />} />
          <Route
            path="*"
            element={
              <>
                <h1>noe</h1>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
