const { PzemR, PzemS, PzemT } = require('../models/pzem.cjs');
const { Op } = require('sequelize');
const moment = require('moment');

// API 'POST' untuk model PzemR
exports.postPzemR = async (req, res) => {
    try {
        const { tegangan, arus, energi, frekuensi } = req.body;
        const { mesin_username } = req.user;
        const pzemR = await PzemR.create({ tegangan, arus, energi, frekuensi, mesin_username });
        return res.json({ status: "success", data: pzemR });
    } catch (error) {
        console.error('Error adding data to PzemR table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};

// API 'GET' untuk model PzemR
exports.getPzemR = async (req, res) => {
    try {
        // Ambil username dari pengguna yang login
        const { mesin_username } = req.user; // Menggunakan req.username dari middleware authorize
        
        // Dapatkan waktu mulai dan akhir hari ini
        const startOfDay = moment().startOf('day').toDate();
        const endOfDay = moment().endOf('day').toDate();

        // Cari data baterai berdasarkan username dan timestamp di hari yang sama
        const rows = await PzemR.findAll({
            where: {
                mesin_username: mesin_username,
                timestamp: {
                    [Op.between]: [startOfDay, endOfDay] // Di antara awal dan akhir hari ini
                }
            },
            order: [['timestamp', 'DESC']] // Menyortir data berdasarkan timestamp secara descending (terbaru terlebih dahulu)
        });

        let message = "Alat: OFF";

        if (rows.length > 0) {
            const lastTimestamp = moment(rows[0].timestamp);

            if (moment().diff(lastTimestamp, 'seconds') < 30) {
                message = "Alat: ON";
            }
        }
        
        return res.json({ status: "success", data: rows, message: message });
    } catch (error) {
        console.error('Error getting data from Pzem R table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};

exports.getPzemR1 = async (req, res) => {
    try {
        // Ambil username dari pengguna yang login
        const { mesin_username } = req.user; // Menggunakan req.username dari middleware authorize

        // Dapatkan waktu mulai dan akhir hari ini
        const startOfDay = moment().startOf('day').toDate();
        const endOfDay = moment().endOf('day').toDate();

        // Cari data baterai berdasarkan username dan timestamp di hari yang sama
        const rows = await PzemR.findAll({
            where: {
                mesin_username: mesin_username,
                timestamp: {
                    [Op.between]: [startOfDay, endOfDay] // Di antara awal dan akhir hari ini
                }
            },
            order: [['timestamp', 'DESC']],
            limit: 1 // Menyortir data berdasarkan timestamp secara descending (terbaru terlebih dahulu)
        });
        let message = "Alat: OFF";

        if (rows.length > 0) {
            const lastTimestamp = moment(rows[0].timestamp);

            if (moment().diff(lastTimestamp, 'seconds') < 30) {
                message = "Alat: ON";
            }
        }
        
        return res.json({ status: "success", data: rows, message: message });
    } catch (error) {
        console.error('Error getting data from Pzem R table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};
// // API 'GET' all untuk model PzemR
// exports.getPzemR = async (req, res) => {
//     try {
//         const pzemRData = await PzemR.findAll();
//         return res.json({ status: "success", data: pzemRData });
//     } catch (error) {
//         console.error('Error getting data from PzemR table:', error);
//         return res.status(500).json({ status: "error", error: "Internal server error" });
//     }
// };

// API 'POST' untuk model PzemS
exports.postPzemS = async (req, res) => {
    try {
        const {tegangan, arus, energi, frekuensi } = req.body;
        const { mesin_username } = req.user;
        const pzemS = await PzemS.create({ tegangan, arus, energi, frekuensi, mesin_username });
        return res.json({ status: "success", data: pzemS });
    } catch (error) {
        console.error('Error adding data to PzemS table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};


// API 'GET' untuk model pzems
exports.getPzemS = async (req, res) => {
    try {
        // Ambil username dari pengguna yang login
        const { mesin_username } = req.user; // Menggunakan req.username dari middleware authorize

        // Dapatkan waktu mulai dan akhir hari ini
        const startOfDay = moment().startOf('day').toDate();
        const endOfDay = moment().endOf('day').toDate();

        // Cari data baterai berdasarkan username dan timestamp di hari yang sama
        const rows = await PzemS.findAll({
            where: {
                mesin_username: mesin_username,
                timestamp: {
                    [Op.between]: [startOfDay, endOfDay] // Di antara awal dan akhir hari ini
                }
            },
            order: [['timestamp', 'DESC']] 
        });
        
        let message = "Alat: OFF";

        if (rows.length > 0) {
            const lastTimestamp = moment(rows[0].timestamp);

            if (moment().diff(lastTimestamp, 'seconds') < 30) {
                message = "Alat: ON";
            }
        }
        
        return res.json({ status: "success", data: rows, message: message });
    } catch (error) {
        console.error('Error getting data from Pzem S table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};
exports.getPzemS1 = async (req, res) => {
    try {
        // Ambil username dari pengguna yang login
        const { mesin_username } = req.user; // Menggunakan req.username dari middleware authorize

        // Dapatkan waktu mulai dan akhir hari ini
        const startOfDay = moment().startOf('day').toDate();
        const endOfDay = moment().endOf('day').toDate();

        // Cari data baterai berdasarkan username dan timestamp di hari yang sama
        const rows = await PzemS.findAll({
            where: {
                mesin_username: mesin_username,
                timestamp: {
                    [Op.between]: [startOfDay, endOfDay] // Di antara awal dan akhir hari ini
                }
            },
            order: [['timestamp', 'DESC']],
            limit: 1
        });
        let message = "Alat: OFF";

        if (rows.length > 0) {
            const lastTimestamp = moment(rows[0].timestamp);

            if (moment().diff(lastTimestamp, 'seconds') < 30) {
                message = "Alat: ON";
            }
        }
        
        return res.json({ status: "success", data: rows, message: message });
    } catch (error) {
        console.error('Error getting data from Pzem S table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};

// // API 'GET' untuk model PzemS
// exports.getPzemS = async (req, res) => {
//     try {
//         const pzemSData = await PzemS.findAll();
//         return res.json({ status: "success", data: pzemSData });
//     } catch (error) {
//         console.error('Error getting data from PzemS table:', error);
//         return res.status(500).json({ status: "error", error: "Internal server error" });
//     }
// };

// API 'POST' untuk model PzemT
exports.postPzemT = async (req, res) => {
    try {
        const { tegangan, arus, energi, frekuensi } = req.body;
        const { mesin_username } = req.user;
        const pzemT = await PzemT.create({ tegangan, arus, energi, frekuensi, mesin_username });
        return res.json({ status: "success", data: pzemT });
    } catch (error) {
        console.error('Error adding data to PzemT table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};

// API 'GET' untuk model pzems
exports.getPzemT = async (req, res) => {
    try {
        const { mesin_username } = req.user; 

        const startOfDay = moment().startOf('day').toDate();
        const endOfDay = moment().endOf('day').toDate();

        const rows = await PzemT.findAll({
            where: {
                mesin_username: mesin_username,
                timestamp: {
                    [Op.between]: [startOfDay, endOfDay] 
                }
            },
            order: [['timestamp', 'DESC']] 
        });
       
        let message = "Alat: OFF";

        if (rows.length > 0) {
            const lastTimestamp = moment(rows[0].timestamp);

            if (moment().diff(lastTimestamp, 'seconds') < 30) {
                message = "Alat: ON";
            }
        }
        
        return res.json({ status: "success", data: rows, message: message });
    } catch (error) {
        console.error('Error getting data from Pzem T table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};
exports.getPzemT1 = async (req, res) => {
    try {
        // Ambil username dari pengguna yang login
        const { mesin_username } = req.user; // Menggunakan req.username dari middleware authorize

        // Dapatkan waktu mulai dan akhir hari ini
        const startOfDay = moment().startOf('day').toDate();
        const endOfDay = moment().endOf('day').toDate();

        // Cari data baterai berdasarkan username dan timestamp di hari yang sama
        const rows = await PzemT.findAll({
            where: {
                mesin_username: mesin_username,
                timestamp: {
                    [Op.between]: [startOfDay, endOfDay] // Di antara awal dan akhir hari ini
                }
            },
            order: [['timestamp', 'DESC']],
            limit: 1
        });
        let message = "Alat: OFF";

        if (rows.length > 0) {
            const lastTimestamp = moment(rows[0].timestamp);

            if (moment().diff(lastTimestamp, 'seconds') < 30) {
                message = "Alat: ON";
            }
        }
        
        return res.json({ status: "success", data: rows, message: message });
    } catch (error) {
        console.error('Error getting data from Pzem T table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};

// // API 'GET' all untuk model PzemT
// exports.getPzemT = async (req, res) => {
//     try {
//         const pzemTData = await PzemT.findAll();
//         return res.json({ status: "success", data: pzemTData });
//     } catch (error) {
//         console.error('Error getting data from PzemT table:', error);
//         return res.status(500).json({ status: "error", error: "Internal server error" });
//     }
// };