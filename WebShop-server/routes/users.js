var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/u', function(req, res, next) {
    res.send('respond with a resource,hello word')
})

router.get('/my', function(req, res, next) {
    res.send('my_router')
})

module.exports = router