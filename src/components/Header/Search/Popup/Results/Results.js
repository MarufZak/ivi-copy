import classes from "./Results.module.css";
import { useHeaderContext } from "../../../../../hooks";
import { Card, LoadingSecond } from "../../../../core";
import { useGlobalContext } from "../../../../../hooks";

const Results = () => {
  const { state, hidePopup,loadMore } = useHeaderContext();
  const { state: globalState } = useGlobalContext();



  const handleClick = (event) => {
    if (event.target.className.indexOf("link") !== 1) {
      hidePopup();
    }
  };

  return (
    <div className={classes.results}>
      {state.search_movies_loading && <LoadingSecond/>  }
      {state.search_movies.map((movie) => {
        return <Card onClick={handleClick} {...movie} key={movie.id} />;
      })}
      <div className={classes.interact}>
        {globalState.isLoading && <LoadingSecond />}
        {state.search_movies.length > 0 && <button onClick={loadMore} className="btn btn--red">Load more</button>}
      </div>
    </div>
  );
};

export default Results;
