import { Link } from "react-router-dom";
import classes from "./Card.module.css";
import Image from '../Image';

const Card = ({poster_path, vote_average, title, id , onClick}) => {
  return (
    <>
      <div onClick={onClick} className={classes.card}>
        <div className={classes.img_block}>
          <Image className={classes.img} src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="" />
        </div>
          <div className={classes.content}>
            <span>{vote_average}</span>
            <Link className={classes.link} to={`/movie/${id}`}>
              Learn more
            </Link>
          </div>
        <h4 className={classes.title}>{title}</h4>
        </div>
    </>
  );
};

export default Card;