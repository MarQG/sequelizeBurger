var orm = require('../config/orm');

module.exports = {
    all: function(callback){
        orm.selectAll('burgers', function(res){
            callback(res);
        });
    },
    create: function(cols, vals, callback){
        orm.insertOne('burgers', cols, vals, function(res){
            callback(res);
        });
    },
    update: function(objColsVals, condition, callback){
        orm.updateOne('burgers', objColsVals, condition, function(res){
            callback(res);
        });
    },
    delete: function(condition, callback){
        orm.removeOne('burgers', condition, function(res){
            callback(res);
        });
    }
};