const authSvc = require("../auth/auth.service");
const orderSvc = require("./order.service");

class OrderController {

    create = async (req, res, next) => {
        try {
            let data = await orderSvc.transformOrder(req);
            const order = await orderSvc.createOrder(data);
            await orderSvc.sendConfirmation(data.name, order._id, data.email)

            res.json({
                data: order,
                message: "Order Created",
                status: "ORDER_CREATED",
                options: null

            })
        } catch (exception) {
            console.log("Order Create", exception)
            next(exception)
        }
    }
    validate = async (req, res, next) => {
        try {
            const id = req.params.id
            const order = await orderSvc.getSingleOrderByFilter({ _id: id })

            order.status = 'active';
            await order.save()

            await orderSvc.sendApproved(order.name, order._id, order.email)


            res.json({
                data: order,
                message: "Order Approved",
                status: "ORDER_APPROVED",
                options: null

            })

        } catch (exception) {
            console.log("Validate Order", exception)
            next(exception)
        }
    }
    complete = async (req, res, next) => {
        try {
            const id = req.params.id
            const order = await orderSvc.getSingleOrderByFilter({ _id: id })

            order.orderCompleted = true
            await order.save()



            res.json({
                data: order,
                message: "Order Completed",
                status: "ORDER_APPROVED",
                options: null

            })

        } catch (exception) {
            console.log("Validate Order", exception)
            next(exception)
        }
    }

    list = async (req, res, next) => {
        try {
            const orders = await orderSvc.getAllOrders()

            res.json({
                data: orders,
                message: "Order List",
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
            const orders = await orderSvc.getSingleOrderByFilter({ _id: id })
            res.json({
                data: orders,
                message: "Order List",
                status: "ORDER_LIST",
                options: null
            })

        } catch (exception) {
            console.log(exception)
            next(exception)
        }
    }
    assign = async (req, res, next) => {
        try {
            const id = req.params.id
            const user = req.body.userId
            const worker = await authSvc.getSingleUserByFilter({ _id: user })
            const order = await orderSvc.getSingleOrderByFilter({ _id: id })
            order.user = worker
            await order.save()

            // const updatedData = await orderSvc


            await orderSvc.sendOrderAssigned(worker.name, id, worker.email)
            res.json({
                data: order,
                message: "Order Assigned",
                status: "ORDER_ASSIGNED",
                options: null

            })
        } catch (exception) {
            console.log(exception)
            next(exception)
        }
    }

}
const orderCtrl = new OrderController()
module.exports = orderCtrl