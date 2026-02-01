const mongoose = require("mongoose");
const { commonStr, schemaOpts } = require("../../common/schema");

const EnquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    ...commonStr


}, schemaOpts)
const EnquiryModel = mongoose.model('Enquiry', EnquirySchema);
module.exports = EnquiryModel;