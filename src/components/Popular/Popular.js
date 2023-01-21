import Header from "./Header/Header";
import classes from "./Popular.module.css";
import { usePopularContext } from "../../hooks";
import { Pagination, Card, Loading } from "../core";

const Popular = () => {
  const { state } = usePopularContext();

  if (state.popular_movies_loading) {
    return <Loading/>
  }

  return (
    <div className={classes.popular}>
      <div className="container">
        <div className={classes.body}>
          <Header />
            <div className={classes.cards}>
              {state.popular_movies.map((movie) => (
                <Card key={movie.id} {...movie} />
              ))}
            </div>
          <Pagination pageCount={state.total_pages} />
        </div>
      </div>
    </div>
  );
};

export default Popular;
