import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import { HeaderProvider, MainProvider, SingleMovieProvider,PopularProvider,AuthProvider } from "./context";
import { NotFound,Modal } from './components/core'
import { Header, Main, SingleMovie,Popular,SignUp,Login,Favorite} from "./components";

const App = () => {

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
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SkeletonTheme>
        </AuthProvider>
      </BrowserRouter>
  );
};

export default App;
