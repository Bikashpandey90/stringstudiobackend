const Joi = require("joi");

const OrderDTO = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
    secPhone: Joi.string().optional(),
    location: {
        district: Joi.string().required(),
        localArea: Joi.string().required(),
        nearbyLandmark: Joi.string().required()
    },
    addOns: {
        itemId: Joi.array().items(Joi.string()).optional()
    }
})
const AssignDTO = Joi.object({
    userId: Joi.string().required()
})

module.exports = {
    OrderDTO,
    AssignDTO
}