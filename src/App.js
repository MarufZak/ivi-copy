import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Intro from "./components/Intro/Intro";
import SingleMovie from "./components/SingleMovie";
import Tracks from "./components/Tracks";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Intro />
              <Tracks />
            </>
          }
        />
        <Route path="movie/:movieId" element={<SingleMovie/>} />
      </Routes>
    </>
  );
};

export default App;
