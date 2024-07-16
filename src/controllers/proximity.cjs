const Proximity = require('../models/proximity.cjs');
const { Op } = require('sequelize');
const moment = require('moment');

// API 'POST' proximity
exports.postProximity = async (req, res) => {
    const { cycle } = req.body;
    const { mesin_username } = req.user;


    if (!cycle) {
        return res.json({ status: "error", error: "Please provide all required fields" });
    }

    try {
        await Proximity.create({ cycle, mesin_username });
        return res.json({ status: "success", success: "Data added to proximity table successfully" });
    } catch (error) {
        console.error('Error adding data to proximity table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};

// API 'GET' proximity
exports.getProximity = async (req, res) => {
    try {
        const { mesin_username } = req.user; // Perbaikan disini

        const startOfDay = moment().startOf('day').toDate();
        const endOfDay = moment().endOf('day').toDate();

        const rows = await Proximity.findAll({
            where: {
                mesin_username: mesin_username, // Perbaikan disini
                timestamp: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            },
            order: [['timestamp', 'DESC']] // Menyortir data berdasarkan timestamp secara descending (terbaru terlebih dahulu)
        });
        return res.json({ status: "success", data: rows});
    } catch (error) {
        console.error('Error getting data from proximity table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error"});
    }
};

exports.getProximitylimit1 = async (req, res) => {
    try {
        const { mesin_username } = req.user;

        const startOfDay = moment().startOf('day').toDate();
        const endOfDay = moment().endOf('day').toDate();

        const rows = await Proximity.findAll({
            where: {
                mesin_username: mesin_username,
                timestamp: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            },
            order: [['timestamp', 'DESC']],
            limit: 1 
        });

        return res.json({ status: "success", data: rows});
    } catch (error) {
        console.error('Error getting data from proximity table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error"});
    }
};

// // API 'GET' all proximity
// exports.getProximity = async (req, res) => {
//     try {
//         const rows = await Proximity.findAll();
//         if (!rows || !rows.length) {
//             return res.status(404).json({ status: "error", error: "Data not found"})
//         }
//         return res.json({ status: "success", data: rows});
//     } catch (error) {
//         console.error('Error getting data from prximity table:', error);
//         return res.status(500).json({ status: "error", error:"Internal server error"})
//     }
// };