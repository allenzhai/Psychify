const jwt = require('jsonwebtoken');
const Code = require('./code');

module.exports = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    req.token = token;
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
      if (err) {
        res.json({
          code: Code.INVALID_TOKEN,
          message: 'Invalid Token'
        });
      } else {
        console.log(authData);
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
