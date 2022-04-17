const express = require('express');

const router = express.Router();
const checkJWT = require('./middleware/security')
const controllerHandler = require('./helpers/controllerHandler');

// Error managemement, data validations
const validator = require('./middleware/validator');
const schema = require('./schema/schema');
const handleError = require('./middleware/handleError');

// All Controllers
const eventController = require('./controllers/eventController');
const userController = require('./controllers/userController');
const placeController = require('./controllers/placeController');
const settingsController = require('./controllers/settingsController');
const promoController = require('./controllers/promoController');
const absenceController = require('./controllers/absenceController');
const downloadController = require('./controllers/downloadController');


// Route LOGIN
router.get('/signin/', controllerHandler(settingsController.getStructureSetting));
router.post('/signin/', controllerHandler(userController.login));


// Routes EVENT
router.get('/event/organizer/:date', checkJWT.check(['admin','former']), controllerHandler(eventController.getOrganizer));
router.post('/event/check_date/:event_id', checkJWT.check(['admin','former']), validator(schema.checkDate, 'body'), controllerHandler(eventController.checkIsAvailabe));
router.post('/event/',validator(schema.event, 'body'), checkJWT.check(['admin','former']),  controllerHandler(eventController.addEvent));
router.get('/event/my_course/:page_number', checkJWT.check(['admin','former','trainee']), controllerHandler(eventController.getAllEventForUser));
router.patch('/event/:event_id', checkJWT.check(['admin','former']), validator(schema.event, 'body'), controllerHandler(eventController.updateEventById));
router.get('/event/:event_id', checkJWT.check(['admin','former','trainee']), controllerHandler(eventController.getEventById));
router.delete('/event/:event_id', checkJWT.check(['admin','former']), controllerHandler(eventController.deleteEventById));


// Routes USER 
    // !! ORDER MATTERS !!
    
router.get('/user/event_form/', checkJWT.check(['admin','former']), controllerHandler(userController.getTraineeByPromoAndGroup));
   
    // FORMER
router.get('/user/former/', checkJWT.check(['admin']), controllerHandler(userController.getAllFormerByIsPermanent));
router.get('/user/former/:user_id', checkJWT.check(['admin']), controllerHandler(userController.getFormerById));
router.post('/user/former/', checkJWT.check(['admin']), validator(schema.user, 'body'), controllerHandler(userController.addFomer));
router.patch('/user/former/:user_id', checkJWT.check(['admin']), validator(schema.user, 'body'), controllerHandler(userController.updateFormer));
router.delete('/user/former/:user_id', checkJWT.check(['admin']), controllerHandler(userController.deleteFormer));

    // TRAINEE
router.get('/user/trainee/',  checkJWT.check(['admin','former']), controllerHandler(userController.getAllTraineeByPromo));
router.get('/user/trainee/:user_id',  checkJWT.check(['admin','former']), controllerHandler(userController.getTraineeById));
router.post('/user/trainee/',  checkJWT.check(['admin','former']), validator(schema.user, 'body'), controllerHandler(userController.addTrainee));
router.patch('/user/trainee/:user_id',  checkJWT.check(['admin','former']), validator(schema.user, 'body'), controllerHandler(userController.updateTrainee));
router.delete('/user/trainee/:user_id',  checkJWT.check(['admin','former']), controllerHandler(userController.deleteTrainee));

    // PASSWORD
router.patch('/user/password', checkJWT.check(['admin','former','trainee']), validator(schema.updatePassword, 'body'), controllerHandler(userController.updatePassword));
router.patch('/user/password/admin/:user_id', checkJWT.check(['admin']), controllerHandler(userController.updatePasswordById));


// Routes PLACE
router.get('/place/', checkJWT.check(['admin','former']), controllerHandler(placeController.getAllPlace));
router.post('/place/', checkJWT.check(['admin','former']), validator(schema.place, 'body'), controllerHandler(placeController.addPlace));
router.patch('/place/:place_id', checkJWT.check(['admin','former']), validator(schema.place, 'body'), controllerHandler(placeController.updatePlacebyId));
router.delete('/place/:place_id', checkJWT.check(['admin','former']), controllerHandler(placeController.deletePlaceById));


// Routes PROMO
router.get('/promo/', checkJWT.check(['admin','former']), controllerHandler(promoController.getAllPromo));
router.post('/promo/', checkJWT.check(['admin','former']), validator(schema.promo, 'body'), controllerHandler(promoController.addPromo));
router.patch('/promo/:promo_id', checkJWT.check(['admin','former']), validator(schema.promo, 'body'), controllerHandler(promoController.updatePromoById));
router.delete('/promo/:promo_id', checkJWT.check(['admin','former']), controllerHandler(promoController.deletePromoById));


// Routes SETTINGS
router.get('/settings/', checkJWT.check(['admin']), controllerHandler(settingsController.getAllSetting));
router.put('/settings/' , checkJWT.check(['admin']), validator(schema.settings, 'body'),controllerHandler(settingsController.updateAllSetting));


// Routes ABSENCE
router.get('/absence/:user_id', checkJWT.check(['admin','former']), controllerHandler(absenceController.getAllAbsenceByUser));
router.patch('/absence/:event_id', checkJWT.check(['admin','former']), controllerHandler(absenceController.addAbsenceOfEvent));


// Route UPLOAD
router.post('/upload/',  checkJWT.check(['admin','former']),downloadController.imgDownload);

// LOGGER
router.use(handleError);


// 404
router.use((_req,res)=>{
    res.status(404).json('Sorry can`t find that!')
})

module.exports = router;