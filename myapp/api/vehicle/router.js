var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Vehicle = require('./modal');

router.get('/', function (req, res) {
    Vehicle.getall(function (err, rows) {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json(rows);
            res.sendStatus(200);
        }
    });
});

router.get('/:id', function (req, res) {
    if (req.params.id) {
        Vehicle.get(req.params.id, function (err, rows) {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.json(rows);
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(400);
    }
});
router.delete('/:id', function (req, res) {
    if (req.params.id) {
        Vehicle.deleted(req.params.id, function (err) {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.json({"message":"deleted"});
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(400);
    }
});


router.patch("/:id", (req, res, next) => {
    if (req.params.id) {
        var params=[req.body.marque__b, req.body.modele__b,req.body.plaque__b,req.params.id]
        Vehicle.updated(params, function (err) {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.json({
                    "message":"success",
                    "data": data,
                    "id" : this.lastID
                 });
                res.sendStatus(200);
            }
        });
    } else {
        res.sendStatus(400);
    }
})


router.post('/', function (req, res) {
    var errors=[]
    if (!req.body.marque__b){
        errors.push("No Marque specified");
    }
    if (!req.body.modele__b){
        errors.push("No Modele specified");
    }
    if (!req.body.plaque__b){
        errors.push("No Plaque specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        marque__b: req.body.marque__b,
        modele__b: req.body.modele__b,
        plaque__b: req.body.plaque__b,
    }
    var params =[data.marque__b, data.modele__b, data.plaque__b]
    Vehicle.add(params, function (err,result) {
        if (err) {
            res.status(400).json(err);
        }
        else {
            res.json({
               "message":"success",
               "data": data,
               "id" : this.lastID
            });
        }
    });
});

module.exports = router;
