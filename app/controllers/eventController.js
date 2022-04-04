const debug = require('debug')('eventController');
const DataMapper = require('../dataMappers/eventDataMapper');

module.exports = {

    getOrganizer: async (req, res, next) => {

        const organizer = await DataMapper.getOrganizer(req.params.date);
        debug('get organizer called');
        if (organizer) {
            res.json(organizer);
        } else {
            next();
        }
    },

    checkIsAvailabe: async (req, res, next) => {

        const former = await DataMapper.checkIsAvailabeFormer(req.body.start_date, req.body.end_date);
        const place = await DataMapper.checkIsAvailabePlace(req.body.start_date, req.body.end_date);
        debug('Check former and place is availabe called');
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
        debug('adding new event and user called');
        if (newEvent) {
            res.json({msg:"post ok"})
        } else {
            next();
        }

    },

    getAllEventForUser: async (req, res, next) => {
        const myCourse = await DataMapper.getAllEventForUser(req.params.user_id,req.params.page_number);
        debug('get events for user called');
        if (myCourse) {
            res.json(myCourse);
        } else {
            next();
        }
    },

    updateEventById: async (req, res, next) => {
        const newEvent = await DataMapper.updateEventById(req.body,req.params.event_id);
        debug('UPTADE events for user called');
        if (newEvent) {
            res.json(newEvent);
        } else {
            next();
        }
    },

};