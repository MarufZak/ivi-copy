import classes from './Login.module.css';
import useAuthContext from '../../hooks/useAuthContext';
import { useState } from 'react';
import { auth } from '../../firebase/firebase';
import {NotFound} from '../core'
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const { login } = useAuthContext();

  const handleSubmit = (e)=>{
    e.preventDefault();

    login(email,password);
  }

  if (auth.currentUser) {
    console.log(auth.currentUser);
    return <Navigate to="/notfound" />
  }

  return <div className={classes.login}>
    <div className="container">
        <div className={classes.body}>
            <h2 className={classes.title}>Login</h2>
            <form onSubmit={handleSubmit} className={classes.form}>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} required className={classes.input} type="email" placeholder="Email" />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} required className={classes.input} type="password" placeholder="Password" />
                <button type="submit" className={`btn btn--red ${classes.btn}`}>Login</button>
            </form>
        </div>
    </div>
  </div>
}

export default Login;