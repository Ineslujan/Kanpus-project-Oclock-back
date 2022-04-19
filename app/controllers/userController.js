const debug = require('debug')('userController');
const DataMapper = require('../dataMappers/userDataMapper');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const url_avatar = process.env.URL_SERVER + 'avatar/';
module.exports = {

    getTraineeByPromoAndGroup: async (req, res, next) => {
        const userHasPromo = await DataMapper.getAllTraineeWithPromoByPromo();
        const userHasGroup = await DataMapper.getAllTraineeByGroup();
        if (userHasGroup && userHasPromo) {
            debug(`> getTraineeByPromoAndGroup()`);
            res.json({
                promos: userHasPromo,
                group: userHasGroup
            });
        } else {
            next();
        }

    },

    getAllTraineeByPromo: async (req, res, next) => {
        const users = await DataMapper.getAllTraineeByPromo();
        users.map((e)=>{
            e.trainee.map((trainee)=>{
                
                trainee.image_thumbnail = trainee.image
                trainee.image = url_avatar + trainee.image
            })
        })

        if (users) {
            debug(`> getAllTraineeByPromo()`);
            res.json(users);
        } else {
            next();
        }

    },

    getAllFormerByIsPermanent: async (req, res, next) => {
        const users = await DataMapper.getAllFormerByIsPermanent();

        users.map((e)=>{
            e.former.map((former)=>{
                
                former.image_thumbnail = former.image
                former.image = url_avatar + former.image
            })
        })

        if (users) {
            debug(`> getAllFormerByIsPermanent()`);
            res.json(users);
        } else {
            next();
        }

    },

    getFormerById: async (req, res, next) => {

        const former = await DataMapper.getFormerById(req.params.user_id);

        former.image = url_avatar + former.image;

        if (former) {
            debug(`> getFormerById()`);
            res.json(former);
        } else {
            next();
        }

    },

    getTraineeById: async (req, res, next) => {

        const trainee = await DataMapper.getTraineeById(req.params.user_id);

        trainee.image = url_avatar + trainee.image;

        if (trainee) {
            debug(`> getTraineeById()`);
            res.json(trainee);
        } else {
            next();
        }

    },


    addFomer: async (req, res, next) => {

        if (req.body.new_password == req.body.confirm_new_password) {
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(req.body.new_password, salt);

            let image = 'thumbnail.jpg'
            if(req.body.image == ''){
                image = req.body.image;
            }
                const form = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    address: req.body.address,
                    phone_number: req.body.phone_number,
                    email: req.body.email,
                    image: req.body.image,
                    color: req.body.color,
                    password: encryptedPassword,
                    is_permanent: req.body.is_permanent,
                    promo_id: null,
                    role: 'former'
                }
     
            const newUser = await DataMapper.addUser(form);
            if (newUser) {
                debug(`> addUser()`);
                delete newUser.password;
                res.json(newUser);
            } else {
                next();
            }
        }

    },

    addTrainee: async (req, res, next) => {

        if (req.body.new_password == req.body.confirm_new_password) {
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(req.body.new_password, salt);
          
            let image = 'thumbnail.jpg'
            if(req.body.image){
                image = req.body.image;
            }
                const form = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    address: req.body.address,
                    phone_number: req.body.phone_number,
                    email: req.body.email,
                    image: req.body.image,
                    color: null,
                    password: encryptedPassword,
                    is_permanent: null,
                    promo_id: req.body.promo_id,
                    role: 'trainee'
                }
     
            const newUser = await DataMapper.addUser(form);
            if (newUser) {
                debug(`> addTrainee()`);
                delete newUser.password;
                res.json(newUser);
            } else {
                next();
            }
        }

    },

    updateFormer: async (req, res, next) => {

        form = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            phone_number: req.body.phone_number,
            email: req.body.email,
            image: req.body.image,
            color: req.body.color,
            is_permanent: req.body.is_permanent,
            promo_id: null
        }

        const user = await DataMapper.updateUser(form, req.params.user_id);
        if (user) {
            debug(`> updateFormer()`);
            delete user.password;
            res.json(user);
        } else {
            next();
        }
    },

    updateTrainee: async (req, res, next) => {

        const isFormer = await DataMapper.isFormer(req.params.user_id);

        if (!isFormer.is_former) {

            form = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                phone_number: req.body.phone_number,
                email: req.body.email,
                image: req.body.image,
                color: null,
                is_permanent: null,
                promo_id: req.body.promo_id
            }

            const user = await DataMapper.updateUser(form, req.params.user_id);
            if (user) {
                debug(`> updateTrainee()`);
                delete user.password;
                res.json(user);
            } else {
                next();
            }
        } else {
            next();
        }

    },

    updateFormer: async (req, res, next) => {

        const isFormer = await DataMapper.isFormer(req.params.user_id);

        if (isFormer.is_former) {


            form = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                phone_number: req.body.phone_number,
                email: req.body.email,
                image: req.body.image,
                color: req.body.color,
                is_permanent: req.body.is_permanent,
                promo_id: null
            }

            const user = await DataMapper.updateUser(form, req.params.user_id);
            if (user) {
                debug(`> updateFormer()`);
                res.json(user);
            } else {
                next();
            }
        } else {
            next();
        }

    },

    updatePassword: async (req, res, next) => {
        console.log('user_id',req.decoded.user.id);

        let userId = req.decoded.user.id; 

        const oldPassword = await DataMapper.getPasswordById(userId);
        const validPwd = await bcrypt.compare(req.body.old_password, oldPassword.password);
        if (!validPwd) {
            return res.json({
                error: "Ce n'est pas le bon mot de passe."
            });
        }
        if (req.body.new_password != req.body.repeat_password) {
            return res.json({
                error: "Les 2 mots de passe ne sont pas identiques"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(req.body.new_password, salt);

        const data = await DataMapper.updatePassword(encryptedPassword, userId);

        if (data) {
            debug(`> updatePassword()`);
            res.json({ Message: "Mot de passe modifié" });
        } else {
            next();
        }

    },

    updatePasswordById: async (req, res, next) => {
        console.log('user_id',req.decoded.user.id);

        let userId = req.params.user_id

        if (req.body.new_password != req.body.repeat_password) {
            return res.json({
                error: "Les 2 mots de passe ne sont pas identiques"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(req.body.new_password, salt);

        const data = await DataMapper.updatePassword(encryptedPassword, userId);

        if (data) {
            debug(`> updatePassword()`);
            res.json({ Message: "Mot de passe modifié" });
        } else {
            next();
        }

    },

    deleteFormer: async (req, res, next) => {
        const former = await DataMapper.deleteFormer(req.params.user_id)

        if (former) {
            debug(`> deleteFormer()`);
            res.json({message:`former :${former.id} is removed`, id:Number(former.id)});
        } else {
            next();
        }

    },

    deleteTrainee: async (req, res, next) => {
        const trainee = await DataMapper.deleteTrainee(req.params.user_id)

        if (trainee) {
            debug(`> deleteTrainee()`);
            res.json({message:`Trainee :${trainee.id} is removed`, id:Number(trainee.id)});
        } else {
            next();
        }

    },

    login: async (req,res,next)=> {

        const user = await DataMapper.getUserByEmail(req.body.email)
        debug(user);

        if(user){
        
        const validPwd = await bcrypt.compare(req.body.password, user.password);
        debug(validPwd);
        if (!validPwd) {
            return res.json({
              error: "Ce n'est pas le bon mot de passe."
            });
          }
          delete user.password;

          const expireIn = 24 * 60 * 60;
          const token    = jwt.sign({
              user: user
          },
          SECRET_KEY,
          {
              expiresIn: expireIn
          });

          res.header('Authorization', 'Bearer ' + token);
         // res.header('Authorization',token);

          return res.status(200).json({
              logged:true,
              user
          });

        } else {
            return res.json({
                error: "Ce n'est pas le bon email."
            });
        }



    }







}