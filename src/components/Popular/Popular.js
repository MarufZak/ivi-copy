import { useEffect } from "react";
import Header from "./Header/Header";
import classes from "./Popular.module.css";
import {useGlobalContext,usePopularContext} from '../../hooks';
import {Loading,Pagination,Card} from '../core';

const Popular = () => {
  const { state, fetchPopularMovies, setPage } = usePopularContext();
  const {state:globalState} = useGlobalContext();

  useEffect(() => {
    fetchPopularMovies();
  }, [state.page]);

  return (
    <div className={classes.popular}>
      <div className="container">
        <div className={classes.body}>
          <Header />
            {globalState.isLoading && <Loading/>}
          <div className={classes.cards}>
              {state.popularMovies.map((movie) => (
              <Card key={movie.id} {...movie} />
            ))}
          </div>
          <Pagination onPageChange={(e)=>setPage(e.selected+1)} pageCount={state.totalPages} />
        </div>
      </div>
    </div>
  );
};

export default Popular;
