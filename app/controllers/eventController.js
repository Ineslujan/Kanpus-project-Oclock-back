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

        const former = await DataMapper.checkIsAvailabeFormer(req.body.start_date, req.body.end_date)
        const place = await DataMapper.checkIsAvailabePlace(req.body.start_date, req.body.end_date)
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
        console.log(req.body);
        const newEvent = await DataMapper.addEvent(req.body)
       
        debug('adding new event and user called');
        if (newEvent) {
            res.json({msg:"post ok"})
        } else {
            next();
        }

    },

    getUserByPromoAndGroup: async (req,res,next) => {
        const userHasPromo = await DataMapper.getUserGroupByPromo();
        const userHasGroup = await DataMapper.getUserGroupByGroup();
        if (userHasGroup && userHasPromo){
            res.json({
                promos:userHasPromo,
                group:userHasGroup

            })
        } else {
            next();
        }

    }

};