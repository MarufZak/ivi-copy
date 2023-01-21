import classes from "./Popup.module.css";
import Form from "./Form/Form";
import Results from "./Results/Results";
import {Icon,Loading} from "../../../core";
import { createPortal } from "react-dom";
import { useHeaderContext } from "../../../../hooks";

const Popup = () => {
  const { hidePopup } = useHeaderContext();

  return createPortal(
    <div className={classes.popup}>
      <div className={classes.wrapper}>
        <div className="container">
          <div className={classes.body}>
            <span onClick={hidePopup} className={classes.icon}>
              <Icon>close</Icon>
            </span>
            <Form />
            <Results/>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Popup;