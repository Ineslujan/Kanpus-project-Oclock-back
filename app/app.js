const express = require('express');
const router = require('./router');
const cors = require('cors');
const logger = require('./helpers/logger');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());
// Cors set for token use
const corsOptions = {
    exposedHeaders: 'Authorization',
  };
  
app.use(cors(corsOptions));

app.use(express.static('./public'));

app.use(express.json());

// Use for the logger
app.use((req,res,next)=>{
logger.trace(req.path);
next();
});

app.use(router);

module.exports = app;