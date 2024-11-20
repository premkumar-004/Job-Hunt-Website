const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.object({
            url: Joi.string().allow("", null),
        }).required(),
        payment: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
    }).required()
})
