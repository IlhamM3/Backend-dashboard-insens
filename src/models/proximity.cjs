const { Sequelize } = require('sequelize');
const db = require('../config/db.cjs');
const Mesin = require('./mesin.cjs');

// Definisikan model Proximity
const Proximity = db.define('Proximity', {
    proximity_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cycle: {
        type: Sequelize.INTEGER
    },
    timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    mesin_username: {
        type: Sequelize.STRING,
        references: {
        model: Mesin,
        key: 'username'
        }
    }
    }, {
    freezeTableName: true
});

module.exports = Proximity;