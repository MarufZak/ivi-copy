import logoImage from '../../assets/images/logo.svg'

const Logo = ({className}) => {
  return <img className={`logo ${className??''}`} src={logoImage} alt="logo" />
}

export default Logo;