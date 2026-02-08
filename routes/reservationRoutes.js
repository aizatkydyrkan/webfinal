const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const auth = require('../middleware/authMiddleware'); // Импортируем как 'auth'

// 1. Get available seats
router.get('/status', async (req, res) => {
    try {
        const totalSeats = 50; 
        const reservations = await Reservation.find();
        const taken = reservations.reduce((sum, item) => sum + item.peopleCount, 0);
        res.json({ available: Math.max(0, totalSeats - taken) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Create reservation (Public)
router.post('/create', async (req, res) => {
    try {
        const { guestName, time, peopleCount } = req.body;
        if(!guestName || !time || !peopleCount) {
            return res.status(400).json({ error: "All fields are required" });
        }
        
        const newRes = new Reservation({ guestName, time, peopleCount });
        await newRes.save();
        res.status(201).json({ message: "Table booked successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 3. Admin List (Protected)
router.get('/list', auth, async (req, res) => { // Используем 'auth'
    try {
        const list = await Reservation.find().sort({ time: 1 });
        res.json(list);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Delete reservation (Protected)
router.delete('/delete/:id', auth, async (req, res) => { // Исправлено на 'auth'
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        res.json({ message: "Reservation deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error during deletion" });
    }
});

module.exports = router;