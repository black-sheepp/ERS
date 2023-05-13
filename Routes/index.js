const router = require('express').Router()
const homectrl = require('../Controller/home')

router.get('/',homectrl.home)
router.get('/sign-in',homectrl.signIn)
router.get('/sign-up',homectrl.signUp)
router.use('/user',require('./user'))


module.exports = router;