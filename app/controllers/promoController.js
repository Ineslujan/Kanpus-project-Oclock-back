const debug = require('debug')('promoController');
const DataMapper = require('../dataMappers/promoDataMapper');

module.exports = {

    getAllPromo: async (req,res,next) => {
        const allpromo = await DataMapper.getAllPromo();
        if (allpromo){
            res.json(allpromo);
        } else {
            next();
        }

    },

    addPromo: async (req,res,next) => {
        
        const newPromo = await DataMapper.addPromo(req.body);
        debug(' > addPromo()');
        if (newPromo) {
            res.json(newPromo)
        } else {
            next();
        } 

    },

    updatePromoById: async (req,res,next) => {

        const newPromo = await DataMapper.updatePromoById(req.body,req.params.promo_id);
        debug(' > updatePromoById()');
        if (newPromo) {
            res.json(newPromo);
        } else {
            next();
        }
    },


      deletePromoById: async (req, res, next) => {
        const promo = await DataMapper.deletePromoById(req.params.promo_id)
        debug(' > deletePromoById()');
        if (promo) {
            res.json({message:`Promo :${req.params.promo_id} is removed`, id:Number(req.params.promo_id)});
        } else {
            next();
        }
    },
}