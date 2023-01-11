import classes from "./Results.module.css";
import { useHeaderContext } from "../../../../../hooks";
import {Card} from "../../../../core";

const Results = () => {
  const { state,searchFalse } = useHeaderContext();

  const handleClick = (event)=>{
    if (event.target.className.indexOf('link') !== 1) {
      searchFalse();
    }
  }

  return (
    <div className={classes.results}>
      {state.movies.map(movie => {
        return (
          <Card onClick={handleClick}
            {...movie}
            key={movie.id}
          />
        );
      })}
    </div>
  );
};

export default Results;
