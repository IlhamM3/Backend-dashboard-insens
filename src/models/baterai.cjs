const { Sequelize } = require('sequelize');
const db = require('../config/db.cjs');
const Mesin = require('./mesin.cjs');

// Definisikan model Baterai
const Baterai = db.define('baterai', {
    baterai_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    indikator_baterai: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
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

module.exports = Baterai;