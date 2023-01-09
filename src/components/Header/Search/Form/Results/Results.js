import classes from './Results.module.css';
import Card from '../../../../core/Card/Card';

const Results = ({movies}) => {
  return <div className={classes.results}>
    {
      movies?.map(movie=>{
        return <Card {...movie} key={movie.id} />
      })
    }
  </div>
}

export default Results;