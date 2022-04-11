const Joi = require('joi')
    .extend(require('@joi/date'));

module.exports.place = Joi.object({
    name: Joi.string(),
    position: Joi.number().strict().min(0).max(100),

});

module.exports.promo = Joi.object({
    name: Joi.string()

});

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

module.exports.event = Joi.object({
    name: Joi.string(),
    address: Joi.string().allow(null, ''),
    note: Joi.string().allow(null, ''),
    equipment: Joi.string().allow(null, ''),
    role: Joi.string().allow(null, ''),
    start_date: Joi.date().format('YYYY-MM-DD hh:mm:ss'),
    end_date: Joi.date().format('YYYY-MM-DD hh:mm:ss'),
    place_id: Joi.number(),
    trainee: Joi.array().items(Joi.number()),
    former: Joi.array().items(Joi.number())

});

module.exports.checkDate = Joi.object({
    name: Joi.string(),
    start_date: Joi.date().format('YYYY-MM-DD hh:mm:ss'),
    end_date: Joi.date().format('YYYY-MM-DD hh:mm:ss')
        
});

module.exports.signIn = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

});

module.exports.updatePassword = Joi.object({
    old_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    new_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('new_password'),

});

module.exports.deletePlace = Joi.object({
    place_id: Joi.number()
});


// {
//     "old_password":"kanpus",
//     "new_password":"romain",
//     "repeat_password":"romain"
// }

