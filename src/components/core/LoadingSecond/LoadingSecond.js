import classes from "./LoadingSecond.module.css";

const LoadingSecond = () => {
  return (
    <div class={classes.spinner}>
      <div class={classes.bounce1}></div>
      <div class={classes.bounce2}></div>
      <div class={classes.bounce3}></div>
    </div>
  );
};

export default LoadingSecond;
