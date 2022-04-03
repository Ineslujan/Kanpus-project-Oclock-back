const express = require('express');

const router = express.Router();
const controllerHandler = require('./helpers/controllerHandler');

const eventController = require('./controllers/eventController');

router.get('/organizer/event/:date', controllerHandler(eventController.getOrganizer));
router.post('/event/check-date', controllerHandler(eventController.checkIsAvailabe))

module.exports = router;