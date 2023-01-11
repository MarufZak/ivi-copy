import List from "./List/List";
import classes from "./Header.module.css";
import {Logo} from "../core";
import Search from "./Search/Search";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className="container">
        <nav className={classes.nav}>
          <Logo />
          <List />
          <Search />
        </nav>
      </div>
    </header>
  );
};

export default Header;
