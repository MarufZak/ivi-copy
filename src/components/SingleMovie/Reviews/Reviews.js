import "../../../styles/reviews.css";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Review from "./Review";
import Icon from "../../core/Icon";

const Reviews = ({ reviews }) => {
  console.log(reviews);
  return (
    <div className="reviews">
      <header className="reviews__header">
        <h2 className="reviews__title">{reviews?.length>0 ? 'Отзывы': 'Нет отзывов'}</h2>
      </header>
      <Splide
        className="reviews__slider"
        options={{
          perPage: 4,
          gap: 24,
          pagination: false,
          breakpoints: {
            992: {
              perPage: 4,
            },
            578: {
              perPage: 3,
            },
            360: {
              perPage: 2,
            },
          },
        }}
        hasTrack={false}
      >
        <SplideTrack>
          {reviews?.map((review) => (
            <SplideSlide className="reviews__slide">
              <Review {...review} />
            </SplideSlide>
          ))}
        </SplideTrack>
        <div className="splide__arrows">
          <button className="splide__arrow splide__arrow--prev reviews__slider-arrow">
            <Icon>arrow</Icon>
          </button>
          <button className="splide__arrow splide__arrow--next reviews__slider-arrow">
            <Icon>arrow</Icon>
          </button>
        </div>
      </Splide>
    </div>
  );
};

export default Reviews;
