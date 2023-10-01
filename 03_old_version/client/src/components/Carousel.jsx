import React, { useState } from "react";
import { Link } from "react-router-dom";

const Carouselnana = ({ products, loading }) => {
  const [current, setCurrent] = useState(0);
  const carouselArr = products.slice(products.length - 6, products.length);
  let length = "";

  if (products && products.length - 6 >= 0) {
    length = 6;
  } else {
    length = products.length;
  }
  console.log(products, "Carousel Products");
  // const imageSliderRef = useRef();
  // const contentsSliderRef = useRef();

  const nextSlider = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    // imageSliderRef.current.style.transform = `translate3d(${current}00*2%,0,0)`;
    // contentsSliderRef.current.style.animation = `leftRight 3s ease`;
  };
  const prevSlider = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    // imageSliderRef.current.style.transform = `translate3d(-${current}00*2%,0,0)`;
    // contentsSliderRef.current.style.animation = `translate3d(${current}00*2%,0,0)`;
    // contentsSliderRef.current.style.animation = `translate3d(${current}00*2%,0,0)`;
  };

  const createDotNum = (index) => {
    setCurrent(index);
  };

  return (
    <>
      <section id="hero">
        <div className="container">
          {carouselArr.map((slide, index) => (
            <div
              key={index}
              className={current === index ? "hero-main" : "passive"}
            >
              <div className="hero-contents">
                {slide.sale ? (
                  <h2>
                    <span className="discount">
                      {slide.sale ? slide.sale : ""}%
                    </span>{" "}
                    SUPER SALE
                  </h2>
                ) : (
                  ""
                )}
                <h1>
                  <span>신년맞이</span>
                  <span>감사 대잔치</span>
                  <p>{slide.name ? slide.name : ""} </p>
                </h1>
                <div className="buy-btn">
                  <Link
                    to={`product/${slide.uuid}`}
                    key={index}
                    className="btn"
                  >
                    구 매 하 기
                  </Link>
                  {/* <a href="#home" className="btn">
                  
                </a> */}
                </div>
              </div>

              <div className="image">
                <img src={slide.image} alt={slide.name} className="hero-img" />
              </div>
            </div>
          ))}

          <i
            className="fas fa-chevron-circle-left left-arrow"
            onClick={prevSlider}
          ></i>
          <i
            className="fas fa-chevron-circle-right right-arrow"
            onClick={nextSlider}
          ></i>
        </div>

        <div className="carousel-bottom">
          <span>
            {carouselArr.map((_, index) => {
              return (
                <i
                  key={index}
                  className={
                    index === current
                      ? "fas fa-circle carousel-circle active"
                      : "fas fa-circle carousel-circle"
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

export default Carouselnana;
