import { useContext } from 'react';
import { MainContext } from '../context/MainContext';

const useMainContext = () => {
  return useContext(MainContext);
}

export default useMainContext;