import { useContext } from 'react';
import { HeaderContext } from '../context/HeaderContext';


const useHeaderContext = () => {
  return useContext(HeaderContext);
};

export default useHeaderContext;