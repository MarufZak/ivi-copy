import { Link } from "react-router-dom";
import logoImage from "../../../assets/images/logo.svg";
import classes from "./Logo.module.css";

const Logo = ({ className }) => {
  return (
    <Link to="/">
      <img
        className={`${classes.logo} ${className ?? ""}`}
        src={logoImage}
        alt="logo"
      />
    </Link>
  );
};

export default Logo;
