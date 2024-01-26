const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Product = sequelize.define('cricketer', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  dob: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birthPlace: {
    type: Sequelize.STRING,
    allowNull: false
  },
  careerDesc: {
    type: Sequelize.STRING,
    allowNull: false
  },
  matches: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fifties: {
    type: Sequelize.INTEGER
  },
  centuries: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  wickets: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  average: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

module.exports = Product;