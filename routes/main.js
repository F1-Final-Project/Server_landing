const router = require('express').Router();

router.route('/')
    .get(async function (req, res) {
        res.send('HELLO Final Project');
    });

module.exports = router;
