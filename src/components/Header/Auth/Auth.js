import classes from "./Auth.module.css";
import { Icon, Loading } from "../../core";
import useAuthContext from "../../../hooks/useAuthContext";
import Dropdown from "./Dropdown/Dropdown";
import { useState } from "react";

const Auth = () => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const {state} = useAuthContext();
  console.log(state);

  return <>
    {
      (state.user.name && !state.user.emailVerified) && <button className="btn btn--red">Your email is not verified, please verify it!</button>
    }
    <div onClick={()=>setIsDropdownActive(!isDropdownActive)}
    className={classes.auth}>
      <span className={classes.icon}>
        {
          state.user.name
          ? state.user.name[0].toUpperCase()
          : <Icon>user</Icon>
        }
      </span>
      <Dropdown isDropdownActive={isDropdownActive} />
    </div>
  </>
};

export default Auth;
