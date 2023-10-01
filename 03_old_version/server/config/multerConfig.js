const multer = require("multer");
const path = require("path");

exports.upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images");
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext); // 옵션으로 확장자를 선택하면 오리지널 이름에서 확장자를 제거한다

      cb(null, baseName + Date.now() + ext);
    },
    limit: { filSize: 20 * 1024 * 1024 }, // 바이트 단위
  }),
});
