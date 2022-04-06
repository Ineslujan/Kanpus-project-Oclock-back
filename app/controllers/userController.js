const debug = require('debug')('userController');
const DataMapper = require('../dataMappers/userDataMapper');
const bcrypt = require('bcrypt');

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

        if (users) {
            debug(`> getAllTraineeByPromo()`);
            res.json(users);
        } else {
            next();
        }

    },

    getAllFormerByIsPermanent: async (req, res, next) => {
        const users = await DataMapper.getAllFormerByIsPermanent();

        if (users) {
            debug(`> getAllFormerByIsPermanent()`);
            res.json(users);
        } else {
            next();
        }

    },

    getUserById: async (req, res, next) => {

        const user = await DataMapper.getUserById(req.params.user_id);

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
                    image: 'thumbnail.jpg',
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
                    image: 'thumbnail.jpg',
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
        

        let userId = 1;
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
            res.json({ Message: "Utilisateur supprimé" });
        } else {
            next();
        }

    },






}