import { Link } from "react-router-dom";
import logoImage from "../../assets/images/logo.svg";

const Logo = ({ className }) => {
  return (
    <Link to="/">
      <img className={`logo ${className ?? ""}`} src={logoImage} alt="logo" />
    </Link>
  );
};

export default Logo;
