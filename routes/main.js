const router = require('express').Router();

router.route('/')
    .get(async function (req, res) {
        res.send('HELLO Final project fe9');
    });

module.exports = router;
