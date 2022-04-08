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

    async updatePlace(form,place_id) {

        const query = `SELECT * FROM update_place($1,$2);`;
        const value = [form, place_id];
    
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> updatePlace()`);
        if (!data) {
          throw new ApiError('No data found for > updatePlace()', 500);
        }
        
        return data;
      },

      deletePlaceById: async (req, res, next) => {
        const place = await DataMapper.deletePlaceById(req.params.place_id)
        debug(' > deletePlaceById()');
        if (place) {
            res.json({message:`Place :${req.params.place_id} is removed`, id:Number(req.params.place_id)});
        } else {
            next();
        }
    },
};