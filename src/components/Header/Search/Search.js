import Icon from '../../core/Icon';
import Form from './Form/Form';
import classes from './Search.module.css'
import { useHeaderContext } from '../../../hooks/useHeaderContext';

const Search = () => {
  const {searchTrue} = useHeaderContext();

  const handleClick = ()=>{
    searchTrue();

    document.body.classList.add('lock');
  }

  return <div className={classes.search}>
    <span onClick={handleClick}>
      <Icon className={classes.icon}>search</Icon>
    </span>
    <Form />
  </div>
}

export default Search;