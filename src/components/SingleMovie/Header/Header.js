import classes from './Header.module.css';

const Header = ({ genres }) => {
    return (
      <header className={classes.header}>
        <ul className={classes.genres}>
          {genres?.map((genre) => (
            <li key={genre.id} className={classes.genre}>
              {genre.name}
            </li>
          ))}
        </ul>
      </header>
    );
  };
  
  export default Header;
  