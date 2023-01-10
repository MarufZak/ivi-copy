import { Link } from "react-router-dom";
import logoImage from "../../../assets/images/logo.svg";
import classes from "./Logo.module.css";
import Image from "../Image";

const Logo = ({ className }) => {
  return (
    <img
      className={`${classes.logo} ${className ?? ""}`}
      src={logoImage}
      alt="logo"
    />
  );
};

export default Logo;
