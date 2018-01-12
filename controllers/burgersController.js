var express = require('express');

var router = express.Router();

var burgers = require("../models/burger");

router.get("/", function (req, res) {
    burgers.all(function (data) {
        res.render("index", {
            burgers: data
        });
    });
});

router.post('/api/burgers/', function (req, res) {
    burgers.create(["burger_name"], [req.body.name], function (results) {
        res.json({
            id: results.insertId
        });
    });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = " id = " + req.params.id;
    burgers.update(req.body, condition, function (results) {
        if (results.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }

    });
});

router.delete("/api/burgers/:id", function (req, res) {
    var condition = " id = " + req.params.id;
    burgers.delete(condition, function (results) {
        res.status(200).end();
    });
})
module.exports = router;