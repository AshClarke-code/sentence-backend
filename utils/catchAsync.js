module.exports = asyncFunction => {
    return (req, res, next) => {
      // async functions return promises, when these are rejected we can catch them
       asyncFunction(req, res, next).catch(err => next(err));
    }
 };