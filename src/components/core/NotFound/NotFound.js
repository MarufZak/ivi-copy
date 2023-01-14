import { Link } from 'react-router-dom';
import classes from './NotFound.module.css';

const Error = () => {
  return <div className={classes.error}>
    <div className="container">
        <div className={classes.body}>
            <h2 className={classes.title}>Ошибка</h2>
            <p className={classes.desc}>Запрашиваемой страницы не существует</p>
            <Link to="/" className='btn btn--red'>Перейти на главную страницу</Link>
        </div>
    </div>
  </div>
}

export default Error;