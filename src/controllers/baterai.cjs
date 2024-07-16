const Baterai = require('../models/baterai.cjs');
const { Op } = require('sequelize');
const moment = require('moment');

// API 'POST' baterai
exports.postBaterai = async (req, res) => {
    const { indikator_baterai } = req.body;
    const { mesin_username } = req.user;

    if (!indikator_baterai) {
        return res.json({ status: "error", error: "Please provide all required fields" });
    }

    try {
        const currentTime = new Date(); // Waktu saat ini
        await Baterai.create({ indikator_baterai, mesin_username, updatedAt: currentTime });
        return res.json({ status: "success", success: "Data added to baterai table successfully" });
    } catch (error) {
        console.error('Error adding data to baterai table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};

// API 'GET' baterai by username today
exports.getBaterai = async (req, res) => {
    try {
        const { mesin_username } = req.user; // Menggunakan req.username dari middleware authorize

        const currentTime = new Date(); // Waktu saat ini
        const tenSecondsAgo = moment(currentTime).subtract(11, 'seconds').toDate();

        // Cari data baterai terbaru berdasarkan username
        const latestData = await Baterai.findOne({
            where: {
                mesin_username: mesin_username,
                updatedAt: {
                    [Op.gte]: tenSecondsAgo // Cari data yang diperbarui setidaknya 10 detik yang lalu
                }
            },
            order: [['updatedAt', 'DESC']],
            limit: 1 // Menyortir data berdasarkan timestamp secara descending (terbaru terlebih dahulu)
        });

        if (!latestData) {
            // Jika tidak ada data terbaru dalam 10 detik terakhir
            return res.json({ status: "success", data: "Baterai is off" });
        }

        // Jika ada data terbaru dalam 10 detik terakhir
        return res.json({ status: "success", data: latestData });
    } catch (error) {
        console.error('Error getting data from baterai table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};
