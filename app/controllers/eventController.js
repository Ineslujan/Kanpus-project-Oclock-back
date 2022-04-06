const debug = require('debug')('eventController');
const DataMapper = require('../dataMappers/eventDataMapper');

module.exports = {

    getOrganizer: async (req, res, next) => {

        const organizer = await DataMapper.getOrganizer(req.params.date);
        debug(' > getOrganizer()');
        if (organizer) {
            res.json(organizer);
        } else {
            next();
        }
    },

    checkIsAvailabe: async (req, res, next) => {

        const former = await DataMapper.checkFormerIsAvailabe(req.body.start_date, req.body.end_date);
        const place = await DataMapper.checkPlaceIsAvailabe(req.body.start_date, req.body.end_date);
        debug(' > checkIsAvailabe()');
        if (former && place) {
            res.json({
                former,
                place
            })
        } else {
            next();
        }

    },

    addEvent: async (req, res, next) => {

        const newEvent = await DataMapper.addEvent(req.body);
        debug(' > addEvent()');
        if (newEvent) {
            res.json(newEvent)
        } else {
            next();
        }

    },

    getAllEventForUser: async (req, res, next) => {
        const user_id = 1 // Alain for the test
        const myCourse = await DataMapper.getAllEventForUser(1,req.params.page_number);
        debug(' > getAllEventForUser()');
        if (myCourse) {
            res.json(myCourse);
        } else {
            next();
        }
    },

    updateEventById: async (req, res, next) => {
        const newEvent = await DataMapper.updateEventById(req.body,req.params.event_id);
        debug(' > updateEventById()');
        if (newEvent) {
            res.json(newEvent);
        } else {
            next();
        }
    },

    getEventById: async (req, res, next) => {
        const event = await DataMapper.getEventById(req.params.event_id);
        debug(' > getEventById()');
        if (event) {
            res.json(event);
        } else {
            next();
        }
    },
    
    deleteEventById: async (req, res, next) => {
        const event = await DataMapper.deleteEventById(req.params.event_id)
        debug(' > deleteEventById()');
        if (event) {
            res.json({message:`Event :${req.params.event_id} is removed`, id:Number(req.params.event_id)});
        } else {
            next();
        }
    },

};