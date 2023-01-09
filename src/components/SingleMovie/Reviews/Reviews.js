import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Icon from "../../core/Icon";
import classes from './Reviews.module.css';
import Review from './Review/Review';

const Reviews = ({ reviews }) => {
  return (
    <div className={classes.reviews}>
      <header className={classes.header}>
        <h2 className={classes.title}>
          {reviews?.length > 0 ? "Отзывы" : "Нет отзывов"}
        </h2>
      </header>
      <Splide
        className={classes.slider}
        options={{
          perPage: 4,
          gap: 24,
          pagination: false,
          breakpoints: {
            1280: {
              perPage: 3,
            },
            950: {
              perPage: 2,
            },
            700: {
              perPage: 1,
            },
          },
        }}
        hasTrack={false}
      >
        <SplideTrack>
          {reviews?.map((review) => (
            <SplideSlide>
              <Review {...review} />
            </SplideSlide>
          ))}
        </SplideTrack>
        {reviews?.length > 0 && (
          <div className={`splide__arrows ${classes.slider__arrows}`}>
            <button className={`splide__arrow--prev ${classes.slider__arrow}`}>
              <Icon>arrow</Icon>
            </button>
            <button className={`splide__arrow--next ${classes.slider__arrow}`}>
              <Icon>arrow</Icon>
            </button>
          </div>
        )}
      </Splide>
    </div>
  );
};

export default Reviews;
