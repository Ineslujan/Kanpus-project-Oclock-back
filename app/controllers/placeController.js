const debug = require('debug')('placeController');
const DataMapper = require('../dataMappers/placeDataMapper');

module.exports = {

    getAllPlace: async (req,res,next) => {
        const allplace = await DataMapper.getAllPlace();
        if (allplace){
            res.json(allplace);
        } else {
            next();
        }

    }
};