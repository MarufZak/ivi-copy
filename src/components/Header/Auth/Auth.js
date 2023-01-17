import classes from "./Auth.module.css";
import { Icon, Loading } from "../../core";
import useAuthContext from "../../../hooks/useAuthContext";
import Dropdown from "./Dropdown/Dropdown";
import { useState } from "react";
import { auth } from "../../../firebase/firebase";

const Auth = () => {
  const { state } = useAuthContext();

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  if (state.isLoading) return;

  return (
    <div
      onMouseLeave={() => setIsDropdownActive(false)}
      onMouseEnter={() => setIsDropdownActive(true)}
      className={classes.auth}
    >
      {state.user?.name ? (
        <span className={classes.icon}>
          {auth.currentUser?.displayName[0].toUpperCase()}
        </span>
      ) : (
        <span className={classes.icon}>
          <Icon>user</Icon>
        </span>
      )}
      <Dropdown isDropdownActive={isDropdownActive} />
    </div>
  );
};

export default Auth;
