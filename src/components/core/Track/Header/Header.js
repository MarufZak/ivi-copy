import classes from './Header.module.css';


const Header = ({title}) => {
  return (
    <>
      <header className={classes.header}>
        <h2 className={classes.title}>{title}</h2>
      </header>
    </>
  );
};

export default Header;
