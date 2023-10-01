import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import defaultImage from "../../assets/image/default.jpeg";
import { ADD_ALERTSIDE } from "../../redux/constant/alertConstant";
import {
  PRODUCT_IMAGE_DELETE_REQUEST,
  PRODUCT_THUMBNAIL_DELETE_REQUEST,
  PRODUCT_UPLOAD_REQUEST,
} from "../../redux/constant/productConstant";
import { history } from "../../store";
import PostUploadPresenter from "./PostUploadPresenter";

const PostUpload = () => {
  const { profile } = useSelector((state) => state.auth);
  if (!profile.isAdminResult) {
    history.push("/");
  }
  const { productOne, mainImageDelete } = useSelector((state) => state.product);
  const { loading } = useSelector((state) => state.product);

  const [form, setValue] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    "size-1": "",
    "stock-1": "",
    price: "",
    sale: "",
    deliveryFee: "",
  });

  const mainImageRef = useRef();
  const thumbnailImageRef = useRef();

  const [mainImageNum, setMainImageNum] = useState();
  const [thumbnailNum, setThumbnailNum] = useState();

  const [mainPreview, setMainPreview] = useState();
  const [mainData, setMainData] = useState([]);

  const [thumbnailPreview, setThumbnailPreview] = useState([]);
  const [thumbnailData, setThumbnailData] = useState([]);

  const [sameFileAlert, setSameFileAlert] = useState(false);
  const [nanAlert, setNanAlert] = useState(false);

  const [borderRed, setBorderRed] = useState(false);

  let [select, setSelect] = useState([1]);

  const dispatch = useDispatch();

  console.log(typeof thumbnailPreview, "typeof thumbnailPreview");

  // console.log(productUUID);

  const plusMinusBtn = (e) => {
    // console.log(e.target.id, "e.target");
    if (e.target.id === "plus") {
      setSelect([...select, select.length + 1]);
      setValue({
        ...form,
        [`size-${select.length + 1}`]: "",
        [`stock-${select.length + 1}`]: "",
      });
      // 이렇게 해줘야 칸을 하나 더 만들고 값을 입력하지 않으면 값이 없다고 경고장이 날라온다.
    } else if (select.length === 1) {
      setValue([1]);
    } else {
      // console.log(select.length, "select.length");
      // delete form[`size-${select.length}`];
      // delete form[`stock-${select.length}`];

      // 마이너스 버튼을 누르면 객체에서 해당 키와 값이 완전히 사라져야 한다.
      // setValue({
      //   ...form,
      //   [`stock-${select.length}`]: "",
      //   [`size-${select.length}`]: "",
      // });
      delete form[`size-${select.length}`];
      delete form[`stock-${select.length}`];
      // setValue({ ...form, [form[`stock-${select.length}`]]: "" });
      setSelect(select.filter((el) => el !== select.length));
    }
  };

  // console.log(select, "select");

  const onChange = (e) => {
    if (nanAlert) {
      setValue({
        ...form,
        [e.target.name]: e.target.value,
      });

      setNanAlert(false);
    } else {
      setValue({
        ...form,
        [e.target.name]: e.target.value,
      });
      console.log(Object.entries(form).includes("stock"));
    }
  };

  const numberOnChange = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === "" || re.test(e.target.value)) {
      console.log(e.target.value, "Only Number");
      setValue({
        ...form,
        [e.target.name]: e.target.value,
      });
      setBorderRed({
        [e.target.name]: false,
      });
    } else {
      setValue({ ...form });
      setBorderRed({
        [e.target.name]: true,
      });
    }
  };

  const saleOnChange = (e) => {
    const re = /^[0-9\b]+$/;
    // e.target.value === "" || 이거 안넣으면 첫번째 글자를 못지운다.
    if (e.target.value === "" || re.test(e.target.value)) {
      console.log(e.target.value, "Only Number");
      if (e.target.value <= 100) {
        setValue({
          ...form,
          [e.target.name]: e.target.value,
        });
        setBorderRed({
          [e.target.name]: false,
        });
      } else {
        setValue({ ...form });
        setBorderRed({
          [e.target.name]: true,
        });
      }
    } else {
      setValue({ ...form });
      setBorderRed({
        [e.target.name]: true,
      });
    }
  };

  // console.log(borderRed, "Red");
  // console.log(form, "form");
  const onClickMainImageInput = (e) => {
    e.preventDefault();
    mainImageRef.current.click();
  };

  const onClickThumbnailImageInput = (e) => {
    e.preventDefault();
    thumbnailImageRef.current.click();
  };

  const mainImageSelect = (e) => {
    e.preventDefault();
    const { files } = e.target;
    if (files.length > 1) {
      setMainImageNum(files.length);
    } else if (files.length === 1 && files[0].type.match("image")) {
      const fileUrl = URL.createObjectURL(files[0]);

      setMainImageNum(1);
      setMainPreview(fileUrl);
      setMainData(files[0]);
      // console.log(files[0].values);
      console.log(files[0]);
      URL.revokeObjectURL(files[0]); // 메모리에서 제거
    } else {
      setMainPreview(defaultImage);
      setMainImageNum(null);
      setMainData([]);
    }
  };

  const thumbnailSelect = (e) => {
    e.preventDefault();

    const { files } = e.target;

    console.log("00", files);
    console.log("0");

    if (thumbnailPreview && thumbnailPreview.length < 4) {
      if (thumbnailPreview.length + files.length < 4 && files.length > 0) {
        console.log("1", files);

        const pure = Array.from(files);

        console.log(pure, "pure");

        const result = pure.map((file) =>
          thumbnailPreview.map((thumbnail) => {
            // console.log(thumbnail[0].name, file.name, "NAME");
            return thumbnail[0].name === file.name;
          })
        );

        const fileArray = Array.from(files).map((file) => [
          { name: file.name, url: URL.createObjectURL(file) },
        ]);

        const containBool = (arr, val) => {
          // arr : array, val : value
          return arr[0].some((arrVal) => {
            // arrVal : array Value
            return val === arrVal;
          });
        };

        // console.log(fileArray);
        // console.log(result);
        // console.log(containBool(result, true));
        // console.log(pure.name, "pure");
        if (containBool(result, true)) {
          console.log("same file");
          setSameFileAlert(true);
          setThumbnailData(pure);
        } else {
          setSameFileAlert(false);

          setThumbnailPreview((prevImage) => prevImage.concat(fileArray));
          setThumbnailNum(thumbnailPreview.length + files.length);
          setThumbnailData((prevImage) => prevImage.concat(pure));
        }

        Array.from(files).map((file) => URL.revokeObjectURL(file)); // 메모리에서 제거
      } else if (thumbnailPreview.length + files.length >= 4) {
        console.log("2");
        setThumbnailNum(4);

        // setThumbnailPreview([]);
        // setThumbnailPreview(null);
      } else {
        console.log("3");
        setThumbnailPreview([]);
        setThumbnailNum();
        setThumbnailData([]);
      }
    } else {
      console.log("else");
      setThumbnailNum(4);
      setThumbnailData([]);
    }
  };

  let arrSizeEmpty = [];
  let arrStockEmpty = [];
  let newUploadObj = {};

  const submit = (e) => {
    e.preventDefault();

    const { name, description, brand, category, price, sale, deliveryFee } =
      form;
    // console.log(Object.values(form).includes(""), "undefined");

    // console.log(mainData, thumbnailData);

    select.map((value, i) => {
      arrSizeEmpty.push(form[`size-${value}`]);
      return arrSizeEmpty;
    });

    select.map((value, i) => {
      arrStockEmpty.push(form[`stock-${value}`]);
      return arrStockEmpty;
    });

    Object.assign(newUploadObj, {
      name,
      description,
      brand,
      category,
      price,
      sale,
      deliveryFee,
      arrSizeEmpty,
      arrStockEmpty,
    });

    // console.log(arrSizeEmpty, arrStockEmpty, "arrSizeEmpty");
    // console.log(arrSizeEmpty.length, arrStockEmpty.length, "arrSizeEmpty");

    if (Object.values(form).includes("")) {
      // console.log("빈값 존재", state);
      // Object.entries(form).map((value, i) => {
      //   console.log(value, "value form");
      // });
      dispatch({
        type: ADD_ALERTSIDE,
        payload: {
          id: Math.random(),
          message: "입력하지 않은 칸이 존재합니다",
          type: "ERROR",
        },
      });
      setNanAlert(true);
      // set;
    } else if (mainData.length === 0 || thumbnailData.length === 0) {
      dispatch({
        type: ADD_ALERTSIDE,
        payload: {
          id: Math.random(),
          message: "메인사진 또는 썸네일 사진을 첨부하지 않았습니다",
          type: "ERROR",
        },
      });
      setNanAlert(true);
    } else {
      console.log(newUploadObj, "uploadForm");
      console.log(mainData.file, thumbnailData);
      const newImageArr = [mainData, ...thumbnailData];
      console.log(newImageArr, "newImageArr");

      const result = newImageArr.reduce((formData, i) => {
        formData.append("images", i);
        return formData;
      }, new FormData());

      // formData.append("contents", form);
      // append를 사용하면 key-value 값을 하나씩 추가하게 된다.

      // console.log(newImageArr);
      // formData.append("images", newImageArr);

      const getFormData = (object) =>
        Object.keys(object).reduce((formData, key) => {
          formData.append(key, object[key]);
          return formData;
        }, result);

      // Object.keys : object에서 키 값만 가지고 배열을 만든다.
      // Object.keys.reduce : 키 값만 가지고 이전값(formData)와 현재값 key를 합쳐 결과값을 반환한다.
      // new FormData는 initialValue

      const result2 = getFormData(newUploadObj);

      console.log(result2, "PRODUCT_UPLOAD_REQUEST DATA");

      dispatch({
        type: PRODUCT_UPLOAD_REQUEST,
        // payload: { formData, name },
        // payload: { formData, form },
        payload: result2,
      });
    }
  };

  console.log(form);
  console.log(select);
  console.log(thumbnailPreview, "thumbnailPreview");

  const loadedImageDelete = (e) => {
    console.log(e.target.id, 365);
    dispatch({ type: PRODUCT_IMAGE_DELETE_REQUEST, payload: e.target.id });
  };

  const loadedThumbnailDelete = (e) => {
    console.log(e.target.id);
    dispatch({
      type: PRODUCT_THUMBNAIL_DELETE_REQUEST,
      payload: e.target.id,
    });
  };

  const mainImageLocalDelete = (e) => {
    setMainPreview();
    setMainData([]);
    setMainImageNum();
  };

  const thumbnailLocalDelete = (e) => {
    console.log(e.target.id);
    console.log(thumbnailPreview);
    console.log(thumbnailData);
    setThumbnailPreview(() =>
      thumbnailPreview.filter((el) => el[0].name !== e.target.id)
    );
    setThumbnailData(() =>
      thumbnailData.filter((el) => el.name !== e.target.id)
    );
    setThumbnailNum(thumbnailNum - 1);
  };

  console.log(thumbnailData, "thumbnailData");
  console.log(ImageData, "ImageData");
  return (
    <PostUploadPresenter
      form={form}
      onChange={onChange}
      onClickMainImageInput={onClickMainImageInput}
      mainImageSelect={mainImageSelect}
      mainImageRef={mainImageRef}
      mainImageNum={mainImageNum}
      mainPreview={mainPreview}
      onClickThumbnailImageInput={onClickThumbnailImageInput}
      thumbnailImageRef={thumbnailImageRef}
      thumbnailSelect={thumbnailSelect}
      thumbnailNum={thumbnailNum === undefined ? 0 : thumbnailNum}
      sameFileAlert={sameFileAlert}
      thumbnailPreview={thumbnailPreview}
      submit={submit}
      loading={loading}
      plusMinusBtn={plusMinusBtn}
      select={select}
      borderRed={borderRed}
      numberOnChange={numberOnChange}
      saleOnChange={saleOnChange}
      productOne={productOne}
      defaultImage={defaultImage}
      loadedImageDelete={loadedImageDelete}
      mainImageDelete={mainImageDelete}
      loadedThumbnailDelete={loadedThumbnailDelete}
      thumbnailLocalDelete={thumbnailLocalDelete}
      mainImageLocalDelete={mainImageLocalDelete}
    />
  );
};

export default PostUpload;
