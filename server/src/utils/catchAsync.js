const catchAsync = (fn) => {
  return (req, res, next) => {
    // If any async operation fails or rejects, it catches it and passes it to next()
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
