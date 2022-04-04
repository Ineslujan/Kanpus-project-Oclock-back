const express = require('express');
const router = require('./router');
const cors = require('cors')

const app = express();

const corsOptions = {
    exposedHeaders: 'Authorization',
  };
  
app.use(cors(corsOptions));

app.use(express.static('./public'));

app.use(express.json());

app.use(router);

module.exports = app;