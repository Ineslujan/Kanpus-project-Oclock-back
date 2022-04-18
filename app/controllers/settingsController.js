const debug = require('debug')('settingsController');
const settings = require('../config/settings.json');
const fs = require('fs');

// Controller only useful for reading and rewritting of the structure settings json
module.exports = {

    getAllSetting: (req, res, next) => {


        fs.readFile('./app/config/settings.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                next();
                return
            }
            
            const json = JSON.parse(data)
            console.log('*****',data)
            res.json(json);
        })

    },

    getStructureSetting: (req, res, next) => {

        fs.readFile('./app/config/settings.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                next();
                
            }
            const json = JSON.parse(data)
            const newSettings = {

                name: json.name,
                address: json.address,
                phone_number: json.phone_number,
                email: json.email,
                url_image: json.url_image
            }

            
            console.log(newSettings)
            res.json(newSettings);
        })



        // if (newSettings) {
        //     debug(' > getStructureSetting() ');
        //     res.json(newSettings);

        // } else {
        //     debug(' > getStructureSetting() ');
        //     next();
        // }

    },

    updateAllSetting: (req, res, next) => {
        console.log(req.body);
        req.body.updatedAt = new Date(Date.now()).toISOString();
        const jsonString = JSON.stringify(req.body, null, 2);

        console.log("\nGranting read and write access to user");
        fs.chmod('./app/config/settings.json', 0o600, () => {
            console.log("Trying to write to file");


            fs.writeFile('./app/config/settings.json', jsonString, err => {
                if (err) {
                    debug(' > updateAllSetting() ')
                    res.status(200).json({
                        message: 'Error writing file',
                        err
                    })

                } else {
                    debug(' > updateAllSetting() ')
                    res.status(200).json({
                        message: 'Successfully wrote file'
                    })

                }
            })

        });




    }
}