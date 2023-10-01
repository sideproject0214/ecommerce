const { logEvents } = require("./logMiddleware");

exports.notFound = (req, res, next) => {
  const error = new Error(`다음주소는 찾을 수 없습니다 : ${req.originalUrl}`);
  res.status(404).send(error);
  next(error);
};

exports.errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
};
