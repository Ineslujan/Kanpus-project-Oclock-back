const express = require('express');

const router = express.Router();
const controllerHandler = require('./helpers/controllerHandler');

const eventController = require('./controllers/eventController');

router.get('/', controllerHandler(eventController.getOrganizer));


module.exports = router;