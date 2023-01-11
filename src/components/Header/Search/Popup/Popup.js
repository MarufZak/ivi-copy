import classes from "./Popup.module.css";
import Form from "./Form/Form";
import Results from "./Results/Results";
import {Icon,Loading} from "../../../core";
import { createPortal } from "react-dom";
import { useHeaderContext,useGlobalContext } from "../../../../hooks";

const Popup = () => {
  const { hidePopup } = useHeaderContext();
  const { state: globalState } = useGlobalContext();

  return createPortal(
    <div className={classes.popup}>
      <div className={classes.wrapper}>
        <div className="container">
          <div className={classes.body}>
            <span onClick={hidePopup} className={classes.icon}>
              <Icon>close</Icon>
            </span>
            <Form />
            {globalState.isLoading ? <Loading /> : <Results />}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Popup;
