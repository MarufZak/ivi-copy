import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import SingleMovie from "./components/SingleMovie/SingleMovie";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <SkeletonTheme baseColor="#25282e" highlightColor="#696969">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movie/:movieId" element={<SingleMovie />} />
          </Routes>
        </SkeletonTheme>
      </BrowserRouter>
    </>
  );
};

export default App;
