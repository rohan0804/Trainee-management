const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const traineeDoubt = sequelize.define('traineeDoubt', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    questions: {
        type: Sequelize.STRING,
        allowNull: true
    },
    answers: {
        type: Sequelize.STRING,
        allowNull: true
    },
    trainee_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

});

module.exports = traineeDoubt;