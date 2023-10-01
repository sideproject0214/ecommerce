import React, { useEffect, useState } from "react";
import { history } from "../../store";

import { useDispatch, useSelector } from "react-redux";

import { KAKAO_API } from "../../config/variables";
import PaymentPresenter from "./PaymentPresenter";
import {
  MODAL_CANCEL_CLOSE_REQUEST,
  MODAL_FAILURE_CLOSE_REQUEST,
  MODAL_OPEN_REQUEST,
  MODAL_SUCCESS_CLOSE_REQUEST,
} from "../../redux/constant/payConstant";
import {
  DEFAULT_ADDRESS_REQUEST,
  RADIO_SET_REQUEST,
} from "../../redux/constant/addressConstant";
import exportProfile from "../../util/exportProfile";

const PaymentContainer = () => {
  const { orderSubmitItems } = useSelector((state) => state.cart);
  const { getAddress, radioSet, saveAddress } = useSelector(
    (state) => state.address
  );
  const { modal, cancel, failure, payLoading } = useSelector(
    (state) => state.pay
  );
  const { result, cartItemsFiltered } = orderSubmitItems;

  const { profile } = useSelector((state) => state.auth);

  const [alert, setAlert] = useState(false);
  const [radioModal, setRadioModal] = useState(false);

  // console.log(result, "result PaymentContainer");

  const [form, setValue] = useState({
    recipient: "",
    postcode: "",
    address: "",
    detailAddress: "",
    extraAddress: "",
    phone1: "",
    phone2: "",
    phone3: "",
  });
  const [receviedMessage, setReceivedMesaage] = useState("");
  const [addressAlert, setAddressAlert] = useState(false);

  const dispatch = useDispatch();

  // console.log("payment props", props);
  const radioHandle = (e) => {
    //  console.log("radio2", e.target.value);
    // console.log("radio3", e);
    // console.log("radio4", e.target.id, modal);
    console.log("modal false radio handle", e);

    dispatch({
      type: RADIO_SET_REQUEST,
      payload: e.target.value,
    });
  };

  const addressHandle = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
    setAddressAlert(false);
  };

  const phoneNumberHandle = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setAlert(false);
      setValue({ ...form, [e.target.name]: e.target.value });
      setAddressAlert(false);
    } else {
      setAlert(true);
      setValue({ ...form }); // 이전에 입력한 값 기억
      setAddressAlert(false);
    }
  };

  useEffect((callback) => {
    const scriptId = "kakao_postcode_script";
    let isExist = document.getElementById(scriptId);

    if (!isExist) {
      const script = document.createElement("script");
      script.src = KAKAO_API;
      script.async = true;
      script.onload = () => {
        // console.log(callback);
        if (callback) callback();
      };
      script.id = scriptId;
      document.body.appendChild(script);
    }
    if (isExist && callback) {
      callback();
    }
  }, []);

  const kakaoPostCode = (obj) => {
    // console.log(obj.view.daum);

    new obj.view.daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        let addr = ""; // 주소 변수
        let extraAddr = ""; // 참고항목 변수
        let postCode = "";

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
          postCode = data.zonecode;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
          postCode = data.zonecode;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === "R") {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
          // 조합된 참고항목을 해당 필드에 넣는다.        // 우편번호와 주소 정보를 해당 필드에 넣는다.
          setValue({
            ...form,
            address: addr,
            postcode: postCode,
            extraAddress: extraAddr,
          });
          // setValue({
          //   address: addr,
          //   postcode: data.zonecode,
          //   extraAddress: extraAddr,
          // });
        } else {
          setValue({
            ...form,
            address: addr,
            postcode: postCode,
            extraAddress: "",
          });
          // setValue({
          //   address: addr,
          //   postcode: postCode,
          //   extraAddress: "",
          // });
        }

        // 커서를 상세주소 필드로 이동한다.
        document.getElementById("detailAddress").focus();
      },
    }).open();
  };

  useEffect(() => {
    window.addEventListener("message", (e) => {
      const exp = /CloseIframe/;

      if (exp.test(e.data)) {
        console.log(e.data);
        setReceivedMesaage(e.data);
        console.log(receviedMessage);
      }
    });

    if (receviedMessage === "CloseIframe_Cancel") {
      console.log(receviedMessage);
      dispatch({ type: MODAL_CANCEL_CLOSE_REQUEST });
      setReceivedMesaage(""); // 다시 빈값으로 안만들
    } else if (receviedMessage === "CloseIframe_Success") {
      console.log(receviedMessage);
      dispatch({ type: MODAL_SUCCESS_CLOSE_REQUEST });
      setReceivedMesaage("");
      history.push("/kakaopay/success");
    } else if (receviedMessage === "CloseIframe_Failure") {
      dispatch({ type: MODAL_FAILURE_CLOSE_REQUEST });
      setReceivedMesaage("");
    }
  }, [receviedMessage, dispatch]);

  const orderId = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const miliseconds = today.getMilliseconds();

    const orderTime = `${year}${month}${day}${hours}${minutes}${seconds}${miliseconds}`;
    return orderTime;
  };

  const dispatchPayInfo = () => {
    const {
      recipient,
      postcode,
      address,
      detailAddress,
      extraAddress,
      phone1,
      phone2,
      phone3,
    } = form;

    const fullAddress = () => {
      if (detailAddress && extraAddress) {
        return `${address}, ${detailAddress}${extraAddress}`;
      } else if (detailAddress) {
        return `${address}, ${detailAddress}`;
      } else {
        return `${address}`;
      }
    };

    const fullPhoneNumber = `${phone1}-${phone2}-${phone3}`;
    const { profileName } = exportProfile(profile);

    if (
      recipient &&
      postcode &&
      fullAddress() &&
      phone1 &&
      phone2 &&
      phone3 !== null
    ) {
      // console.log(
      //   "Success MODAL_OPEN_REQUEST dispatch ",
      //   form,
      //   fullPhoneNumber,
      //   fullAddress()
      // );
      dispatch({
        // Kakao Pay Info
        type: MODAL_OPEN_REQUEST,
        payload: {
          partner_order_id: orderId(), // orderId
          partner_user_id: profile.userUUID, // userId
          userName: profileName,
          orderItems: cartItemsFiltered, // orderItems
          item_name:
            cartItemsFiltered.length === 1
              ? `${cartItemsFiltered[0].name}`
              : `${cartItemsFiltered[0].name} 외 ${
                  cartItemsFiltered.length - 1
                }건`,
          quantity: 1,
          total_amount: result.totalPrice, // totalPrice
          shippingPrice: result.totalDeliveryPrice,

          fullAddress: fullAddress(), // shippging Address 1
          recipient, // shippging Address 2
          postcode, // shippging Address 3
          fullPhoneNumber, // shippging Address 4
          paymentMethod: "kakao", // paymentMethod
          paymemntResult: "not yet", // paymentResult
          isPaid: false, // isPaid
          isDelivered: false, // isDelivered
          // paidAt: "",  이 두 개 값은 서버에서 값을 만들 것이기에 넣지 않는다.
          // deliveredAt: "",
          address: form.address,
          detailAddress: form.detailAddress,
          extraAddress: form.extraAddress,
          phone1: form.phone1,
          phone2: form.phone2,
          phone3: form.phone3,
        },
      });
      setAddressAlert(false);
    } else if (getAddress) {
      dispatch({
        // Kakao Pay Info
        type: MODAL_OPEN_REQUEST,
        payload: {
          partner_order_id: orderId(), // orderId
          partner_user_id: profile.userUUID, // userId
          userName: profileName,
          orderItems: cartItemsFiltered, // orderItems
          item_name:
            cartItemsFiltered.length === 1
              ? `${cartItemsFiltered[0].name}`
              : `${cartItemsFiltered[0].name} 외 ${
                  cartItemsFiltered.length - 1
                }건`,
          quantity: 1,
          total_amount: result.totalPrice, // totalPrice
          shippingPrice: result.totalDeliveryPrice,
          fullAddress: getAddress.shippingAddress, // shippging Address 1
          recipient: getAddress.recipient, // shippging Address 2
          postcode: getAddress.postcode, // shippging Address 3
          fullPhoneNumber: `{${getAddress.phone1}-${getAddress.phone2}-${getAddress.phone3}}`, // shippging Address 4
          paymentMethod: "kakao", // paymentMethod
          paymemntResult: "not yet", // paymentResult
          isPaid: false, // isPaid
          isDelivered: false, // isDelivered
          // paidAt: "",  이 두 개 값은 서버에서 값을 만들 것이기에 넣지 않는다.
          // deliveredAt: "",
          address: getAddress.address,
          detailAddress: getAddress.detail1,
          extraAddress: getAddress.detail2,
          phone1: getAddress.phone1,
          phone2: getAddress.phone2,
          phone3: getAddress.phone3,
        },
      });
      setAddressAlert(false);
    } else {
      setAddressAlert(true);
      console.log("MODAL_OPEN_REQUEST dispatch Error", form, fullPhoneNumber);
    }
  };

  const modalSuccessClose = (a, b) => {
    dispatch({ type: MODAL_SUCCESS_CLOSE_REQUEST });
  };

  //  let fullAddressByGetAddress = useRef("")
  // if(getAddress){
  //   fullAddressByGetAddress.current = getAddress
  //   return fullAddressByGetAddress
  // }

  // 조건문이면 useCallback, 내가 만든게 있음

  // 아래 조건들을 하나로 합치면 의존성 배열이 너무 많아 무한 렌더링 됨
  useEffect(() => {
    dispatch({ type: DEFAULT_ADDRESS_REQUEST });
  }, [dispatch]);

  useEffect(() => {
    if (getAddress) {
      setValue({
        recipient: getAddress.recipient,
        postcode: getAddress.postcode,
        address: getAddress.address,
        detailAddress: getAddress.detail1,
        extraAddress: getAddress.detail2,
        phone1: getAddress.phone1,
        phone2: getAddress.phone2,
        phone3: getAddress.phone3,
      });
    }
  }, [getAddress]);

  useEffect(() => {
    if (saveAddress) {
      setValue({
        recipient: saveAddress.recipient,
        postcode: saveAddress.postcode,
        address: saveAddress.address,
        detailAddress: saveAddress.detail1,
        extraAddress: saveAddress.detail2,
        phone1: saveAddress.phone1,
        phone2: saveAddress.phone2,
        phone3: saveAddress.phone3,
      });
    }
  }, [saveAddress]);

  useEffect(() => {
    if (radioSet === "2") {
      console.log("radioModal true");
      setRadioModal(true);
    }
    if (radioSet === "3") {
      setValue({
        recipient: "",
        postcode: "",
        address: "",
        detailAddress: "",
        extraAddress: "",
        phone1: "",
        phone2: "",
        phone3: "",
      });
    }
  }, [radioSet]);

  // useEffect(() => {
  //   window.addEventListener("message", (e) => {
  //     console.log(e, "message");
  //     const exp = /Save_Address/;

  //     if (exp.test(e.data)) {
  //       const split = e.data.split("Save_Address__");
  //       console.log(split, "split");
  //       const jsonParse = JSON.parse(split[1]);
  //       console.log(jsonParse, "jsonParse");
  //       setReceivedAddressMesaage(jsonParse);
  //       // console.log(receviedAddressMessage, "receviedAddressMessage");
  //       // // console.log(saveAddress, "saveAddress");
  //     }
  //     // if (receviedAddressMessage) {
  //     //   setValue({
  //     //     recipient: receviedAddressMessage.recipient,
  //     //     postcode: receviedAddressMessage.postcode,
  //     //     address: receviedAddressMessage.address,
  //     //     detailAddress: receviedAddressMessage.detail1,
  //     //     extraAddress: receviedAddressMessage.detail2,
  //     //     phone1: receviedAddressMessage.phone1,
  //     //     phone2: receviedAddressMessage.phone2,
  //     //     phone3: receviedAddressMessage.phone3,
  //     //   });
  //     // }
  //   });
  // }, [receviedAddressMessage]);

  // useEffect(() => {
  //   if (receviedAddressMessage) {
  //     setValue({
  //       recipient: receviedAddressMessage.recipient,
  //       postcode: receviedAddressMessage.postcode,
  //       address: receviedAddressMessage.address,
  //       detailAddress: receviedAddressMessage.detail1,
  //       extraAddress: receviedAddressMessage.detail2,
  //       phone1: receviedAddressMessage.phone1,
  //       phone2: receviedAddressMessage.phone2,
  //       phone3: receviedAddressMessage.phone3,
  //     });
  //   }
  // }, [receviedAddressMessage]);

  // useState는 무조건 처음만 작동하기에, Input에 기본값을 넣어주기 위해서는 이렇게 useEffect를 만들어야 한다.
  // defaultValue는 비제어 컴포넌트이기에 되도록이면 안쓴느게 좋다. 리액트는 제어컴포넌트를 주로 쓰라고 한다.
  // 제어가 가능해야 비교해서 원하는 것만 빠르게 바꾸기 때문이다.
  // useEffect는 일종의 조건문이다. 의조성배열값이 조건문의 x역할을 한다. 즉, x가 있다면 useEffect 안에 있는 것을 작동시켜라 라는 의미가 된다.

  return (
    <PaymentPresenter
      modal={modal}
      radio={radioSet}
      radioHandle={radioHandle}
      radioModal={radioModal}
      setRadioModal={setRadioModal}
      addressHandle={addressHandle}
      kakaoPostCode={kakaoPostCode}
      phoneNumberHandle={phoneNumberHandle}
      form={form}
      alert={alert}
      cartItemsFiltered={cartItemsFiltered}
      cancel={cancel}
      failure={failure}
      payLoading={payLoading}
      dispatchPayInfo={dispatchPayInfo}
      modalSuccessClose={modalSuccessClose}
      totalPriceWithVat={result.totalPrice}
      totalCount={result.totalCount}
      addressAlert={addressAlert}
      getAddress={getAddress}
    />
  );
};

export default PaymentContainer;
