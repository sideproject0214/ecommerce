import React, { useRef, useState } from "react";

const Carousel2 = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  let length = "";

  if (slides && slides.length >= 0) {
    length = slides.length;
  }

  const imageSliderRef = useRef(null);
  const contentsSliderRef = useRef(null);

  const nextSlider = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    imageSliderRef.current.style.transform = `translate3d(${current}00*2%,0,0)`;
    contentsSliderRef.current.style.transform = `translate3d(${current}00*2%,0,0)`;
  };
  const prevSlider = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    imageSliderRef.current.style.transform = `translate3d(-${current}00*2%,0,0)`;
    contentsSliderRef.current.style.transform = `translate3d(-${current}00*2%,0,0)`;
  };

  const createDotNum = (index) => {
    setCurrent(index);
  };

  // useEffect(() => {
  //   sliderRef.current.style.transition = "all 3s ease-in-out";
  //   sliderRef.current.style.transform = `translateX(-${current}00%)`;
  // }, [current]);

  return (
    <section id="hero">
      <div className="hero-main container">
        {slides.map((slide, index) => (
          <>
            <div className={current === index ? "hero-contents" : "passive"}>
              <h2>
                <span className="discount">
                  {slide.sale ? slide.sale : ""}%
                </span>{" "}
                SUPER SALE
              </h2>
              <h1>
                <span>신년맞이</span>
                <span>감사 대잔치</span>
                <p>{slide.name ? slide.name : ""} </p>
              </h1>
              <div className="buy-btn">
                <a href="#home" className="btn">
                  구 매 하 기
                </a>
              </div>
            </div>

            <div className={current === index ? "image" : "passive"}>
              <img src={slide.image} alt={slide.name} className="hero-img" />
            </div>
          </>
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
          {slides.map((_, index) => {
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
  );
};

export default Carousel2;
