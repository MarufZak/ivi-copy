import { Link } from "react-router-dom";
import classes from "./List.module.css";

const List = () => {
  return (
    <ul className={classes.list}>
      <li className={classes.item}>
        <Link to="/popular">Популярные</Link>
      </li>
    </ul>
  );
};

export default List;
