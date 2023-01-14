import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import classes from "./Reviews.module.css";
import Review from "./Review/Review";
import Arrows from "./Arrows/Arrows";

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
        hasTrack={false}
        options={{
          arrows: reviews.length>0,
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
      >
        <SplideTrack>
          {reviews?.map((review) => (
            <SplideSlide>
              <Review {...review} />
            </SplideSlide>
          ))}
        </SplideTrack>
        <Arrows />
      </Splide>
    </div>
  );
};

export default Reviews;
