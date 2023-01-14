import { Link } from "react-router-dom";
import classes from "./List.module.css";
import useAuthContext from "../../../hooks/useAuthContext";
import { useEffect } from 'react';
import useGlobalContext from '../../../hooks/useGlobalContext';

const List = () => {
  const { state } = useAuthContext();
  const { showModal } = useGlobalContext();
  
  useEffect(()=>{
    if (state.user?.isEmailVerified) {
      showModal("Success", "you have verified your email");
    }
  },[state.user.isEmailVerified])

  return (
    <ul className={classes.list}>
      <li className={classes.item}>
        <Link to="/popular">Популярные</Link>
      </li>
      {Object.keys(state.user).length > 0 && (
        <li className={classes.item}>
          <Link to="/favorite">Избранные</Link>
        </li>
      )}
    </ul>
  );
};

export default List;
