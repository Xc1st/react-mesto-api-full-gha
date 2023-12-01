require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const cors = require('cors');
const handleError = require('./middlewares/handle-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(cors({
  origin: ['http://localhost:5173, http://xc1st.nomoredomainsmonster.ru'],
  credentials: true,
  maxAge: 30,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter);

app.use('/', require('./routes/index'));

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(handleError);
app.listen(PORT);
