import '../../styles/header.css';
import Logo from '../core/Logo';
import HeaderList from './List';
import HeaderProfile from './Profile';

const Header = () => {
  return <header className="header">
    <div className="container">
        <nav className="header__nav">
            <Logo />
            <HeaderList/>
            <HeaderProfile/>
        </nav>
    </div>
  </header>
}

export default Header;