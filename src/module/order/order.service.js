const fileUploaderService = require("../../services/fileUploader.service");
const emailSvc = require("../../services/mail.service");
const { default: ConfirmationMail } = require("./emails");
const OrderModel = require("./order.model");

class OrderSvc {
    transformOrder = async (req) => {
        try {

            let data = req.body;
            let file = req.file;  //single upload
            if (file) {
                data.image = await fileUploaderService.uploadFile(file.path, '/order')
            }
            data.status = 'inactive';
            return data

        } catch (exception) {
            console.log(exception);
            throw exception
        }
    }
    createOrder = async (data) => {
        try {
            const orderObj = new OrderModel(data);
            return await orderObj.save();
        } catch (exception) {
            console.log("Create user", exception);
            throw exception
        }
    }

    getSingleOrderByFilter = async (filter) => {
        try {
            const order = await OrderModel.findOne(filter)
                .populate("user", ["_id", "name", "email", "image", "role", "status"])

            if (!order) {
                throw { code: "422", status: "USER_NOT_FOUND", message: "Order not found", detail: "" }
            }

            return order;

        } catch (exception) {
            console.log("GETSIGNLEORDERBYFILTER ERROR : ", exception);
            throw exception

        }
    }

    3
    sendConfirmation = async (name, orderId, email) => {
        try {
//             let msg = `<!DOCTYPE html>
// <html>
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Order Confirmation</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             background-color: #f4f4f4;
//             margin: 0;
//             padding: 0;
//         }
//         .container {
//             width: 100%;
//             max-width: 600px;
//             margin: 20px auto;
//             background: #ffffff;
//             padding: 20px;
//             border-radius: 8px;
//             box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//         }
//         .header {
//             text-align: center;
//             padding: 10px 0;
//             font-size: 24px;
//             font-weight: bold;
//             color: #333;
//         }
//         .content {
//             font-size: 16px;
//             color: #555;
//             line-height: 1.6;
//         }
//         .order-box {
//             font-size: 18px;
//             font-weight: bold;
//             color: #333;
//             text-align: center;
//             padding: 12px;
//             background: #f8f8f8;
//             border-radius: 5px;
//             margin: 20px 0;
//         }
//         .footer {
//             font-size: 12px;
//             text-align: center;
//             color: #888;
//             margin-top: 20px;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <div class="header">Order Confirmed 🎉</div>
//         <div class="content">
//             <p>Dear ${name},</p>

//             <p>Thank you for placing your order with us. We’re happy to let you know that your order has been successfully received.</p>

//             <p><strong>Your Order ID:</strong></p>
//             <div class="order-box">#${orderId}</div>

//             <p>Our team will review your order and update you once it is processed.</p>

//             <p>If you have any questions, feel free to contact us.</p>

//             <p>Warm regards,<br/>
//             <strong>${process.env.SMTP_FROM}</strong></p>
//         </div>
//         <div class="footer">
//             <em>This is an automated email. Please do not reply directly.</em>
//         </div>
//     </div>
// </body>
// </html>`
let msg=ConfirmationMail

            await emailSvc.sendEmail({
                to: email,
                subject: "Order Receieved",
                message: msg,
            });

        } catch (exception) {
            console.log(exception)
            throw exception

        }
    }


    getAllOrders = async () => {
        try {
            const response = await OrderModel.find()
                .populate("user", ["_id", "name", "email", "image", "role", "status"])

            return response

        } catch (exception) {
            console.log("All Orders LIst error", exception)
            throw exception
        }
    }


}
const orderSvc = new OrderSvc()
module.exports = orderSvc
