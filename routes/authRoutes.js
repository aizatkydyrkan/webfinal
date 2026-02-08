const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Регистрация админа
router.post('/register-admin', async (req, res) => {
    try {
        const { username, password, secretCode } = req.body;
        if (secretCode !== process.env.ADMIN_SECRET_CODE) {
            return res.status(403).json({ error: 'Wrong secret code' });
        }
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'Admin created!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Логин
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;