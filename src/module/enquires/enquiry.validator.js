const Joi = require("joi");

const EnquiryDTO = Joi.object({
    email: Joi.string().email().required("Email is required"),
    name: Joi.string().required("Name is required"),
    phone: Joi.string().required("Phone number is required"),
    message: Joi.string().required("Message cannot be empty")
})

module.exports = {
    EnquiryDTO,
}