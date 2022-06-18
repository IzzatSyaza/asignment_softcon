'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order}) {
      // define association here
      // this.hasOne(Jury, {foreignKey: 'userId', as: 'juries'});
      // this.hasOne(School, {foreignKey: 'userId', as: 'schools'});
      // this.hasOne(Participant, {foreignKey: 'userId', as: 'particpants'});
      this.hasMany(Order, {foreignKey: 'userId', as: 'order'});

    }
  }
  user.init({
    username: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {msg: 'Name must not be empty'},
      }
    },
    password: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    address: { 
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    tablelName: 'users',
    modelName: 'User',
  });
  return user;
};