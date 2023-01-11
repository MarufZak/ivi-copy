import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import useGlobalContext from "./hooks/useGlobalContext";
import { HeaderProvider, MainProvider, SingleMovieProvider } from "./context";
import {Error} from './components/core'
import { Header, Main, SingleMovie } from "./components";

const App = () => {
  const { state } = useGlobalContext();

  if (state.error.state) {
    return <h1>Sorry , error ocurred : {state.error.msg}</h1>;
  }

  return (
      <BrowserRouter>
        <SkeletonTheme baseColor="#25282e" highlightColor="#696969">
          <HeaderProvider> <Header /> </HeaderProvider>
          <Routes>
            <Route path="/" element={<MainProvider> <Main /> </MainProvider> } />
            <Route path="/movie/:movieId" element={ <SingleMovieProvider> <SingleMovie /> </SingleMovieProvider>}/>
            <Route path="*" element={<Error/>} />
          </Routes>
        </SkeletonTheme>
      </BrowserRouter>
  );
};

export default App;
