const authRouter = require('../module/auth/auth.router');
const enquiryRouter = require('../module/enquires/enquiry.router');
const orderRouter = require('../module/order/order.router');

const router = require('express').Router();

router.use('/auth', authRouter)
router.use('/order', orderRouter)
router.use('/inquiry',enquiryRouter)



module.exports = router;