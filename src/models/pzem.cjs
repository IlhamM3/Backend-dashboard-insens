const { Sequelize } = require('sequelize');
const db = require('../config/db.cjs');
const Mesin = require('./mesin.cjs');

// object untuk menyimpan definisi yang digunakan berulang kali
const commonFields = {
    pzem_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tegangan: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull:false
    },
    arus: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull:false
    },
    energi: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull:false
    },
    frekuensi: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull:false
    },
    timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
};

// Definisikan setiap model pzem

const PzemR = db.define('pzem_r', {
    ...commonFields,
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

const PzemS = db.define('pzem_s', {
    ...commonFields,
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

const PzemT = db.define('pzem_t', {
    ...commonFields,
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

module.exports = {
    PzemR,
    PzemS,
    PzemT,
};