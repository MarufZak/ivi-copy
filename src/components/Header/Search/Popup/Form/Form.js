import { useRef } from "react";
import classes from "./Form.module.css";
import {Icon} from "../../../../core";
import { useHeaderContext } from '../../../../../hooks';

const Form = () => {
  const {state,fetchSearchMovies,queryChange,clearMovies} = useHeaderContext();
  const inputRef = useRef();

  const handleIconClick = ()=>{
    if (state.query) {
      queryChange("");
    }
    inputRef.current.focus();
  }

  const handleSubmit = (e)=>{
    e.preventDefault();

    clearMovies();

    fetchSearchMovies();
  }


  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <input value={state.query} onChange={(e)=>queryChange(e.target.value)} required ref={inputRef} type="text" className={classes.input} />
      <span onClick={handleIconClick} className={classes.icon}>
        {state.query === "" ? <Icon>search</Icon> : <Icon>close</Icon>}
      </span>
    </form>
  );
};

export default Form;
