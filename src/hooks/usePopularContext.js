
import { useContext } from 'react';
import { PopularContext } from '../context/PopularContext';

const usePopularContext = () => {
  return useContext(PopularContext)
}

export default usePopularContext;