import { useContext } from 'react';
import { HeaderContext } from '../context/HeaderContext';


export const useHeaderContext = () => {
  return useContext(HeaderContext);
};
