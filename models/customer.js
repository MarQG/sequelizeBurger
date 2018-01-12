module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("customer", {
      name: DataTypes.STRING
    });
  
    Customer.associate = function(models) {
      Customer.hasMany(models.Burger, {
        onDelete: "cascade"
      });
    };
  
    return Customer;
  };