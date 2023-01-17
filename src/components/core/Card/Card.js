import { Link } from "react-router-dom";
import classes from "./Card.module.css";
import Image from '../Image';
import Icon from '../Icon';
import useAuthContext from '../../../hooks/useAuthContext';

const Card = ({poster_path, title, id , onClick}) => {
  const {state,handleLike} = useAuthContext();

  return (
    <>
      <div onClick={onClick} className={classes.card}>
        <div className={classes.img_block}>
          <Image className={classes.img} src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="" />
          <div className={classes.content}>
            <span onClick={()=>handleLike(id,title,poster_path)} className={classes.like}>
              {
                state.user.likedMovies.filter(movie=>movie.id===id).length>0 ?
                <Icon>heart-filled</Icon>
                : <Icon>heart-lined</Icon>
              }
            </span>
            
            <Link className={classes.link} to={`/movie/${id}`}>
              Learn more
            </Link>
          </div>
        </div>
        <h4 className={classes.title}>{title}</h4>
        </div>
    </>
  );
};

export default Card;