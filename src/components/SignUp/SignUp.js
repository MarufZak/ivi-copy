import classes from "./SignUp.module.css";
import useAuthContext from "../../hooks/useAuthContext";
import { useState } from "react";
import {NotFound} from '../core'
import { auth } from "../../firebase/firebase";

const SignUp = () => {
  const {signup} = useAuthContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(name,email,password);
  };

  if (auth.currentUser) {
    return <NotFound />
  }

  return (
    <div className={classes.signup}>
      <div className="container">
        <div className={classes.body}>
          <h2 className={classes.title}>Sign Up</h2>
          <form onSubmit={handleSubmit} className={classes.form}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={classes.input}
              type="text"
              placeholder="Name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={classes.input}
              type="email"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={classes.input}
              type="password"
              placeholder="Password"
            />
            <button type="submit" className={`btn btn--red ${classes.btn}`}>
              Sign up
            </button>
            <button type="button" className={`btn btn--red ${classes.btn}`}>
              Login with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
