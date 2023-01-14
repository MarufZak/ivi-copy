import classes from "./Confirm.module.css";
import useAuthContext from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useEffect } from "react";

const Confirm = () => {
  const { state } = useAuthContext();
  const { showModal } = useGlobalContext();
  const navigation = useNavigate();

  useEffect(() => {
    if (state.user.isEmailVerified) {
      showModal("Success", "Your email has been confirmed");
      navigation("/");
    }
  }, [state.user.isEmailVerified]);

  return (
    <div className={classes.confirm}>
      <div className="container">
        <div className="body">
          We have sent you an email , please confirm it.
        </div>
      </div>
    </div>
  );
};

export default Confirm;
