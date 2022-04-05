const debug = require('debug')('userController');
const DataMapper = require('../dataMappers/userDataMapper');
const bcrypt = require('bcrypt');

module.exports = {

    getUserByPromoAndGroup: async (req,res,next) => {
        const userHasPromo = await DataMapper.getUserGroupByPromo();
        const userHasGroup = await DataMapper.getUserGroupByGroup();
        if (userHasGroup && userHasPromo){
            debug(`> getUserByPromoAndGroup()`);
            res.json({
                promos:userHasPromo,
                group:userHasGroup
            });
        } else {
            next();
        }

    },

    getUserByGroup: async (req,res,next) => {
        const users = await DataMapper.getUserByGroup();

        if (users){
            debug(`> getUserByGroup()`);
            res.json(users);
        } else {
            next();
        }

    },

    getUserByIsPermanent: async (req,res,next) => {
        const users = await DataMapper.getUserByIsPermanent();

        if (users){
            debug(`> getUserByIsPermanent()`);
            res.json(users);
        } else {
            next();
        }

    },

    adduser: async (req,res,next) => {
        
        if(req.body.new_password == req.body.confirm_new_password){
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(req.body.new_password, salt);

            let form = {}
            if(req.params.role == 'former'){

                form = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    address: req.body.address,
                    phone_number: req.body.phone_number,
                    email: req.body.email,
                    image: 'thumbnail.jpg',
                    color: req.body.color,
                    password: encryptedPassword,
                    is_permanent: req.body.is_permanent,
                    promo_id: null,
                    role:'former'
                }
            }
            else if(req.params.role == 'trainee'){

                form = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    address: req.body.address,
                    phone_number: req.body.phone_number,
                    email: req.body.email,
                    image: 'thumbnail.jpg',
                    color: null,
                    password: encryptedPassword,
                    is_permanent: null,
                    promo_id: req.body.promo_id,
                    role:'trainee'
                }
            } else {
                next();
            }
            const newUser = await DataMapper.addUser(form);
            if (newUser){
                debug(`> add_user() ${form.role}`);
                res.json(newUser);
            } else {
                next();
            } 
        }

    }
}