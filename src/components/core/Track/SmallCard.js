import { Link } from 'react-router-dom';
import '../../../styles/core/card-small.css'

const SmallCard = (props) => {
  const { poster_path, vote_average, genre_ids: genres, title,id } = props;
  return (
    <>
      <div className="card-small">
        <div className="card-small__img">
          <img src={`https://image.tmdb.org/t/p/w500` + poster_path} alt="" />
          <div className="card-small__content">
            <span>{vote_average}</span>
            <Link to={`movie/${id}`}>Learn more</Link>
          </div>
        </div>
        <h4 className="card-small__title">{title}</h4>
      </div>
    </>
  );
};

export default SmallCard;
