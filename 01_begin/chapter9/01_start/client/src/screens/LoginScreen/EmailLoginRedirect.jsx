import { useGetVerifyEmailTokenQuery } from "../../redux/apiSlices/extendedAuth";
import Message from "../../components/Message";
import Modal from "../../components/Modal";
import WhiteLoader from "../../components/WhiteLoader";
import "./EmailLoginRedirect.scss";

const AuthRedirect = () => {
  const token = window.location.href.split("/").pop();

  const { data, isLoading } = useGetVerifyEmailTokenQuery(token);

  const ValidCheck = (
    <div className="container">
      <Message
        backgroundColor={data ? "rgb(212, 237, 218)" : "#f8d7da"}
        width="80%"
        height="5rem"
        borderRadius="0.25rem"
        border="1px solid transparent"
      >
        {data ? (
          <div className="auth__msg" style={{ fontColor: "#155724" }}>
            이메일이 인증 되었습니다
          </div>
        ) : (
          <div className="auth__msg" style={{ fontColor: "#721c24" }}>
            유효하지 않은 이메일 인증입니다
          </div>
        )}
      </Message>
    </div>
  );

  return isLoading ? (
    <Modal>
      <WhiteLoader />
    </Modal>
  ) : (
    ValidCheck
  );
};

export default AuthRedirect;
