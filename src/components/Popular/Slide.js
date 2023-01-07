import { SplideSlide } from "@splidejs/react-splide";


const Slide = (props) => {
  const {poster_path,vote_average,release_date,genre_ids: genres,title} = props;
  return <SplideSlide className="popular__slide">
    <div className="popular__slide-img">
      <img src={`https://image.tmdb.org/t/p/w500`+poster_path} alt="" />
    <div className="popular__slide-content">
      <span>{vote_average}</span>
    </div>
    </div>
    <h4 className="popular__slide-title">
      {title}
    </h4>
  </SplideSlide>
}

export default Slide;