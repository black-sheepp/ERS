const router = require('express').Router()
const userctrl = require('../Controller/user')

router.post('/create-user',userctrl.createUser)

module.exports = router;