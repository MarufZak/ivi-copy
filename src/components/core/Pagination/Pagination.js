import classes from './Pagination.module.css';
import ReactPaginate from 'react-paginate';
import usePopularContext from '../../../hooks/usePopularContext';

const Pagination = ({pageCount}) => {
  const {state,setPage} = usePopularContext();

  const handlePageChange = (e)=>{
    setPage(e.selected+1);

    window.scrollTo({top: 0})
  }

  return (
    <ReactPaginate
      onPageChange={handlePageChange}
      pageCount={pageCount}
      initialPage={state.page-1}
      containerClassName={classes.pagination}
      pageClassName={classes.item}
      pageLinkClassName={classes.link}
      activeClassName={classes.active}
      breakClassName={classes.item}
      nextLabel={``}
      previousLinkClassName={classes.link}
      nextLinkClassName={classes.link}
      previousLabel=""
      previousClassName={`${classes.btn} ${classes.btnPrev}`}
      nextClassName={`${classes.btn} ${classes.btnNext}`}
    />
  );
};

export default Pagination;