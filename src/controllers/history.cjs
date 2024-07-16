const Proximity = require('../models/proximity.cjs');
const { PzemR, PzemS, PzemT } = require('../models/pzem.cjs');
const { Op } = require('sequelize');
const moment = require('moment');

// history proximity
exports.getProxHistory = async (req, res) => {
    try {
        const { mesin_username } = req.user;
        const { startDate, endDate } = req.query;

        const startOfDay = startDate ? moment(startDate).startOf('day').toDate() : moment().startOf('day').toDate();
        const endOfDay = endDate ? moment(endDate).endOf('day').toDate() : moment().endOf('day').toDate();

        const rows = await Proximity.findAll({
            where: {
                mesin_username: mesin_username,
                timestamp: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            },
            order: [['timestamp', 'DESC']]
        });
        return res.json({ status: "success", data: rows });
    } catch (error) {
        console.error('Error getting data from proximity table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};

// history proximity get limit 1
exports.getProxHistorylimit = async (req, res) => {
    try {
        const { mesin_username } = req.user;
        const { startDate, endDate } = req.query;

        const startOfDay = startDate ? moment(startDate).startOf('day').toDate() : moment().startOf('day').toDate();
        const endOfDay = endDate ? moment(endDate).endOf('day').toDate() : moment().endOf('day').toDate();

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
        return res.json({ status: "success", data: rows });
    } catch (error) {
        console.error('Error getting data from proximity table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};

//history pzem r
exports.getPzemrHistory = async (req, res) => {
    try {
        const { mesin_username } = req.user;
        const { startDate, endDate } = req.query;

        const startOfDay = startDate ? moment(startDate).startOf('day').toDate() : moment().startOf('day').toDate();
        const endOfDay = endDate ? moment(endDate).endOf('day').toDate() : moment().endOf('day').toDate();

        const rows = await PzemR.findAll({
            where: {
                mesin_username: mesin_username,
                timestamp: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            },
            order: [['timestamp', 'DESC']]
        });
        return res.json({ status: "success", data: rows });
    } catch (error) {
        console.error('Error getting data from proximity table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};

//history pzem s
exports.getPzemsHistory = async (req, res) => {
    try {
        const { mesin_username } = req.user;
        const { startDate, endDate } = req.query;

        const startOfDay = startDate ? moment(startDate).startOf('day').toDate() : moment().startOf('day').toDate();
        const endOfDay = endDate ? moment(endDate).endOf('day').toDate() : moment().endOf('day').toDate();

        const rows = await PzemS.findAll({
            where: {
                mesin_username: mesin_username,
                timestamp: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            },
            order: [['timestamp', 'DESC']]
        });
        return res.json({ status: "success", data: rows });
    } catch (error) {
        console.error('Error getting data from proximity table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};

//history pzem t
exports.getPzemtHistory = async (req, res) => {
    try {
        const { mesin_username } = req.user;
        const { startDate, endDate } = req.query;

        const startOfDay = startDate ? moment(startDate).startOf('day').toDate() : moment().startOf('day').toDate();
        const endOfDay = endDate ? moment(endDate).endOf('day').toDate() : moment().endOf('day').toDate();

        const rows = await PzemT.findAll({
            where: {
                mesin_username: mesin_username,
                timestamp: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            },
            order: [['timestamp', 'DESC']]
        });
        return res.json({ status: "success", data: rows });
    } catch (error) {
        console.error('Error getting data from proximity table:', error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
};