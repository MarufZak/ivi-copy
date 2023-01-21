import { Link } from "react-router-dom";
import classes from "./List.module.css";
import useAuthContext from '../../../hooks/useAuthContext';

const List = () => {
  const {state} = useAuthContext();


  return (
    <ul className={classes.list}>
      <li className={classes.item}>
        <Link to="/popular">Популярные</Link>
      </li>
      {
        state.user.name && <li className={classes.item}>
        <Link to="/favorite">Избранные</Link>
      </li>
      }
    </ul>
  );
};

export default List;
