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

    getUserById: async (req, res, next) => {

        const user = await DataMapper.getUserById(req.params.user_id);

        user.image = url_avatar + user.image;

        if (user) {
            debug(`> getUserById()`);
            res.json(user);
        } else {
            next();
        }

    },


    addUser: async (req, res, next) => {

        if (req.body.new_password == req.body.confirm_new_password) {
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(req.body.new_password, salt);

            let form = {}
            if (req.params.role == 'former') {

                form = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    address: req.body.address,
                    phone_number: req.body.phone_number,
                    email: req.body.email,
                    image: 'thumbnail.png',
                    color: req.body.color,
                    password: encryptedPassword,
                    is_permanent: req.body.is_permanent,
                    promo_id: null,
                    role: 'former'
                }
            } else if (req.params.role == 'trainee') {

                form = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    address: req.body.address,
                    phone_number: req.body.phone_number,
                    email: req.body.email,
                    image: 'thumbnail.png',
                    color: null,
                    password: encryptedPassword,
                    is_permanent: null,
                    promo_id: req.body.promo_id,
                    role: 'trainee'
                }
            } else {
                next();
            }
            const newUser = await DataMapper.addUser(form);
            if (newUser) {
                debug(`> addUser() ${form.role}`);
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
        

        let userId = 1; // !! TO BE MODIFIED AS IT'S FOR TEST !!
        if(req.params.user_id){
            userId = req.params.user_id
        }

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

    deleteUser: async (req, res, next) => {
        const user = await DataMapper.deleteUser(req.params.user_id)

        if (user) {
            debug(`> deleteUser()`);
            res.json({message:`Place :${user.id} is removed`, id:Number(user.id)});
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