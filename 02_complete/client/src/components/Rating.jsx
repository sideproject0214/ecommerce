import "./Rating.scss";

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        <i
          className={
            value >= 1
              ? "fa-solid fa-star"
              : value >= 0.5
              ? "fa-solid fa-star-half-alt"
              : "far fa-star"
          }
          style={{ color }}
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 2
              ? "fa-solid fa-star"
              : value >= 1.5
              ? "fa-solid fa-star-half-alt"
              : "far fa-star"
          }
          style={{ color }}
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 3
              ? "fa-solid fa-star"
              : value >= 2.5
              ? "fa-solid fa-star-half-alt"
              : "far fa-star"
          }
          style={{ color }}
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 4
              ? "fa-solid fa-star"
              : value >= 3.5
              ? "fa-solid fa-star-half-alt"
              : "far fa-star"
          }
          style={{ color }}
        ></i>
      </span>
      <span>
        <i
          className={
            value >= 5
              ? "fa-solid fa-star"
              : value >= 4.5
              ? "fa-solid fa-star-half-alt"
              : "far fa-star"
          }
          style={{ color }}
        ></i>
      </span>
      <span className="rating__text">{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
