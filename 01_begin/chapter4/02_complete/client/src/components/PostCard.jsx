import { Link } from "react-router-dom";
import Rating from "./Rating";
import "./PostCard.scss";

const PostCard = ({ posts }) => {
  return posts.map((post, index) => {
    return (
      <Link to={`post/${post.uuid}`} key={index}>
        <div className="product">
          <div className="product-header">
            <img src={post.image} alt={post.name} />
          </div>
          <div className="product-footer">
            <h3>{post.name}</h3>

            <Rating value={post.rating} text={`${post.numReviews} 리뷰`} />
            <div className="price-area">
              {post.sale !== 0 ? <h2 className="sale">{post.sale}%</h2> : ""}
              <h2 className="price">{`${(
                (post.price * (100 - post.sale)) /
                100
              ).toLocaleString()}원`}</h2>
              {post.sale ? (
                <p className="original-price">{`${post.price.toLocaleString()}원`}</p>
              ) : (
                ""
              )}
            </div>
            <span>
              {post.freeShipping
                ? "무료배송"
                : `배송료: ${post.deliveryFee.toLocaleString()}원`}
            </span>
          </div>
        </div>
      </Link>
    );
  });
};

export default PostCard;
