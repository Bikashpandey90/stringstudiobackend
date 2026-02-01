const fileUploaderService = require("../../services/fileUploader.service");
const emailSvc = require("../../services/mail.service");
const EnquiryModel = require("./enquiry.model");

class EnquirySvc {

    createEnquiry = async (data) => {
        try {
            const enquiryObj = new EnquiryModel(data);
            return await enquiryObj.save();
        } catch (exception) {
            console.log("Create user", exception);
            throw exception
        }
    }

    getSingleEnquiryByFilter = async (filter) => {
        try {
            const enquiry = await EnquiryModel.findOne(filter)

            if (!enquiry) {
                throw { code: "422", status: "USER_NOT_FOUND", message: "Enquiry not found", detail: "" }
            }

            return enquiry;

        } catch (exception) {
            console.log("GETSIGNLEORDERBYFILTER ERROR : ", exception);
            throw exception

        }
    }


    sendConfirmation = async (name, enquiryId, email) => {
        try {
            let msg = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enquiry Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            benquiry-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }
        .content {
            font-size: 16px;
            color: #555;
            line-height: 1.6;
        }
        .enquiry-box {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            text-align: center;
            padding: 12px;
            background: #f8f8f8;
            benquiry-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            font-size: 12px;
            text-align: center;
            color: #888;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Enquiry Confirmed 🎉</div>
        <div class="content">
            <p>Dear ${name},</p>

            <p>Thank you for placing your enquiry with us. We’re happy to let you know that your enquiry has been successfully received.</p>

            <p><strong>Your Enquiry ID:</strong></p>
            <div class="enquiry-box">#${enquiryId}</div>

            <p>Our team will review your enquiry and update you once it is processed.</p>

            <p>If you have any questions, feel free to contact us.</p>

            <p>Warm regards,<br/>
            <strong>${process.env.SMTP_FROM}</strong></p>
        </div>
        <div class="footer">
            <em>This is an automated email. Please do not reply directly.</em>
        </div>
    </div>
</body>
</html>`

            await emailSvc.sendEmail({
                to: email,
                subject: "Enquiry Receieved",
                message: msg,
            });


        } catch (exception) {
            console.log(exception)
            throw exception

        }
    }


    getAllEnquirys = async () => {
        try {
            const response = await EnquiryModel.find()

            return response

        } catch (exception) {
            console.log("All Enquirys LIst error", exception)
            throw exception
        }
    }



}
const enquirySvc = new EnquirySvc()
module.exports = enquirySvc
