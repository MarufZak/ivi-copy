import classes from "./Arrows.module.css";
import { Icon } from "../../../core";

const Arrows = () => {
  return (
    <div aria-label="Custom Arrows Example" className={`splide__arrows ${classes.arrows}`}>
      <button className={`splide__arrow splide__arrow--prev ${classes.arrow}`}>
        <Icon>arrow</Icon>
      </button>
      <button className={`splide__arrow splide__arrow--next ${classes.arrow}`}>
        <Icon>arrow</Icon>
      </button>
    </div>
  );
};

export default Arrows;