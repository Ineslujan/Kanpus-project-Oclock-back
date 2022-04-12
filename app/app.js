const express = require('express');
const router = require('./router');
const cors = require('cors');
const logger = require('./helpers/logger');

const app = express();

const corsOptions = {
    exposedHeaders: 'Authorization',
  };
  
app.use(cors(corsOptions));

app.use(express.static('./public'));

app.use(express.json());

app.use((req,res,next)=>{
logger.trace(req.path);
console.log(req.path);
next();
});

app.use(router);

module.exports = app;