import HeaderProvider from "../../context/HeaderContext";
import List from './List/List';
import classes from './Header.module.css';
import Logo from '../core/Logo/Logo';

const Header = () => {


  return (
    <HeaderProvider>
      <header className={classes.header}>
        <div className="container">
          <nav className={classes.nav}>
            <Logo />
            <List />
          </nav>
        </div>
      </header>
    </HeaderProvider>
  );
};

export default Header;
