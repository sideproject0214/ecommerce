import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { KAKAO_API } from "../../config/variables";
import { useLazyGetDefaultAddressQuery } from "../../redux/apiSlices/extendedAddress";
import { usePostOrderSubmitMutation } from "../../redux/apiSlices/extendedPay";
import { setRadio } from "../../redux/slices/addressSlice";
import {
  closeModal,
  closeModalCancel,
  closeModalFailure,
  openModal,
} from "../../redux/slices/paySlice";
import { clearItems } from "../../redux/slices/postSlice";

import exportProfile from "../../util/exportProfile";
import PaymentPresenter from "./PaymentPresenter";

const PaymentContainer = () => {
  const { orderSubmitItems } = useSelector((state) => state.posts);

  const { getAddress, saveAddress, radioSet } = useSelector(
    (state) => state.address
  );
  const { modal, cancel, failure, payLoading } = useSelector(
    (state) => state.pay
  );

  const [getDefaultAddress, { isError: GetDefaultAddressQueryError }] =
    useLazyGetDefaultAddressQuery();

  const { result, cartItemsFiltered } = orderSubmitItems;
  const { profile } = useSelector((state) => state.auth);
  // let userUUID = profile?.userUUID;

  const [alert, setAlert] = useState(false);
  const [radioModal, setRadioModal] = useState(false);

  const [postOrderSubmit, { data, isLoading, isSuccess, isError }] =
    usePostOrderSubmitMutation();

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
  const navigate = useNavigate();

  // console.log("payment props", props);
  const radioHandle = (e) => {
    dispatch(setRadio(e.target.value));
  };

  console.log(radioSet, "radioSet");

  const addressHandle = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
    setAddressAlert(false);
  };

  const phoneNumberHandle = (e) => {
    const re = /^[0-9\b]+$/;
    /*
      ^ : 문자열의 시작을 나타냄
     [0-9] : 0부터 9까지의 숫자 중 하나와 일치를 의미
     \b : 백스페이스(backspace)를 나타냄. 이것은 백스페이스 문자 자체를 의미
     + : 앞의 요소가 최소 1번이상 반복됨을 의미
     $ : 문자열의 끝을 나타냄. 
     결국 이상을 조합하면 앞의 표현식([0-9\b])이 하나 이상의 반복을 의미. 즉, 하나 이상의 숫자 또는 백스페이스 문자를 매칭한다.
    */
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
        } else {
          setValue({
            ...form,
            address: addr,
            postcode: postCode,
            extraAddress: "",
          });
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
        console.log(receviedMessage, "receviedMessage");
      }
    });

    switch (receviedMessage) {
      case "CloseIframe_Cancel":
        dispatch(closeModalCancel());

        break;
      case "CloseIframe_Success":
        dispatch(closeModal());
        dispatch(clearItems(profile));

        navigate("/kakaopay/success");
        break;
      case "CloseIframe_Failure":
        dispatch(closeModalFailure());
        break;
      default:
        break;
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
      dispatch(openModal()); // 모달을 열어서 열린 카카오페이 창이 useEffect를 통해 kakao pay api 접속
      const data = {
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
      };
      postOrderSubmit(data);
      // localStorage.setItem("orderPayItems", JSON.stringify(data));
      setAddressAlert(false);
    } else if (getAddress) {
      dispatch(openModal());
      const data = {
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
      };
      postOrderSubmit(data);
      // localStorage.setItem("orderPayItems", JSON.stringify(data));
      setAddressAlert(false);
    } else {
      setAddressAlert(true);
      console.log("MODAL_OPEN_REQUEST dispatch Error", form, fullPhoneNumber);
    }

    setReceivedMesaage("");
  };

  const modalSuccessClose = () => {
    dispatch(closeModal());
  };

  // 아래 조건들을 하나로 합치면 의존성 배열이 너무 많아 무한 렌더링 됨

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
    switch (radioSet) {
      case "1":
        getDefaultAddress();

        break;
      case "2":
        console.log("radioModal true");
        setRadioModal(true);
        break;
      case "3":
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
        break;
      default:
        break;
    }
  }, [radioSet]);

  useEffect(() => {
    if (isError) {
      setRadioModal(false);
    }
  }, [isError]);

  useEffect(() => {
    console.log(GetDefaultAddressQueryError, "Radio Error");
    if (GetDefaultAddressQueryError) {
      dispatch(setRadio("3"));
    }
  }, [GetDefaultAddressQueryError]);

  return (
    <PaymentPresenter
      modal={modal}
      radioSet={radioSet}
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
      isError={isError}
    />
  );
};

export default PaymentContainer;
