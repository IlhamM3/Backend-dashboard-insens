const {Sequelize} = require('sequelize');
const db = require('../config/db.cjs');

// Definisikan model Mesin
const Mesin = db.define('Mesin', {
  username: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull:false
  },
  merek_mesin: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true  // untuk menggunakan penamaan tabel secara singular
});

// Sinkronisasi model dengan database untuk membuat tabel
db.sync()
  .then(() => {
    console.log('Tabel telah dibuat atau sudah ada');
  })
  .catch(err => {
    console.error('Gagal membuat tabel:', err);
  });

module.exports = Mesin;
