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

    },

    addPlace: async (req,res,next) =>{
        
        const newPlace = await DataMapper.addPlace(req.body);
        debug(' > addPlace()');
        if (newPlace) {
            res.json(newPlace)
        } else {
            next();
        } 

    },

    updatePlacebyId: async (req,res,next) =>{

        const newPlace = await DataMapper.updatePlaceById(req.body,req.params.place_id);
        debug(' > updatePlacebyId()');
        if (newPlace) {
            res.json(newPlace);
        } else {
            next();
        }
      },

      deletePlaceById: async (req, res, next) => {
        const place = await DataMapper.deletePlaceById(req.params.place_id)
        debug(place)
        debug(' > deletePlaceById()');
        if (place) {
            res.json({message:`Place :${place.id} is removed`, id:Number(place.id)});
        } else {
            next();
        }
    }
};