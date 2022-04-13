const Joi = require('joi')
    .extend(require('@joi/date'));

module.exports.place = Joi.object({
    name: Joi.string(),
    position: Joi.number().strict().min(0).max(100),

});

// Validations of promo datas
module.exports.promo = Joi.object({
    name: Joi.string()

});

// Validations of user datas
module.exports.user = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    address: Joi.string(),
    phone_number: Joi.string(),
    email: Joi.string().email(),
    image: Joi.string(),
    new_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_new_password: Joi.ref('new_password'),
    is_permanent: Joi.boolean().allow(null, ''),
    color: Joi.string().pattern(new RegExp('^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$')).allow(null, ''),
    promo_id: Joi.number().allow(null, '')

});

// Validations of uevent datas
    // allowing null or empty string for datas
module.exports.event = Joi.object({
    name: Joi.string(),
    address: Joi.string().allow(null, ''),
    note: Joi.string().allow(null, ''),
    equipment: Joi.string().allow(null, ''),
    role: Joi.string().allow(null, ''),
    start_date: Joi.string(),
    end_date: Joi.string(),
    place_id: Joi.number(),
    trainee: Joi.array().items(Joi.number()),
    former: Joi.array().items(Joi.number())

});

// Validations of check_date datas with the date extensions of joi
module.exports.checkDate = Joi.object({
    name: Joi.string(),
    start_date: Joi.string(),
    end_date: Joi.string()
        
});

// Validations of signIn datas
module.exports.signIn = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

});

// Validations of updatePassword datas
module.exports.updatePassword = Joi.object({
    old_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    new_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('new_password'),

});

// Validations of updatePassword datas
module.exports.deletePlace = Joi.object({
    place_id: Joi.number()
});

// Validations of settings datas
module.exports.settings = Joi.object({
    name: Joi.string(),
    address: Joi.string(),
    phone_number: Joi.string(),
    email: Joi.string().email(),
    url_image: Joi.string(),
    course_start_hour_am: Joi.string(),
    course_end_hour_am: Joi.string(),
    course_start_hour_pm: Joi.string(),
    course_end_hour_pm: Joi.string()
});

