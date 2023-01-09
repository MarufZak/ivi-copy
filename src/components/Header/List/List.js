import classes from './List.module.css';

const List = () => {
    return <ul className={classes.list}>
      <li className={classes.item}>
        <a href="/" className={classes.link}>Мой Иви</a>
      </li>
      <li className={classes.item}>
        <a href="/" className={classes.link}>Что нового</a>
      </li>
      <li className={classes.item}>
        <a href="/" className={classes.link}>Фильмы</a>
      </li>
      <li className={classes.item}>
        <a href="/" className={classes.link}>Сериалы</a>
      </li>
      <li className={classes.item}>
        <a href="/" className={classes.link}>Мультфильмы</a>
      </li>
    </ul>
  }
  
  export default List;