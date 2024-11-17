const Joi = require("joi");

module.exports.listingShema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow("", null),
        payment: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required()
})
