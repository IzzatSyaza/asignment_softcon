'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId', as: 'user'})
    }
  }
  order.init({
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalprice: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'orders',
    modelName: 'Order',
  });
  return order;
};