const jwt = require('jsonwebtoken');
const Code = require('./code');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (token !== undefined) {
    jwt.verify(token, process.env.SECRET_KEY, (err, authData) => {
      if (err) {
        res.json({
          code: Code.INVALID_TOKEN,
          message: 'Invalid Token'
        });
      } else {
        req.payload = authData;
        next();
      }
    });
  } else {
    res.json({
      code: Code.INVALID_TOKEN,
      message: 'Invalid Token'
    });
  }
};
