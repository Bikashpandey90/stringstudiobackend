const { checkLogin } = require('../../middlewares/auth.middleware')
const { bodyValidator } = require('../../middlewares/body.validator')
const uploader = require('../../middlewares/multipart-parser.middleware')
const { allowedRole } = require('../../middlewares/rbac.middleware')
const authCtrl = require('./auth.controller')
const { loginDTO, AddUserDTO } = require('./auth.validator')

const authRouter = require('express').Router()

authRouter.post('/login', bodyValidator(loginDTO), authCtrl.login)
authRouter.get('/me', checkLogin, authCtrl.profile)
authRouter.get('/list', checkLogin, allowedRole('admin'), authCtrl.list)
authRouter.post('/add', checkLogin, allowedRole('admin'), bodyValidator(AddUserDTO), uploader().single('image'), authCtrl.add)


module.exports = authRouter