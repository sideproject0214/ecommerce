import React from "react";

export const MainLoading = () => {
  return (
    <>
      <div className="_header">
        <nav className="nav">
          <div className="navigation container">
            {/* <div className="_logo"></div>
            <div className="menu">
              <ul className="_nav-list"></ul>
            </div> */}
          </div>
        </nav>

        <section id="hero">
          <div className="hero-main container ">
            <div className="_hero-contents"></div>
            <div className="_image"></div>
            <i className="fas fa-chevron-circle-left left-arrow"></i>
            <i className="fas fa-chevron-circle-right right-arrow"></i>
          </div>
        </section>
      </div>
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
