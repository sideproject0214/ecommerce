import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="section footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-center">
            <h3>EXTRAS</h3>
            <Link to="#">브랜드</Link>
            <Link to="#">광고제휴</Link>
          </div>
          <div className="footer-center">
            <h3>CONTACT US</h3>
            <Link to="#">회사이름 : 싸플공작소</Link>
            <Link to="#">주 소 : 서울특별시 관악구 신림동</Link>
            <Link to="#">이메일 : sideproject0214@gmail.com </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
