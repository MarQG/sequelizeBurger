
module.exports = function(sequelize, DataTypes){
    var Burger = sequelize.define('burgers', {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:{
                    args: [1],
                    msg: "Burger name too short."
                }
            }
        },
        devoured:{
            type: DataTypes.BOOLEAN,
            default: false
        }
    });


    Burger.associate = function(models){
        Burger.belongsTo(models.Customer, {
            foreignKey: {
                allowNull:false
            }
        })
    }
    return Burger;
}