const asyncUtil = (fn) =>
  function asyncUtilWrap(...args) {
    const fnReturn = fn(...args);
    // console.log(fnReturn, "fn");
    // console.log(args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
    // Promise.resolve는 이행된 promise를 반환한다. //
  };

module.exports = asyncUtil;
