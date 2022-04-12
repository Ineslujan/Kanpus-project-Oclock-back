const debug = require('debug')('absenceController');
const DataMapper = require('../dataMappers/absenceDataMapper');



module.exports = {

    getAllAbsenceByUser: async (req,res,next) => {

        const allAbsence = await DataMapper.getAllAbsenceByUser(req.params.user_id)
        if (allAbsence){
            res.json(allAbsence);
        } else {
            next();
        }

    },

    addAbsenceOfEvent: async (req,res,next) => {
        
        const resetAbsence = await DataMapper.resetAbsenceOfEvent(req.params.event_id)
        if (resetAbsence){
            debug(`Reset Absence for event id :${req.params.event_id}`);
            const userAbsent = [];
            for (const element of req.body.users) {
                
            
            //req.body.users.forEach(async element => {
                
                const addAbsence = await DataMapper.addAbsenceOfEvent(req.params.event_id,element)
                debug(`add new absence for user_id: ${element}`)
                if (addAbsence.id) {
                    userAbsent.push(addAbsence)
                }  

            };
            res.json(userAbsent)
        } else {
            next();
        }
       
    }
     
}