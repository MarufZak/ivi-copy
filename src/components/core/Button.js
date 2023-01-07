

const Button = ({children,className,color}) => {
  return <button className={`btn btn--${color||'red'} ${className??''}`}>{children}</button>
}

export default Button;