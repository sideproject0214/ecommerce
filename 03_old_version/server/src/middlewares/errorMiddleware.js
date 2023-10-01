exports.notFound = (req, res, next) => {
  const error = new Error(`다음주소는 찾을 수 없습니다 : ${req.originalUrl}`);
  res.status(404).send(error);
  next(error);
};

exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    msg: err.message,
    stack: process.env.NODE_ENV !== "production" ? null : err.stack,
  });
};
