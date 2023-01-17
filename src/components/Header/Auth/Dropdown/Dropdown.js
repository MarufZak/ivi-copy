import { Link } from 'react-router-dom';
import classes from './Dropdown.module.css';
import useAuthContext from '../../../../hooks/useAuthContext';

const Dropdown = ({isDropdownActive}) => {
  const {state,signout} = useAuthContext();
  return <div className={`${classes.dropdown} ${isDropdownActive?classes.active:''}`}>
    { 
      state.user.name ? <button onClick={signout} className='btn btn--red' to="/signout">Выйти</button>
      : <>
      <Link to="/login" className='btn btn--red'>Войти</Link>
    <Link to="/signup" className='btn btn--red'>Зарегестрироваться</Link>
    </>
    }
  </div>
}

export default Dropdown;