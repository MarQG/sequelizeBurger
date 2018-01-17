
var db = require("../models");
module.exports = function(app){
    app.get("/", function (req, res) {
        db.burgers.findAll({ include: [ db.customer] }).then(function (data) {
            res.render("index",{
                burgers:data
            });
        });
    });
    
    app.post('/api/burgers/', function (req, res) {
        db.burgers.create({
            burger_name: req.body.name
        });
    });
    
    app.put("/api/burgers/:id", function (req, res) {
        db.customer.findOne({
            where: {
                name: req.body.customer
            }
        }).then(function(result) {
            if(result === null){
                db.customer.create({
                    name: req.body.customer
                }).then(function(results){
                    db.burgers.update({
                        devoured:true,
                        customerId: results.get('id')
                    },{
                        where: {
                            id: req.params.id
                        }
                    }).then(function(data){
                        res.json(data);
                    });
                });
            } else {
                db.burgers.update({
                    devoured:true,
                    customerId: result.get('id')
                },{
                    where: {
                        id: req.params.id
                    }
                }).then(function(data){
                    res.json(data);
                });
            }
        })
        
       
    });
    
    app.delete("/api/burgers/:id", function (req, res) {
        db.burgers.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(data){
            res.json(data);
        })
    })
}