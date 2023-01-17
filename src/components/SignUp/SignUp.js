import classes from "./SignUp.module.css";
import useAuthContext from "../../hooks/useAuthContext";
import Loading from '../core/Loading/Loading';

const SignUp = () => {
  const {
    changeEmail,
    changePassword,
    state,
    signup,
    loginWithGoogle,
    changeName,
  } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup();
  };

  const handleLoginWithGoogle = () => {
    loginWithGoogle();
  };

  if (state.isLoading) {
    return <Loading />
  }

  if (!state.user.isEmailVerified) {
    return <div className={classes.signup}>
      <div className="container">
        <div className={classes.body}>
          <h2 className={classes.title}>Confirmation email is sent to your email , please confirm it.</h2>
        </div>
      </div>
    </div>
  }

  return (
    <div className={classes.signup}>
      <div className="container">
        <div className={classes.body}>
          <h2 className={classes.title}>Sign Up</h2>
          <form onSubmit={handleSubmit} className={classes.form}>
            <input required
              value={state.name}
              onChange={(e) => changeName(e.target.value)}
              className={classes.input}
              type="text"
              placeholder="Name"
            />
            <input required
              value={state.email}
              onChange={(e) => changeEmail(e.target.value)}
              className={classes.input}
              type="email"
              placeholder="Email"
            />
            <input required
              value={state.password}
              onChange={(e) => changePassword(e.target.value)}
              className={classes.input}
              type="password"
              placeholder="Password"
            />
            <button type="submit" className={`btn btn--red ${classes.btn}`}>
              Login
            </button>
            <button
              onClick={handleLoginWithGoogle}
              type="button"
              className={`btn btn--red ${classes.btn}`}
            >
              Login with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
