const { checkLogin } = require('../../middlewares/auth.middleware')
const { bodyValidator } = require('../../middlewares/body.validator')
const { allowedRole } = require('../../middlewares/rbac.middleware')
const enquiryCtrl = require('./enquiry.controller')
const { EnquiryDTO } = require('./enquiry.validator')

const enquiryRouter = require('express').Router()

enquiryRouter.post('/create', bodyValidator(EnquiryDTO), enquiryCtrl.create)
enquiryRouter.get('/list', checkLogin, allowedRole('admin'), enquiryCtrl.list)
enquiryRouter.get('/detail/:id', checkLogin, allowedRole('admin'), enquiryCtrl.detail)
enquiryRouter.get('/resolve/:id', checkLogin, allowedRole('admin'), enquiryCtrl.resolve)


module.exports = enquiryRouter