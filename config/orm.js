var connection = require('./connections');


// ====== Helper Functions =======

function generateQuestionMarks(number){
    var arr = [];

    for(var i  = 0; i < number; i++){
        arr.push("?");
    }
    return arr.toString();
}

function objectToSql(obj){
    var arr = [];
    for( var key in obj){
        var value = obj[key];
        if(Object.hasOwnProperty.call(obj, key)){
            if(typeof value === 'string' && value.indexOf(' ') >= 0){
                value = "'" + value + "'";
            }

            arr.push(key + "=" + value);
        }
    }

    return arr.toString();
}

// ====== Export ORM ======
module.exports = {

    selectAll: function(table, callback){
        connection.query('SELECT * FROM ' + table, function(err, data){
            if(err)throw err;

            callback(data);
        });
    },
    insertOne: function(table, columns, values, callback){
        var query = `INSERT INTO ${table} (${columns.toString()}) VALUES (${generateQuestionMarks(values.length)}) `;
        console.log(query);

        connection.query(query, values, function(err, data){
            if(err) throw err;
            callback(data);
        });
    },
    updateOne: function(table, objColVals, condition, callback){
        var query = `UPDATE ${table} SET ${objectToSql(objColVals)} WHERE ${condition}`;
        console.log(query);
        connection.query(query, function(err, data){
            if(err) throw err;
            callback(data);
        });
    },
    removeOne: function(table, condition, callback){
        var query = `DELETE FROM ${table} WHERE ${condition}`;
        console.log(query);
        connection.query(query, function(err, data){
            if(err)throw err;
            callback(data);
        })
    }
};
