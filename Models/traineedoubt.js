const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const traineeDoubt = sequelize.define('traineeDoubt', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    topic: {
        type: Sequelize.STRING,
        allowNull: true
    },
    questions: {
        type: Sequelize.STRING,
        allowNull: true
    },
    answers: {
        type: Sequelize.STRING,
        allowNull: true
    },

});

module.exports = traineeDoubt;