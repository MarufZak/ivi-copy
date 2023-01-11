import classes from './Search.module.css'
import {Icon} from '../../core';
import Popup from './Popup/Popup';
import { useHeaderContext } from '../../../hooks';

const Search = () => {
  const {state,showPopup} = useHeaderContext();

  return <>
    <div className={classes.search}>
        <span onClick={showPopup} className={classes.icon}>
          <Icon>search</Icon>
        </span>
        {state.isPopupActive && <Popup/>}
    </div>
  </>
}

export default Search;