import classes from './Main.module.css'
import Intro from './Intro/Intro';
import Content from './Content/Content';
import {Loading} from '../core';
import useMainContext from '../../hooks/useMainContext';

const Main = () => {
  const {state} = useMainContext();

  if (state.popular_movies_loading || state.trend_movies_loading || state.rated_movies_loading) {
    return <Loading/>
  }

  return <main className={classes.main}>
    <Intro />
    <Content />
  </main>
}

export default Main;