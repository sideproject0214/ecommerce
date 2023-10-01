const multer = require("multer");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./src/images"); // 폴더는 루트폴더를 기준으로 잡는다
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext); // 옵션으로 확장자를 선택하면 오리지널 이름에서 확장자를 제거한다

      cb(null, baseName + Date.now() + ext);
    },
    limit: { filSize: 20 * 1024 * 1024 }, // 바이트 단위
  }),
});

const folder = async (_, __, next) => {
  // multerConfig.js 파일 위치 기준으로 위치 정한다
  if (!fs.existsSync(path.join(__dirname, "../", "images"))) {
    await fsPromises.mkdir(path.join(__dirname, "../", "images"));
  }
  next();
};

module.exports = { upload, folder };
