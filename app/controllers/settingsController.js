const debug = require('debug')('settingsController');
const settings = require('../config/settings.json');
const fs = require('fs');

module.exports = {

    getAllSetting:(req,res,next) => {
       
        if (settings){
            debug(' > getAllSetting() ')
            res.json(settings);
        } else {
            debug(' > getAllSetting() ')
            next();
        }

    },

    getStructureSetting:(req,res,next) => {
       
        const newSettings = {

            name: settings.name,
            address: settings.address,
            phone_number: settings.phone_number,
            email: settings.email,
            url_image: settings.url_image
        }

        if (newSettings){
            debug(' > getStructureSetting() ');
            res.json(newSettings);
            
        } else {
            debug(' > getStructureSetting() ');
            next();
        }

    },

    updateAllSetting: (req,res,next) =>{
        console.log(req.body);
        req.body.updatedAt = new Date(Date.now()).toISOString();
        const jsonString = JSON.stringify(req.body, null, 2);

        fs.writeFile('./app/config/settings.json', jsonString, err => {
            if (err) {
                debug(' > updateAllSetting() ')
                res.status(200).json({message: 'Error writing file', err})
                
            } else {
                debug(' > updateAllSetting() ')
                res.status(200).json({message: 'Successfully wrote file'})
                
            }
        })




}}