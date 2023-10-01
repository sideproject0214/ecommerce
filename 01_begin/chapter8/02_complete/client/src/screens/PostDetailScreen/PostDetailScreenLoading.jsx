import "./PostDetailScreenLoading.scss";

const PostDetailPresenterLoading = () => {
  return (
    <>
      <section className="section _product-detail ">
        <div className="_details container-md">
          <div className="_left">
            <div className="_main"></div>
            <div className="_thumbnails">
              <div className="_thumbnail"></div>
              <div className="_thumbnail"></div>
              <div className="_thumbnail"></div>
              <div className="_thumbnail"></div>
            </div>
          </div>
          <div className="_right">
            <div className="_productOne-category"></div>
            <div className="_productOne-name"></div>
            <div className="_price-div"></div>
            <div className="_deliveryFee"></div>
            <div className="_rating"></div>
            <div className="_select"></div>
            <div className="_description"></div>
          </div>
        </div>
      </section>
      <div className="_review-table-container container-md"></div>
    </>
  );
};

export default PostDetailPresenterLoading;
