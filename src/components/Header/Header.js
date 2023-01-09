import Logo from "../core/Logo";
import HeaderProvider from "../../context/HeaderContext";
import List from './List/List';
import Search from './Search/Search';
import classes from './Header.module.css';

const Header = () => {


  return (
    <HeaderProvider>
      <header className={classes.header}>
        <div className="container">
          <nav className={classes.nav}>
            <Logo />
            <List />
            <Search />
          </nav>
        </div>
      </header>
    </HeaderProvider>
  );
};

export default Header;
