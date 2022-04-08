const express = require('express');

const router = express.Router();
const checkJWT = require('./middleware/security')
const controllerHandler = require('./helpers/controllerHandler');

const eventController = require('./controllers/eventController');
const userController = require('./controllers/userController');
const placeController = require('./controllers/placeController');
const settingsController = require('./controllers/settingsController');
const placeDataMapper = require('./dataMappers/placeDataMapper');

// Route LOGIN
router.post('/signin/', controllerHandler(userController.login));
router.get('/test/',checkJWT.check(['trainee']) ,(req,res,next)=>{
    console.log('TEST OK -----------------------');
    console.log('decoded',req.decoded.user);
});

// Routes EVENT
router.get('/event/organizer/:date', controllerHandler(eventController.getOrganizer));
router.post('/event/check_date', controllerHandler(eventController.checkIsAvailabe));
router.post('/event/',controllerHandler(eventController.addEvent));
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
router.post('/place/', controllerHandler(placeController.addPlace));
router.patch('/place/:place_id', controllerHandler(placeController.updatePlace));
router.delete('/place/:place_id', controllerHandler(placeController.deletePlaceById));
// Routes SETTINGS
router.get('/settings/', controllerHandler(settingsController.getAllSetting));
router.put('/settings/' ,controllerHandler(settingsController.updateAllSetting))
router.get('/signin/', controllerHandler(settingsController.getStructureSetting));
module.exports = router;