const Joi = require("joi");

const loginDTO = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const AddUserDTO = Joi.object({

    name: Joi.string().min(2).max(50).required().messages({
        "string.empty": "Name should not be empty"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
    }),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*_-])[A-Za-z\d!@#$%&*_-]{8,15}$/).required().messages({
        "string.empty": "Password should not be empty",
        "string.pattern.base": "Password should be at least 8 characters, at least one uppercase letter one digit and a special Character"
    }),

    role: Joi.string().regex(/^(user|admin)$/).default("admin"),  //customer, seller,admin

    phone: Joi.string().optional(),


}).unknown(true)

module.exports = {
    loginDTO,
    AddUserDTO
}