import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import defaultImage from "../../assets/image/default.jpeg";
import PostUploadPresenter from "./PostUploadPresenter_depre";

const PostUpload = () => {
  const [form, setValue] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    sise: "",
    price: "",
    countInStock: "",
    sale: "",
    deliveryFee: "",
  });

  const mainImageRef = useRef();
  const thumbnailImageRef = useRef();

  const dispatch = useDispatch();

  const [sameFileAlert, setSameFileAlert] = useState(false);

  const [mainImage, setMainImage] = useState({
    file: "",
    preview: defaultImage,
    number: 0,
  });

  const [thumbnailImage, setThumbnailImage] = useState({
    files: [],
    previews: [],
    number: 0,
  });

  const onChange = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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
      setMainImage({ number: files.length });
    } else if (files.length === 1 && files[0].type.match("image")) {
      const fileUrl = URL.createObjectURL(files[0]);
      const formData = new FormData();

      setMainImage({ number: 1, preview: fileUrl });

      // console.log(formData.values);
      // console.log(files[0]);
      URL.revokeObjectURL(files[0]); // 메모리에서 제거
    } else {
      setMainImage({ number: 0, preview: defaultImage });
    }
  };

  const thumbnailSelect = (e) => {
    e.preventDefault();
    const { files } = e.target;
    // console.log(thumbnailPreview, files);

    if (thumbnailImage.previews && thumbnailImage.previews.length < 5) {
      if (
        thumbnailImage.previews.length + files.length < 5 &&
        files.length > 0
      ) {
        console.log("1");
        const pure = Array.from(files);

        console.log("1-1", pure);
        const result = pure.map((file) =>
          thumbnailImage.previews.length > 0
            ? thumbnailImage.previews.map((thumbnail) => {
                console.log(thumbnail, file, "NAME");
                return thumbnail.name === file.name;
              })
            : false
        );
        console.log("1-2", result);

        const fileArray = Array.from(files).map((file) => [
          { name: file.name, url: URL.createObjectURL(file) },
        ]);

        const containBool = (arr, val) => {
          // arr : array, val : value
          return arr.some((arrVal) => {
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
        } else {
          setSameFileAlert(false);

          setThumbnailImage({
            previews: (prevImage) => prevImage.concat(fileArray),
            number: thumbnailImage.previews.length + files.length,
          });
        }

        Array.from(files).map((file) => URL.revokeObjectURL(file)); // 메모리에서 제거
      } else if (thumbnailImage.previews.length + files.length >= 5) {
        console.log("2");
        setThumbnailImage({ number: 5 });
        // setThumbnailPreview([]);
        // setThumbnailPreview(null);
      } else {
        console.log("3");
        setThumbnailImage({ previews: [], number: 0 });
      }
    } else {
      console.log("else");
      setThumbnailImage({ number: 5 });
    }
  };

  useEffect(() => {}, []);

  return (
    <PostUploadPresenter
      form={form}
      onChange={onChange}
      onClickMainImageInput={onClickMainImageInput}
      mainImage={mainImage}
      mainImageSelect={mainImageSelect}
      mainImageRef={mainImageRef}
      onClickThumbnailImageInput={onClickThumbnailImageInput}
      thumbnailImage={thumbnailImage}
      thumbnailImageRef={thumbnailImageRef}
      thumbnailSelect={thumbnailSelect}
      sameFileAlert={sameFileAlert}
    />
  );
};

export default PostUpload;
