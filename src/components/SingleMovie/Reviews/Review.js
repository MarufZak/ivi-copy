import Icon from "../../core/Icon";

const Review = (props) => {
  const { author_details, content, created_at: date } = props;

  return (
    <div className="review">
      <h3 className="review__author">{author_details?.username}</h3>
      <p className="review__text">{content}</p>
      <footer className="review__footer">
        <span className="review__date">{date?.slice(0, 7)}</span>
        <div className="review__rating">
          <span className="review__icon">
            <Icon>like</Icon>
          </span>
          <span className="review__rate">{author_details?.rating}</span>
          <span className="review__icon">
            <Icon>dislike</Icon>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Review;
