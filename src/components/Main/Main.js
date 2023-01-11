import { useEffect } from 'react';
import classes from './Main.module.css'
import Intro from './Intro/Intro';
import Content from './Content/Content';
import {Loading} from '../core';
import {useMainContext,useGlobalContext} from '../../hooks';

const Main = () => {
  const {fetchMain} = useMainContext();
  const {state:globalState} = useGlobalContext();

  useEffect(()=>{
    fetchMain();
  },[])

  if (globalState.isLoading) {
    return <Loading/>
  }

  return <main className={classes.main}>
    <Intro />
    <Content />
  </main>
}

export default Main;