const authSvc = require("../auth/auth.service");
const enquirySvc = require("./enquiry.service");

class EnquiryController {

    create = async (req, res, next) => {
        try {
            const data = req.body;
            const enquiry = await enquirySvc.createEnquiry(data);
            await enquirySvc.sendConfirmation(data.name, enquiry._id, data.email)

            res.json({
                data: enquiry,
                message: "Enquiry Received",
                status: "ORDER_CREATED",
                options: null

            })
        } catch (exception) {
            console.log("Enquiry Create", exception)
            next(exception)
        }
    }


    list = async (req, res, next) => {
        try {
            const enquirys = await enquirySvc.getAllEnquirys()

            res.json({
                data: enquirys,
                message: "Enquiry List",
                status: "ORDER_LIST",
                options: null
            })

        } catch (exception) {
            console.log(exception)
            next(exception)
        }
    }
    detail = async (req, res, next) => {
        try {
            const id = req.params.id
            const enquirys = await enquirySvc.getSingleEnquiryByFilter({ _id: id })
            res.json({
                data: enquirys,
                message: "Enquiry List",
                status: "ORDER_LIST",
                options: null
            })

        } catch (exception) {
            console.log(exception)
            next(exception)
        }
    }
    resolve = async (req, res, next) => {
        try {
            const id = req.params.id
            const order = await enquirySvc.getSingleEnquiryByFilter({ _id: id })
            if (order.status === 'active') {
                res.json({
                    message: "Enquiry Already Resolved",
                    status: "ENQUIRY_ALREADY_RESOLVED",
                    options: null
                })
            }

            order.status = 'active';
            await order.save()

            res.json({
                data: order,
                message: "Enquiry Resolved",
                status: "ENQUIRY_RESOLVED",
                options: null

            })

        } catch (exception) {
            console.log("Validate Order", exception)
            next(exception)
        }
    }

}
const enquiryCtrl = new EnquiryController()
module.exports = enquiryCtrl