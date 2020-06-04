const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParse = require('cookie-parser');

const userRouter = require('./router/user');
const disorderRouter = require('./router/disorder');
const forumRouter = require('./router/forum');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParse());
app.use(express.static('dist'));

// router, endpoints
app.use(userRouter);
app.use(disorderRouter);
app.use(forumRouter);


app.get('/*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist/index.html'));
});

module.exports = app;
