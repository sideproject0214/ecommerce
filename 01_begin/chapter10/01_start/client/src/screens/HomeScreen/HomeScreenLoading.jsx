import "./HomeScreenLoading.scss";

export const MainLoading = () => {
  return (
    <>
      <div className="_header">
        <nav className="nav">
          <div className="navigation container">
            <div className="_logo"></div>
            <div className="_nav-link"></div>
          </div>
        </nav>
      </div>

      <section id="_hero">
        <div className="hero-main container ">
          <div className="_hero-contents"></div>
          <div className="_image"></div>
          <i className="_left_arrow"></i>
          <i className="_right_arrow"></i>
        </div>
        <div className="carousel-bottom">
          <div className="_carousel-circle"></div>
        </div>
      </section>
      <div className="section lastest">
        <div className="title">
          <h1>최신상품</h1>
        </div>
        <div className="search-box container">
          <input type="text" className="search-bar" />
        </div>
      </div>
      <div className="product-center container">
        <div className="product">
          <div className="product-header _product-header"></div>
          <div className="product-footer">
            <div className="_product-footer__name"></div>
            <div className="_product-footer__price"></div>
          </div>
        </div>
        <div className="product">
          <div className="product-header _product-header"></div>
          <div className="product-footer">
            <div className="_product-footer__name"></div>
            <div className="_product-footer__price"></div>
          </div>
        </div>
        <div className="product">
          <div className="product-header _product-header"></div>
          <div className="product-footer">
            <div className="_product-footer__name"></div>
            <div className="_product-footer__price"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLoading;
