const { checkLogin } = require('../../middlewares/auth.middleware')
const { bodyValidator } = require('../../middlewares/body.validator')
const uploader = require('../../middlewares/multipart-parser.middleware')
const { allowedRole } = require('../../middlewares/rbac.middleware')
const orderCtrl = require('./order.controller')
const { OrderDTO, AssignDTO } = require('./order.validator')

const orderRouter = require('express').Router()

orderRouter.post('/create', bodyValidator(OrderDTO), uploader().single('image'), orderCtrl.create)
orderRouter.get('/validate/:id', checkLogin, allowedRole('admin'), orderCtrl.validate)
orderRouter.get('/complete/:id', checkLogin, allowedRole('admin'), orderCtrl.complete)
orderRouter.get('/list', checkLogin, allowedRole('admin'), orderCtrl.list)
orderRouter.post('/assign/:id', checkLogin, allowedRole('admin'), bodyValidator(AssignDTO), orderCtrl.assign)
orderRouter.get('/detail/:id', checkLogin, allowedRole('admin'), orderCtrl.detail)

module.exports = orderRouter