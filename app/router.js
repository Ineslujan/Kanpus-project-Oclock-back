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
router.get('/event/my_course/:page_number',controllerHandler(eventController.getAllEventForUser));
router.patch('/event/:event_id', controllerHandler(eventController.updateEventById));
router.get('/event/:event_id', controllerHandler(eventController.getEventById));
router.delete('/event/:event_id', controllerHandler(eventController.deleteEventById));

// Routes USER
router.get('/user/event_form/', controllerHandler(userController.getUserByPromoAndGroup));
router.post('/user/:role/',controllerHandler(userController.add_user));

// Routes PLACE
router.get('/place/', controllerHandler(placeController.getAllPlace))

// 

module.exports = router;