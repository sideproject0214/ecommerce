import { useDispatch } from "react-redux";
import { useGetLatestAddressQuery } from "../../redux/apiSlices/extendedAddress";
import { setAddress } from "../../redux/slices/addressSlice";
import "./LatestAddress.scss";

const LatestAddress = (props) => {
  const dispatch = useDispatch();

  const { data } = useGetLatestAddressQuery();

  const saveAddress = (e) => {
    // console.log(e.target.id, data?.entities, "data?.entities[e.target.id]");
    dispatch(setAddress(data?.entities[e.target.id]));

    props.modalSuccessClose();
    props.setRadioModal(false);
  };

  const closeModal = () => {
    props.setRadioModal(false);
  };

  return (
    <div className="address__container">
      <div className="address__title__container">
        <span className="address__title">최근 배송지</span>
        <span>(주소클릭)</span>
      </div>
      <div>
        {data?.ids.map((addressId, index) => (
          <div
            key={addressId}
            className="address__one__container"
            // onClick={(x) => console.log(x, "LatestAddress")}
          >
            <div className="address__one" onClick={saveAddress} id={addressId}>
              {index + 1}. {`${data?.entities[addressId].shippingAddress}`}
            </div>
          </div>
        ))}
      </div>
      <button onClick={closeModal}>닫기</button>
    </div>
  );
};

export default LatestAddress;
