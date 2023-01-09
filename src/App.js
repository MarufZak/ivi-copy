import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import SingleMovie from "./components/SingleMovie/SingleMovie";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movie/:movieId" element={<SingleMovie />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
