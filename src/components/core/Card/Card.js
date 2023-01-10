import { Link } from "react-router-dom";
import classes from "./Card.module.css";
import placeholderImage from '../../../assets/images/placeholder.jpg'
import Image from '../Image';

const Card = (props) => {
  const { poster_path, vote_average, title, id } = props;
  return (
    <>
      <div className={classes.card}>
        <div className={classes.img_block}>
          <Image className={classes.img} src={poster_path ? `https://image.tmdb.org/t/p/w500` + poster_path : placeholderImage} alt="" />
          
        </div>
          <div className={classes.content}>
            <span>{vote_average}</span>
            <Link className={classes.link} to={`/movie/${id}`}>
              Learn more
            </Link>
          </div>
        </div>
        <h4 className={classes.title}>{title}</h4>
    </>
  );
};

export default Card;