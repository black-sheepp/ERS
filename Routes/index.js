const router = require('express').Router()
const homectrl = require('../Controller/home')

router.get('/',homectrl.home)

module.exports = router;