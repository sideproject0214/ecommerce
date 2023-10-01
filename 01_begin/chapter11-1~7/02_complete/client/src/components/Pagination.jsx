import PropTypes from "prop-types";
import "./Pagination.scss";

const Pagination = ({ value, divisor, page, setPage }) => {
  console.log(value, divisor, page);
  const result = [];

  for (let i = 0; i < value / divisor; i++) {
    result.push(i);
  }
  // console.log(result, "CountNumbering");
  return (
    <div className="review-count-container">
      {page === 0 ? (
        <div className="" style={{ width: "50px" }}></div>
      ) : (
        <div className="review-count-first" onClick={() => setPage(0)}>
          <p>처음</p>
        </div>
      )}

      <div className="review-count-content">
        {result.map((value, index) => (
          <div
            className={
              page === index ? "table-count-area show" : "table-count-area"
            }
            key={index}
            onClick={() => setPage(index)}
          >
            <div className="table-count-value">{value + 1}</div>
          </div>
        ))}
      </div>

      <div
        className="review-count-last"
        onClick={() => {
          if (page < value / divisor) {
            setPage(page + 1);
          }
        }}
      >
        {page + 1 >= value / divisor ? "" : <p>다음</p>}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
};

Pagination.defaultProps = {
  page: 5,
};

export default Pagination;
