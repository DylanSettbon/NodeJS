var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Vehicle = require('./modal');

router.get('/', function (req, res) {
    console.log("HTTP GET /visitor/");
});

router.get('/:id', function (req, res) {
    if (req.params.id) {
        console.log('HTTP GET /visitor/' + req.params.id);
    } else {
        res.sendStatus(400);
    }
});

router.post('/', function (req, res) {
    console.log('HTTP POST /visitor/');
});

module.exports = router;
