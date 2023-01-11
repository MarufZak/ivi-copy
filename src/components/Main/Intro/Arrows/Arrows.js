import {Icon} from '../../../core';
import classes from './Arrows.module.css';

const Arrows = () => {
  return (
    <div className="splide__arrows">
      <button
        className={`splide__arrow splide__arrow--prev ${classes.arrow}`}
      >
        <Icon>arrow</Icon>
      </button>
      <button
        className={`splide__arrow splide__arrow--next ${classes.arrow}`}
      >
        <Icon>arrow</Icon>
      </button>
    </div>
  );
};

export default Arrows;
