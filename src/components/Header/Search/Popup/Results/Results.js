import classes from "./Results.module.css";
import { useHeaderContext } from "../../../../../hooks";
import { Card, LoadingSecond } from "../../../../core";
import { useGlobalContext } from "../../../../../hooks";

const Results = () => {
  const { state, hidePopup,fetchSearchMovies } = useHeaderContext();
  const { state: globalState } = useGlobalContext();

  const handleClick = (event) => {
    if (event.target.className.indexOf("link") !== 1) {
      hidePopup();
    }
  };

  return (
    <div className={classes.results}>
      {state.movies.map((movie) => {
        return <Card onClick={handleClick} {...movie} key={movie.id} />;
      })}
      <div className={classes.interact}>
        {globalState.isLoading && <LoadingSecond />}
        {state.movies.length > 0 && <button onClick={fetchSearchMovies} className="btn btn--red">Load more</button>}
      </div>
    </div>
  );
};

export default Results;
