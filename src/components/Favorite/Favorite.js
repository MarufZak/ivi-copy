import classes from "./Favorite.module.css";
import useAuthContext from "../../hooks/useAuthContext";
import { Card, NotFound } from "../core";
import { auth } from "../../firebase/firebase";

const Favorite = () => {
  const { state } = useAuthContext();

  if (!auth.currentUser) {
    return <NotFound />;
  }

  return (
    <div className={classes.favorite}>
      <div className="container">
        <div className={classes.body}>
          <h2 className={classes.title}>
            {state.liked_movies.length > 0
              ? "Favorite movies"
              : "No favorite movies"}
          </h2>
          <div className={classes.movies}>
            {state.liked_movies.map((movie) => {
              return <Card key={movie.title} {...movie} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorite;
