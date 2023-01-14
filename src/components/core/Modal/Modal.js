import classes from "./Modal.module.css";
import { createPortal } from "react-dom";
import useGlobalContext from '../../../hooks/useGlobalContext';

const Modal = () => {
  const {state,hideModal} = useGlobalContext();

  const handleClick = ()=>{
    hideModal();
  }

  return createPortal(
    <>
      <div className={`${classes.modal} ${state.modal.state || classes.hide}`}>
        <div className={classes.body}>
          <h2 className={classes.title}>{state.modal.title}</h2>
          <p className={classes.text}>{state.modal.text}</p>
          <button onClick={handleClick} className="btn btn--red">
            Close modal
          </button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
