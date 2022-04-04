const debug = require('debug')('userController');
const DataMapper = require('../dataMappers/userDataMapper');

module.exports = {

    getUserByPromoAndGroup: async (req,res,next) => {
        const userHasPromo = await DataMapper.getUserGroupByPromo();
        const userHasGroup = await DataMapper.getUserGroupByGroup()
        if (userHasGroup && userHasPromo){
            res.json({
                promos:userHasPromo,
                group:userHasGroup
            });
        } else {
            next();
        }

    }
}