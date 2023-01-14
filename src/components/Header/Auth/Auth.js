import classes from "./Auth.module.css";
import {Icon} from "../../core";
import useAuthContext from '../../../hooks/useAuthContext';
import Dropdown from "./Dropdown/Dropdown";
import { useState } from 'react';

const Auth = () => {
  const {state} = useAuthContext();

  const [isDropdownActive,setIsDropdownActive] = useState(false);

  return <div onMouseLeave={()=>setIsDropdownActive(false)} onMouseEnter={()=>setIsDropdownActive(true)} className={classes.auth}>
    {
        Object.keys(state.user).length>0 ? <span className={classes.icon}>{state.user.name[0].toUpperCase()}</span>
        : <span className={classes.icon}><Icon>user</Icon></span>
      }
      <Dropdown isDropdownActive={isDropdownActive} />
  </div>;
};

export default Auth;
