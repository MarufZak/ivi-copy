import classes from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

const Pagination = ({pageCount,onPageChange}) => {
  return (
    <ReactPaginate onClick={()=>window.scrollTo({top: 0})}
      onPageChange={onPageChange}
      pageCount={pageCount}
      initialPage={0}
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