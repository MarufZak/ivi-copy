import classes from "./Review.module.css";

const Review = (props) => {
  const { author_details, content, created_at: date } = props;

  return (
    <div className={classes.review}>
      <h3 className={classes.author}>{author_details?.username}</h3>
      <p className={classes.text}>{content}</p>
      <footer className={classes.footer}>
        <span className={classes.date}>{date?.slice(0, 7)}</span>
        <span className={classes.rate}>{author_details?.rating}</span>
      </footer>
    </div>
  );
};

export default Review;
