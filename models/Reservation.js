const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    guestName: { type: String, required: true },
    time: { type: String, required: true },
    peopleCount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);