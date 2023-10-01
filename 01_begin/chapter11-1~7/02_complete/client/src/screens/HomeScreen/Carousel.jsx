import { useState } from "react";
import { Link } from "react-router-dom";
import "./Carousel.scss";

const Carousel = ({ posts }) => {
  const [current, setCurrent] = useState(0);

  let length = "";

  if (posts?.ids.length - 6 >= 0) {
    length = 6;
  } else {
    length = posts?.ids.length;
  }
  console.log(posts, "Carousel posts");

  const nextSlider = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlider = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const createDotNum = (index) => {
    setCurrent(index);
  };

  return (
    <>
      <section id="hero">
        <div className="container">
          {posts?.ids.map((id, index) => (
            <div
              key={index}
              className={current === index ? "hero-main" : "passive"}
            >
              <div className="hero-contents">
                {posts?.entities[id].sale ? (
                  <h2>
                    <span className="discount">
                      {posts?.entities[id].sale ? posts?.entities[id].sale : ""}
                      %
                    </span>{" "}
                    SUPER SALE
                  </h2>
                ) : (
                  ""
                )}
                <h1>
                  <span>신년맞이</span>
                  <span>감사 대잔치</span>
                  <p>
                    {posts?.entities[id].name ? posts?.entities[id].name : ""}{" "}
                  </p>
                </h1>
                <div className="buy-btn">
                  <Link
                    to={`post/${posts?.entities[id].uuid}`}
                    key={index}
                    className="btn"
                  >
                    구 매 하 기
                  </Link>
                </div>
              </div>

              <div className="image">
                <img
                  src={posts?.entities[id].image}
                  alt={posts?.entities[id].name}
                  className="hero-img"
                />
              </div>
            </div>
          ))}

          <i
            className="fa-solid fa-chevron-circle-left left-arrow"
            onClick={prevSlider}
          ></i>
          <i
            className="fa-solid fa-chevron-circle-right right-arrow"
            onClick={nextSlider}
          ></i>
        </div>

        <div className="carousel-bottom">
          <span>
            {posts?.ids.map((_, index) => {
              return (
                <i
                  key={index}
                  className={
                    index === current
                      ? "fa-solid fa-circle carousel-circle active"
                      : "fa-solid fa-circle carousel-circle"
                  }
                  onClick={() => createDotNum(index)}
                ></i>
              );
            })}
          </span>
        </div>
      </section>
    </>
  );
};

export default Carousel;
