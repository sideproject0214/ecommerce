import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import defaultImage from "../../assets/image/default.jpeg";
import PostUploadPresenter from "./PostUploadPresenter";
import { addAlertSide } from "../../redux/slices/alertSlice";
import { usePostUploadPostMutation } from "../../redux/apiSlices/extendedPost";
import { useNavigate } from "react-router-dom";

const PostUpload = () => {
  const [postUploadPost, { data, isLoading, isSuccess }] =
    usePostUploadPostMutation();
  // console.log(data, "post upload");

  const navigate = useNavigate();

  let productOne = {};
  let mainImageDelete = false;
  // console.log(typeof productOne);

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
    if (e.target.id === "plus") {
      setSelect([...select, select.length + 1]);
      setValue({
        ...form,
        [`size-${select.length + 1}`]: "",
        [`stock-${select.length + 1}`]: "",
      });
      // 이렇게 해줘야 칸을 하나 더 만들고 값을 입력하지 않으면 값이 없다고 경고장이 날라온다.
    } else if (select.length === 1) {
      setSelect([1]);
    } else {
      delete form[`size-${select.length}`];
      delete form[`stock-${select.length}`];

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
    console.log(files, "files structure");
    if (files.length > 1) {
      setMainImageNum(files.length);
    } else if (files.length === 1 && files[0].type.match("image")) {
      const fileUrl = URL.createObjectURL(files[0]);

      setMainImageNum(1);
      setMainPreview(fileUrl);
      setMainData(files[0]);

      // console.log(files[0]);
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

    // console.log("00", files);
    // console.log("0");

    if (thumbnailPreview && thumbnailPreview.length < 4) {
      if (thumbnailPreview.length + files.length < 4 && files.length > 0) {
        console.log("1", files);

        const pure = Array.from(files);

        console.log(pure, "pure");

        const result = pure.map((file) =>
          thumbnailPreview.map((thumbnail) => {
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
      dispatch(
        addAlertSide({
          id: Math.random(),
          message: "입력하지 않은 칸이 존재합니다",
          type: "ERROR",
        })
      );

      setNanAlert(true);
    } else if (mainData.length === 0 || thumbnailData.length === 0) {
      dispatch(
        addAlertSide({
          id: Math.random(),
          message: "메인사진 또는 썸네일 사진을 첨부하지 않았습니다",
          type: "ERROR",
        })
      );
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

      const uploadData = getFormData(newUploadObj);

      postUploadPost(uploadData);
    }
  };

  console.log(form);
  console.log(select);
  console.log(thumbnailPreview, "thumbnailPreview");

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

  // console.log(thumbnailData, "thumbnailData");
  // console.log(ImageData, "ImageData");

  useEffect(() => {
    if (isSuccess) {
      navigate(`/post/${data?.uuid}`);
    }
  }, [isSuccess]);

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
      isLoading={isLoading}
      plusMinusBtn={plusMinusBtn}
      select={select}
      borderRed={borderRed}
      numberOnChange={numberOnChange}
      saleOnChange={saleOnChange}
      productOne={productOne}
      defaultImage={defaultImage}
      mainImageDelete={mainImageDelete}
      thumbnailLocalDelete={thumbnailLocalDelete}
      mainImageLocalDelete={mainImageLocalDelete}
    />
  );
};

export default PostUpload;
