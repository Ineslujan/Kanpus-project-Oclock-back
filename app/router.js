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


// Route LOGIN
    //  Still under work
router.get('/signin/', controllerHandler(settingsController.getStructureSetting));
router.post('/signin/',validator(schema.signIn, 'body'), controllerHandler(userController.login));
router.get('/test/',checkJWT.check(['trainee']) ,(req,res,next)=>{
    console.log('TEST OK -----------------------');
    console.log('decoded',req.decoded.user);
    res.json({
        message: "ok" , 
        decoded :req.decoded.user
    });
});


// Routes EVENT
router.get('/event/organizer/:date', controllerHandler(eventController.getOrganizer));
router.post('/event/check_date/:event_id',validator(schema.checkDate, 'body'), controllerHandler(eventController.checkIsAvailabe));
router.post('/event/',validator(schema.event, 'body'), controllerHandler(eventController.addEvent));
router.get('/event/my_course/:page_number',controllerHandler(eventController.getAllEventForUser));
router.patch('/event/:event_id',validator(schema.event, 'body'), controllerHandler(eventController.updateEventById));
router.get('/event/:event_id', controllerHandler(eventController.getEventById));
router.delete('/event/:event_id', controllerHandler(eventController.deleteEventById));


// Routes USER 
    // !! ORDER MATTERS !!
    
router.get('/user/event_form/', controllerHandler(userController.getTraineeByPromoAndGroup));
   
    // FORMER
router.get('/user/former/', controllerHandler(userController.getAllFormerByIsPermanent));
router.get('/user/former/:user_id', controllerHandler(userController.getFormerById));
router.post('/user/former/', validator(schema.user, 'body'), controllerHandler(userController.addFomer));
router.patch('/user/former/:user_id', validator(schema.user, 'body'), controllerHandler(userController.updateFormer));
router.delete('/user/former/:user_id', controllerHandler(userController.deleteFormer));

    // TRAINEE
router.get('/user/trainee/', controllerHandler(userController.getAllTraineeByPromo));
router.get('/user/trainee/:user_id', controllerHandler(userController.getTraineeById));
router.post('/user/trainee/', validator(schema.user, 'body'), controllerHandler(userController.addTrainee));
router.patch('/user/trainee/:user_id', validator(schema.user, 'body'), controllerHandler(userController.updateTrainee));
router.delete('/user/trainee/:user_id', controllerHandler(userController.deleteTrainee));

    // PASSWORD
router.patch('/user/password', validator(schema.updatePassword, 'body'), controllerHandler(userController.updatePassword));
router.patch('/user/password/:user_id', validator(schema.updatePassword, 'body'), controllerHandler(userController.updatePassword));


// Routes PLACE
router.get('/place/', controllerHandler(placeController.getAllPlace));
router.post('/place/',validator(schema.place, 'body'), controllerHandler(placeController.addPlace));
router.patch('/place/:place_id',validator(schema.place, 'body'), controllerHandler(placeController.updatePlacebyId));
router.delete('/place/:place_id', controllerHandler(placeController.deletePlaceById));


// Routes PROMO
router.get('/promo/', controllerHandler(promoController.getAllPromo));
router.post('/promo/',validator(schema.promo, 'body'), controllerHandler(promoController.addPromo));
router.patch('/promo/:promo_id',validator(schema.promo, 'body'), controllerHandler(promoController.updatePromoById));
router.delete('/promo/:promo_id', controllerHandler(promoController.deletePromoById));


// Routes SETTINGS
router.get('/settings/', controllerHandler(settingsController.getAllSetting));
router.put('/settings/' ,validator(schema.settings, 'body'),controllerHandler(settingsController.updateAllSetting));


// Routes ABSENCE
router.get('/absence/:user_id', controllerHandler(absenceController.getAllAbsenceByUser));
router.patch('/absence/:event_id', controllerHandler(absenceController.addAbsenceOfEvent));


// LOGGER
router.use(handleError);


// 404
router.use((_req,res)=>{
    res.status(404).json('Sorry can`t find that!')
})

module.exports = router;