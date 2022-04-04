const express = require('express');

const router = express.Router();
const controllerHandler = require('./helpers/controllerHandler');

const eventController = require('./controllers/eventController');
const userController = require('./controllers/userController');
const placeController = require('./controllers/placeController')

// Routes EVENT
router.get('/event/organizer/:date', controllerHandler(eventController.getOrganizer));
router.post('/event/check-date', controllerHandler(eventController.checkIsAvailabe));
router.post('/event/', controllerHandler(eventController.addEvent));
router.get('/event/:user_id/:page_number',controllerHandler(eventController.getAllEventForUser));
router.patch('/event/:event_id', controllerHandler(eventController.updateEventById))

// Routes USER
router.get('/user/event_form', controllerHandler(userController.getUserByPromoAndGroup));

// Routes PLACE
router.get('/place/', controllerHandler(placeController.getAllPlace))


module.exports = router;