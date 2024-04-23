'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Api = sequelize.define('Api', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.STRING, 
      allowNull: true, 
    },
    screenSize: {
      type: DataTypes.FLOAT, 
      allowNull: true, 
    },
  });
  return Api;
};