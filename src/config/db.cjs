// const { Sequelize } = require('sequelize');

// // Inisialisasi Sequelize dengan koneksi ke database MySQL
// const db = new Sequelize('insenske_modul_sensor', 'insenske_admin', 'ip#RCVpTSkqQ', {
//   host: 'api.insens.kencang.id',
//   dialect: 'mysql',
//   timezone: '+07:00'
// });

// // Test koneksi
// db.authenticate()
//   .then(() => {
//     console.log('Database is connected successfully!');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// module.exports = db; // Export instance sequelize untuk digunakan di seluruh aplikasi

const { Sequelize } = require('sequelize');

// Inisialisasi koneksi Sequelize
const db = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password:'',
  database:'modul_sensor',
  dialectOptions: {
    timezone: '+07:00', // Mengatur zona waktu untuk penulisan ke database
    dateStrings: true, // Menggunakan string untuk tanggal/waktu
    typeCast: true // Menggunakan tipe casting untuk tanggal/waktu
  },
  timezone: '+07:00'
});

module.exports = db;
