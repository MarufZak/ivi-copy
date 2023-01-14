import classes from './Header.module.css';

const Header = () => {
  return <header className={classes.header}>
    <h2 className={classes.title}>Popular movies</h2>
  </header>
}

export default Header;