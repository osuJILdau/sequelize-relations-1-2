const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Author = sequelize.define('Author', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'authors',
  timestamps: false,
});

module.exports = Author;
