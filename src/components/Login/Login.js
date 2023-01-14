import classes from './Login.module.css';
import useAuthContext from '../../hooks/useAuthContext';
import useGlobalContext from '../../hooks/useGlobalContext';

const Login = () => {
  const { state,changeEmail, changePassword,login,loginWithGoogle } = useAuthContext();
  const {showModal} = useGlobalContext();

  const handleSubmit = (e)=>{
    e.preventDefault();

    login();
  }

  const handleLoginWithGoogle = (e)=>{
    loginWithGoogle();
  }


  return <div className={classes.login}>
    <div className="container">
        <div className={classes.body}>
            <h2 className={classes.title}>Login</h2>
            <form onSubmit={handleSubmit} className={classes.form}>
                <input required onChange={(e)=>changeEmail(e.target.value)} value={state.email} className={classes.input} type="email" placeholder="Email" />
                <input required onChange={(e)=>changePassword(e.target.value)} value={state.password} className={classes.input} type="password" placeholder="Password" />
                <button type="submit" className={`btn btn--red ${classes.btn}`}>Login</button>
                <button onClick={handleLoginWithGoogle} type="button" className={`btn btn--red ${classes.btn}`}>Login with Google</button>
            </form>
        </div>
    </div>
  </div>
}

export default Login;