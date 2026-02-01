const mongoose = require("mongoose");
const { commonStr, schemaOpts } = require("../../common/schema");

const OrderSchema = new mongoose.Schema({
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
    secPhone: {
        type: String,
    },
    location: {
        district: {
            type: String,
            required: true
        },
        localArea: {
            type: String,
            required: true
        },
        nearbyLandmark: {
            type: String,
            required: true
        }
    },
    image: {
        type: String,
        required: true
    },
    orderCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null

    },
    addOns: {
        type: Array,
        default: null,

    },
    ...commonStr


}, schemaOpts)
const OrderModel = mongoose.model('Order', OrderSchema);
module.exports = OrderModel;