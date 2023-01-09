import { useHeaderContext } from "../../../../hooks/useHeaderContext";
import { useEffect } from "react";
import classes from "./Form.module.css";
import Results from "./Results/Results";
import cardClasses from '../../../core/Card/Card.module.css';

const Form = () => {
  const { state, fetchSearchMovies, queryChange, searchFalse } =
    useHeaderContext();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains(cardClasses.link)) {
        searchFalse();

        document.body.classList.remove("lock");
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchSearchMovies();
  };

  return (
    <div className={`${classes.search} ${state.isSearchActive || classes.disabled}`}>
      <div className="container">
        <form onSubmit={handleSubmit} className={classes.form}>
          <input
            onChange={(e) => queryChange(e.target.value)}
            className={classes.input}
            type="text"
            placeholder="Type here"
          />
          <input className={classes.submit} type="submit" value="Поиск" />
        </form>
        <Results movies={state.movies} />
      </div>
    </div>
  );
};

export default Form;
