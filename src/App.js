import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import {useGlobalContext} from "./hooks";
import { HeaderProvider, MainProvider, SingleMovieProvider,PopularProvider,AuthProvider } from "./context";
import { NotFound,Modal } from './components/core'
import { Header, Main, SingleMovie,Popular,Login,SignUp } from "./components";

const App = () => {
  const { state } = useGlobalContext();

  if (state.error.state) {
    return <h1>Sorry , error ocurred : {state.error.msg}</h1>;
  }

  return (
      <BrowserRouter>
        <AuthProvider>
        <SkeletonTheme baseColor="#25282e" highlightColor="#696969">
          <HeaderProvider> <Header /> </HeaderProvider>
          <Modal />
          <Routes>
            <Route path="/" element={<MainProvider> <Main /> </MainProvider> } />
            <Route path="/popular" element={<PopularProvider><Popular/></PopularProvider>} />
            <Route path="/movie/:movieId" element={ <SingleMovieProvider> <SingleMovie /> </SingleMovieProvider>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </SkeletonTheme>
        </AuthProvider>
      </BrowserRouter>
  );
};

export default App;
