const express = require('express');

const router = express.Router();
const controllerHandler = require('./helpers/controllerHandler');

const eventController = require('./controllers/eventController');
const userController = require('./controllers/userController');
const placeController = require('./controllers/placeController');

// Routes EVENT
router.get('/event/organizer/:date', controllerHandler(eventController.getOrganizer));
router.post('/event/check-date', controllerHandler(eventController.checkIsAvailabe));
router.post('/event/', controllerHandler(eventController.addEvent));
router.get('/event/my_course/:page_number',controllerHandler(eventController.getAllEventForUser));
router.patch('/event/:event_id', controllerHandler(eventController.updateEventById));
router.get('/event/:event_id', controllerHandler(eventController.getEventById));
router.delete('/event/:event_id', controllerHandler(eventController.deleteEventById));

// Routes USER
router.get('/user/:user_id', controllerHandler(userController.getUserById));
router.get('/user/event_form/', controllerHandler(userController.getTraineeByPromoAndGroup));
router.get('/user/trainee/', controllerHandler(userController.getAllTraineeByPromo));
router.get('/user/former', controllerHandler(userController.getAllFormerByIsPermanent));
router.post('/user/:role/',controllerHandler(userController.addUser));
router.patch('/user/former/:user_id', controllerHandler(userController.updateFormer));
router.patch('/user/trainee/:user_id', controllerHandler(userController.updateTrainee));
router.patch('/user/password', controllerHandler(userController.updatePassword));
router.patch('/user/password/:user_id', controllerHandler(userController.updatePassword));
router.delete('/user/:user_id', controllerHandler(userController.deleteUser));

// Routes PLACE
router.get('/place/', controllerHandler(placeController.getAllPlace));



module.exports = router;