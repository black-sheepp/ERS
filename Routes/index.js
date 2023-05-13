const router = require('express').Router()
const homectrl = require('../Controller/home')

router.get('/',homectrl.home)
router.get('/sign-in',homectrl.signIn)
router.get('/sign-up',homectrl.signUp)

module.exports = router;